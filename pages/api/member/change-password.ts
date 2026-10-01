import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { compare, hash } from 'bcryptjs'
import { createClient } from '@sanity/client'
import { authOptions } from '@/lib/auth-options'
import rateLimit from '@/lib/rate-limit'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
})

const limiter = rateLimit({interval: 15 * 60 * 1000, uniqueTokenPerInterval: 500})

function checkRateLimit(res: NextApiResponse, token: string) {
  return new Promise<void>((resolve, reject) => limiter.check(res, 10, token, (error) => error ? reject(error) : resolve()))
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'})

  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.id) return res.status(401).json({error: '請重新登入'})

  const password = typeof req.body?.password === 'string' ? req.body.password : ''
  if (password.length < 8) return res.status(400).json({error: '密碼長度至少需要 8 個字元'})

  try {
    await checkRateLimit(res, `change-password:${session.user.id}`)
  } catch {
    return res.status(429).json({error: '嘗試次數過多，請稍後再試'})
  }

  try {
    const user = await client.fetch<{
      _id: string
      password: string
      isApproved: boolean
      mustChangePassword?: boolean
      authVersion?: number
    } | null>(
      `*[_type == "userRegistration" && _id == $userId][0]{_id, password, isApproved, mustChangePassword, authVersion}`,
      {userId: session.user.id},
    )

    if (!user || user.isApproved !== true) return res.status(403).json({error: '帳號無法使用'})
    if (!user.mustChangePassword) return res.status(400).json({error: '此帳號目前不需要重設密碼'})
    if ((user.authVersion || 1) !== (session.user.authVersion || 1)) return res.status(401).json({error: '登入狀態已失效，請重新登入'})
    if (await compare(password, user.password)) return res.status(400).json({error: '新密碼不可與臨時密碼相同'})

    const passwordHash = await hash(password, 12)
    await client
      .patch(user._id)
      .set({
        password: passwordHash,
        mustChangePassword: false,
        authVersion: (user.authVersion || 1) + 1,
      })
      .unset(['temporaryPasswordIssuedAt'])
      .commit()

    return res.status(200).json({message: '密碼已更新，請重新登入'})
  } catch (error) {
    console.error('Temporary password replacement failed:', error)
    return res.status(500).json({error: '密碼更新失敗，請稍後再試'})
  }
}
