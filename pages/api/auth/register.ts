// pages/api/auth/register.ts

import { createClient } from 'next-sanity'
import { hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'

// ===== Debug: 看 Vercel/本地端是否抓到環境變數 =====
console.log('🔑 SANITY_WRITE_TOKEN:', !!process.env.SANITY_WRITE_TOKEN)
console.log('📦 SANITY_PROJECT_ID:', process.env.SANITY_PROJECT_ID)
console.log('🗄️ SANITY_DATASET:',     process.env.SANITY_DATASET)

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token:     process.env.SANITY_WRITE_TOKEN,
  useCdn:    false,
  apiVersion:'2024-06-01',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, phone, password } = req.body as {
    name?: string
    email?: string
    phone?: string
    password?: string
  }

  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: '請填寫所有必填欄位（姓名、電子郵件、電話、密碼）' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: '請輸入有效的電子郵件地址' })
  }

  try {
    // 檢查是否已存在同 email 用戶
    const existing = await client.fetch(
      `*[_type == "userRegistration" && email == $email][0]`,
      { email }
    )
    if (existing) {
      return res.status(409).json({ error: '該電子郵件已被註冊，請直接登入或使用其他電子郵件' })
    }
  } catch (err) {
    console.error('查詢 existingUser 錯誤：', err)
    return res.status(500).json({ error: '伺服器錯誤，請稍後再試' })
  }

  try {
    // 密碼加密
    const hashed = await hash(password, 12)
    // 建立新用戶
    const user = await client.create({
      _type: 'userRegistration',
      name,
      email,
      phone,
      password: hashed,
      isApproved: false,
      createdAt: new Date().toISOString(),
    })

    const { password: _, ...rest } = user
    return res.status(201).json({
      ...rest,
      message: '註冊成功！請等待管理員審核。',
    })
  } catch (err) {
    console.error('建立新用戶錯誤：', err)
    return res.status(500).json({ error: '註冊過程中發生錯誤，請稍後再試' })
  }
}
