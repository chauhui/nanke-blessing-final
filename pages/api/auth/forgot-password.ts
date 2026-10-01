import type { NextApiRequest, NextApiResponse } from 'next'
import { randomUUID } from 'crypto'
import { createClient } from '@sanity/client'
import rateLimit from '@/lib/rate-limit'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
})

const limiter = rateLimit({ interval: 15 * 60 * 1000, uniqueTokenPerInterval: 500 })
const genericMessage = '申請已送出。管理員確認身分後，會透過電話、LINE 或其他約定方式提供一次性臨時密碼。'

function checkRateLimit(res: NextApiResponse, token: string) {
  return new Promise<void>((resolve, reject) => limiter.check(res, 5, token, (error) => error ? reject(error) : resolve()))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : ''
  if (!email) return res.status(400).json({ error: '請輸入電子郵件' })

  const forwardedFor = req.headers['x-forwarded-for']
  const ip = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]) || req.socket.remoteAddress || 'unknown'

  try {
    await checkRateLimit(res, `forgot-password:${ip}:${email}`)
  } catch {
    return res.status(429).json({ error: '申請次數過多，請稍後再試' })
  }

  try {
    const user = await client.fetch<{ _id: string; name?: string; email: string } | null>(
      `*[_type == "userRegistration" && lower(email) == $email][0]{_id, name, email}`,
      { email }
    )

    if (!user) return res.status(200).json({ message: genericMessage })

    const now = new Date()
    const activeRequest = await client.fetch<string | null>(
      `*[_type == "passwordResetRequest" && user._ref == $userId && !defined(usedAt) && !defined(revokedAt)][0]._id`,
      { userId: user._id }
    )

    if (!activeRequest) {
      await client.create({
        _id: `passwordResetRequest.${randomUUID()}`,
        _type: 'passwordResetRequest',
        user: { _type: 'reference', _ref: user._id },
        email: user.email,
        status: 'pending',
        requestedAt: now.toISOString(),
      })
    }

    return res.status(200).json({ message: genericMessage })
  } catch (error) {
    console.error('Password reset request failed:', error)
    return res.status(200).json({ message: genericMessage })
  }
}
