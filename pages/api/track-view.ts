// pages/api/track-view.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client'
import geoip from 'geoip-lite'

const client = createClient({
  projectId: 'von9yh08',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN, // 寫入權限
  apiVersion: '2024-01-01',
  useCdn: false,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end()
  const { page } = req.body
  const ip =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    req.socket?.remoteAddress ||
    ''
  const userAgent = req.headers['user-agent'] || ''
  const referer = req.headers['referer'] || ''
  const geo = geoip.lookup(ip)
  const country = geo?.country || ''
  const date = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

  await client.create({
    _type: 'pageViewLog',
    page,
    date,
    ip,
    userAgent,
    referer,
    country,
  })

  res.status(200).json({ ok: true })
}
