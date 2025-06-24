import { client } from '@/lib/sanity';
import type { NextApiRequest, NextApiResponse } from 'next';

// 這是一個臨時端點，用於刪除指定電子郵件的用戶及其審核記錄
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

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false, 
      error: '請提供要刪除的用戶電子郵件' 
    });
  }

  try {
    console.log('開始刪除用戶:', email);
    
    // 1. 查找用戶
    const userQuery = `*[_type == "user" && email == $email][0]`;
    const user = await client.fetch(userQuery, { email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: '找不到指定的用戶',
        email
      });
    }
    
    console.log('找到用戶:', user._id);
    
    // 2. 查找相關的審核記錄
    const approvalQuery = `*[_type == "userApproval" && user._ref == $userId][0]`;
    const approval = await client.fetch(approvalQuery, { userId: user._id });
    
    // 3. 創建事務
    const transaction = client.transaction();
    
    // 4. 刪除用戶
    console.log('刪除用戶:', user._id);
    transaction.delete(user._id);
    
    // 5. 如果找到審核記錄，也一併刪除
    if (approval) {
      console.log('刪除審核記錄:', approval._id);
      transaction.delete(approval._id);
    }
    
    // 6. 提交事務
    const result = await transaction.commit();
    
    res.status(200).json({
      success: true,
      message: '用戶已成功刪除',
      userId: user._id,
      approvalId: approval?._id
    });
    
  } catch (error: any) {
    console.error('刪除用戶時出錯:', error);
    res.status(500).json({
      success: false,
      error: '刪除用戶時出錯',
      details: error.message
    });
  }
}
