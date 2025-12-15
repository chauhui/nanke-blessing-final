// pages/api/track-view.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // 需有寫入權限
  useCdn: false,
})

function getIp(req: NextApiRequest) {
  const fwd = (req.headers['x-forwarded-for'] || '') as string
  const ip =
    fwd.split(',')[0]?.trim() ||
    (req.headers['x-real-ip'] as string) ||
    req.socket.remoteAddress ||
    ''
  return ip
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    // 這裡新增 title 的讀取
    const { page = '', referrer = '', referer = '', userAgent = '', site = '', title = '' } = (req.body || {}) as {
      page?: string
      referrer?: string
      referer?: string
      userAgent?: string
      site?: string
      title?: string // <--- 新增
    }

    const countryHeader =
      (req.headers['x-vercel-ip-country'] as string) ||
      (req.headers['x-vercel-ip-country-region'] as string) ||
      ''
    const country = countryHeader || '未知'

    const ip = getIp(req)
    const ua = userAgent || ((req.headers['user-agent'] as string) || '')
    const host =
      (req.headers['x-forwarded-host'] as string)?.toLowerCase() ||
      (req.headers.host as string)?.toLowerCase() ||
      site?.toLowerCase() ||
      ''

    const date = new Date().toISOString().slice(0, 10)

    await client.create({
      _type: 'pageViewLog',
      date,
      page,
      title, // <--- 寫入資料庫
      referer: referrer || referer || '',
      userAgent: ua,
      country,
      host,
      ip,
      createdAt: new Date().toISOString(),
    })

    res.status(200).json({ ok: true })
  } catch (err: any) {
    console.error('track-view error:', err)
    res.status(500).json({ ok: false, message: err?.message || 'server error' })
  }
}