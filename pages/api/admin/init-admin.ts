// pages/api/admin/init-admin.ts

import { hash } from 'bcryptjs';
import { client } from '@/lib/sanity';
import type { NextApiRequest, NextApiResponse } from 'next';

// 這是一個一次性使用的端點，用於創建初始管理員帳戶
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 僅在開發環境下允許此操作
  if (process.env.NODE_ENV !== 'development') {
    return res.status(403).json({ 
      success: false, 
      error: '此端點僅在開發環境下可用' 
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ 
      success: false, 
      error: '請提供電子郵件、密碼和名稱' 
    });
  }

  try {
    // 檢查是否已存在管理員
    const existingAdminQuery = `*[_type == "user" && isAdmin == true][0]`;
    const existingAdmin = await client.fetch(existingAdminQuery);

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        error: '管理員帳戶已存在',
        adminEmail: existingAdmin.email
      });
    }

    // 檢查電子郵件是否已被使用
    const existingUserQuery = `*[_type == "user" && email == $email][0]`;
    const existingUser = await client.fetch(existingUserQuery, { email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: '該電子郵件已被使用'
      });
    }

    // 加密密碼
    const hashedPassword = await hash(password, 12);

    // 準備要寫入的管理員用戶和審核記錄
    const userId = `user.${Date.now()}`;
    const adminUser = {
      _type: 'user',
      _id: userId,
      name,
      email,
      password: hashedPassword,
      isApproved: true,
      isAdmin: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const userApproval = {
      _type: 'userApproval',
      _id: `userApproval.${Date.now() + 1}`,
      user: { _type: 'reference', _ref: userId },
      isApproved: true,
      isAdmin: true,
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'system',
      notes: '系統管理員帳戶',
    };

    // 在事務中創建
    await client.transaction()
      .create(adminUser)
      .create(userApproval)
      .commit();

    res.status(201).json({
      success: true,
      message: '管理員帳戶創建成功',
      user: { email, name, isAdmin: true, isApproved: true },
    });

  } catch (err: unknown) {
    console.error('創建管理員錯誤:', err);

    // 安全地取得錯誤訊息
    const details = err instanceof Error ? err.message : String(err);

    res.status(500).json({
      success: false,
      error: '創建管理員帳戶時出錯',
      // 只有開發環境才暴露 details
      ...(process.env.NODE_ENV === 'development' && { details }),
    });
  }
}
