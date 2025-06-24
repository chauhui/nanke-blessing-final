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
    console.log(`正在查找用戶: ${email}`);
    
    // 1. 查找用戶
    const user = await client.fetch('*[_type == "user" && email == $email][0]', { email });
    
    if (!user) {
      console.log('找不到該電子郵件的用戶');
      return;
    }
    
    console.log('找到用戶:', user._id);
    
    // 2. 查找相關的審核記錄
    const approval = await client.fetch('*[_type == "userApproval" && user._ref == $userId][0]', { userId: user._id });
    
    // 3. 創建事務
    const transaction = client.transaction();
    
    // 4. 刪除用戶
    console.log('刪除用戶:', user._id);
    transaction.delete(user._id);
    
    // 5. 如果找到審核記錄，也一併刪除
    if (approval) {
      console.log('刪除審核記錄:', approval._id);
      transaction.delete(approval._id);
    } else {
      console.log('找不到相關的審核記錄');
    }
    
    // 6. 提交事務
    const result = await transaction.commit();
    console.log('刪除成功:', result);
    
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
  console.log('使用方法: node scripts/delete-user-by-email.js 用戶電子郵件');
  process.exit(1);
}

deleteUserByEmail(email).catch(console.error);
