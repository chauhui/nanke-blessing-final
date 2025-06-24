require('dotenv').config();
const { createClient } = require('@sanity/client');

// 配置 Sanity 客戶端
const client = createClient({
  projectId: 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function listAllUsers() {
  try {
    console.log('正在查詢所有用戶...');
    
    // 查詢所有用戶
    const users = await client.fetch('*[_type == "user"]');
    
    console.log(`找到 ${users.length} 個用戶:`);
    users.forEach(user => {
      console.log(`- ID: ${user._id}`);
      console.log(`  電子郵件: ${user.email}`);
      console.log(`  名稱: ${user.name}`);
      console.log(`  創建時間: ${user._createdAt}`);
    });
    
    // 查詢所有審核記錄
    console.log('\n正在查詢所有審核記錄...');
    const approvals = await client.fetch('*[_type == "userApproval"]');
    
    console.log(`找到 ${approvals.length} 個審核記錄:`);
    approvals.forEach(approval => {
      console.log(`- ID: ${approval._id}`);
      console.log(`  用戶引用: ${approval.user?._ref || '無'}`);
      console.log(`  狀態: ${approval.status || '未知'}`);
      console.log(`  創建時間: ${approval._createdAt}`);
    });
    
  } catch (error) {
    console.error('查詢出錯:', error);
  }
}

listAllUsers().catch(console.error);
