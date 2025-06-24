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

async function listAllUsers() {
  try {
    console.log('正在查詢 Sanity 中的所有用戶...');
    
    // 查詢所有用戶
    const users = await client.fetch('*[_type == "user"]');
    
    console.log(`找到 ${users.length} 個用戶:`);
    console.log(JSON.stringify(users, null, 2));
    
    // 查詢所有審核記錄
    console.log('\n正在查詢所有審核記錄...');
    const approvals = await client.fetch('*[_type == "userApproval"]');
    
    console.log(`找到 ${approvals.length} 個審核記錄:`);
    console.log(JSON.stringify(approvals, null, 2));
    
  } catch (error) {
    console.error('查詢出錯:', error);
  }
}

listAllUsers().catch(console.error);
