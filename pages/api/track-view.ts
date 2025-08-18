// pages/api/track-view.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // 需要寫入權限
  useCdn: false,
})

function getIP(req: NextApiRequest) {
  const xf = (req.headers['x-forwarded-for'] as string) || ''
  const xv = (req.headers['x-vercel-forwarded-for'] as string) || ''
  const xr = (req.headers['x-real-ip'] as string) || ''
  const cand = xf || xv || xr || req.socket.remoteAddress || ''
  return cand.split(',')[0].trim()
}

function getCountry(req: NextApiRequest) {
  // Vercel/Cloudflare 都會帶這些 header（取其一）
  const c =
    (req.headers['x-vercel-ip-country'] as string) ||
    (req.headers['cf-ipcountry'] as string) ||
    ''
  return c ? c.toUpperCase() : '未知'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, message: 'Method Not Allowed' })
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
    const page: string = body.page || ''
    const referer: string = body.referrer || body.referer || ''
    const userAgent: string = (req.headers['user-agent'] as string) || body.userAgent || ''
    const hostHeader =
      (req.headers['x-forwarded-host'] as string) ||
      (req.headers.host as string) ||
      ''
    const site: string = (body.site || hostHeader || '').toLowerCase()

    const ip = getIP(req)
    const country = getCountry(req)
    const date = new Date().toISOString().slice(0, 10)

    await client.create({
      _type: 'pageViewLog',
      date,
      page,
      referer,
      userAgent,
      country,
      host: site,      // 後台用這個區分正式站/本地
      ip,
      createdAt: new Date().toISOString(),
    })

    return res.status(200).json({ ok: true })
  } catch (err: any) {
    console.error('track-view error:', err)
    return res.status(500).json({ ok: false, message: err?.message || 'server error' })
  }
}
