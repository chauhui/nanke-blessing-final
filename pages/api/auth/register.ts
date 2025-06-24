// pages/api/auth/register.ts

import { createClient } from 'next-sanity';
import { hash } from 'bcryptjs';
import type { NextApiRequest, NextApiResponse } from 'next';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, password } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
  };

  // 1. 驗證必填欄位
  if (!name || !email || !phone || !password) {
    return res
      .status(400)
      .json({ error: '請填寫所有必填欄位（姓名、電子郵件、電話、密碼）' });
  }

  // 2. 驗證電子郵件格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: '請輸入有效的電子郵件地址' });
  }

  try {
    // 3. 檢查用戶是否已存在（避免重複註冊）
    const existingUser = await client.fetch(
      `*[_type == "userRegistration" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      // 電子郵件已存在，回 409 Conflict
      return res
        .status(409)
        .json({ error: '該電子郵件已被註冊，請使用其他電子郵件或直接登入' });
    }
  } catch (err) {
    console.error('查詢 existingUser 時發生錯誤：', err);
    return res
      .status(500)
      .json({ error: '伺服器錯誤，請稍後再試' });
  }

  try {
    // 4. 加密密碼
    const hashedPassword = await hash(password, 12);

    // 5. 創建新用戶文檔（已移除 isAdmin 欄位！）
    const user = await client.create({
      _type: 'userRegistration',
      name,
      email,
      phone,
      password: hashedPassword,
      isApproved: false, // 新用戶預設未審核
      createdAt: new Date().toISOString(),
    });

    // 6. 回傳成功響應（不包含密碼）
    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json({
      ...userWithoutPassword,
      message: '註冊成功！請等待管理員審核您的帳號。',
    });
  } catch (error) {
    console.error('建立新用戶時發生錯誤：', error);
    return res
      .status(500)
      .json({ error: '註冊過程中發生錯誤，請稍後再試' });
  }
}
