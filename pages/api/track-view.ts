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

// 輔助函式：解碼中文內容，避免亂碼
function safeDecode(str: string | undefined): string {
  if (!str) return ''
  try {
    return decodeURIComponent(str)
  } catch (e) {
    return str
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' })
    return
  }

  try {
    const { page = '', referrer = '', referer = '', userAgent = '', site = '', title = '' } = (req.body || {}) as {
      page?: string
      referrer?: string
      referer?: string
      userAgent?: string
      site?: string
      title?: string
    }

    // === 重點修改：抓取更詳細的地理位置資訊 ===
    // 國家代碼 (例如 TW, US)
    const countryCode = (req.headers['x-vercel-ip-country'] as string) || '未知'
    
    // 城市名稱 (例如 Taipei, Kaohsiung) - 記得要解碼
    const cityRaw = (req.headers['x-vercel-ip-city'] as string) || ''
    const city = safeDecode(cityRaw)

    // 地區/省份代碼 (例如 TPE)
    const regionRaw = (req.headers['x-vercel-ip-country-region'] as string) || ''
    const region = safeDecode(regionRaw)
    // ===========================================

    const ip = getIp(req)
    const ua = userAgent || ((req.headers['user-agent'] as string) || '')
    const host =
      (req.headers['x-forwarded-host'] as string)?.toLowerCase() ||
      (req.headers.host as string)?.toLowerCase() ||
      site?.toLowerCase() ||
      ''

    const date = new Date().toISOString().slice(0, 10)

    // 寫入資料庫
    await client.create({
      _type: 'pageViewLog',
      date,
      page,
      title,
      referer: referrer || referer || '',
      userAgent: ua,
      host,
      ip,
      // 這裡寫入新的地理位置欄位
      country: countryCode,
      region: region,
      city: city, 
      createdAt: new Date().toISOString(),
    })

    res.status(200).json({ ok: true })
  } catch (err: any) {
    console.error('track-view error:', err)
    res.status(500).json({ ok: false, message: err?.message || 'server error' })
  }
}