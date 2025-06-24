require('dotenv').config();
const { createClient } = require('@sanity/client');

// 配置 Sanity 客戶端
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function deleteUserByEmail(email) {
  try {
    console.log(`正在查找 Sanity 用戶: ${email}`);
    
    // 1. 查找用戶
    const query = '*[_type == "user" && email == $email]';
    const users = await client.fetch(query, { email });
    
    if (!users || users.length === 0) {
      console.log('找不到該電子郵件的用戶');
      return;
    }
    
    console.log(`找到 ${users.length} 個匹配的用戶`);
    
    // 2. 為每個找到的用戶刪除相關記錄
    for (const user of users) {
      console.log('刪除用戶:', user._id);
      
      // 刪除用戶
      await client.delete(user._id);
      console.log(`已刪除用戶 ${user._id}`);
      
      // 查找並刪除相關的審核記錄
      const approvals = await client.fetch(
        '*[_type == "userApproval" && user._ref == $userId]',
        { userId: user._id }
      );
      
      for (const approval of approvals) {
        console.log('刪除審核記錄:', approval._id);
        await client.delete(approval._id);
        console.log(`已刪除審核記錄 ${approval._id}`);
      }
    }
    
    console.log('所有操作完成');
    
  } catch (error) {
    console.error('刪除用戶時出錯:', error);
    if (error.response) {
      console.error('錯誤詳情:', {
        statusCode: error.statusCode,
        message: error.message,
        responseBody: error.responseBody
      });
    }
  }
}

// 從命令行參數獲取電子郵件
const email = process.argv[2];
if (!email) {
  console.error('請提供要刪除的用戶電子郵件');
  console.log('使用方法: node scripts/delete-sanity-user.js 用戶電子郵件');
  process.exit(1);
}

deleteUserByEmail(email).catch(console.error);
