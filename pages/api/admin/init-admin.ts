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

    // 創建管理員用戶
    const adminUser = {
      _type: 'user',
      name,
      email,
      password: hashedPassword,
      isApproved: true,
      isAdmin: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 創建用戶審核記錄
    const userApproval = {
      _type: 'userApproval',
      user: {
        _type: 'reference',
        _ref: `user.${Date.now()}`,
      },
      isApproved: true,
      isAdmin: true,
      reviewedAt: new Date().toISOString(),
      reviewedBy: 'system',
      notes: '系統管理員帳戶',
    };

    // 在事務中創建用戶和審核記錄
    const transaction = client.transaction();
    const userId = `user.${Date.now()}`;
    const userApprovalId = `userApproval.${Date.now() + 1}`;

    transaction.create({
      ...adminUser,
      _id: userId,
    });

    transaction.create({
      ...userApproval,
      _id: userApprovalId,
      user: {
        _type: 'reference',
        _ref: userId,
      },
    });

    await transaction.commit();

    res.status(201).json({
      success: true,
      message: '管理員帳戶創建成功',
      user: {
        email,
        name,
        isAdmin: true,
        isApproved: true,
      },
    });
  } catch (error) {
    console.error('創建管理員錯誤:', error);
    res.status(500).json({
      success: false,
      error: '創建管理員帳戶時出錯',
      details: error.message,
    });
  }
}
