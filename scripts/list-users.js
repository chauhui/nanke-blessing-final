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

async function listUsers() {
  try {
    console.log('正在查詢所有用戶...');
    // 查詢所有用戶
    const users = await client.fetch('*[_type == "user"]');
    
    if (users.length === 0) {
      console.log('數據庫中沒有用戶記錄');
      return;
    }
    
    console.log(`找到 ${users.length} 個用戶:`);
    users.forEach((user, index) => {
      console.log(`\n用戶 #${index + 1}:`);
      console.log(`ID: ${user._id}`);
      console.log(`姓名: ${user.name}`);
      console.log(`電子郵件: ${user.email}`);
      console.log(`是否已批准: ${user.isApproved || false}`);
      console.log(`創建時間: ${user._createdAt || '未知'}`);
    });
    
  } catch (error) {
    console.error('查詢用戶時出錯:', error);
    if (error.response) {
      console.error('錯誤詳情:', {
        statusCode: error.statusCode,
        message: error.message,
        responseBody: error.responseBody
      });
    }
  }
}

listUsers().catch(console.error);
