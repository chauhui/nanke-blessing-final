require('dotenv').config();
const { createClient } = require('@sanity/client');

console.log('正在檢查 Sanity 數據...');
console.log('當前數據集:', process.env.NEXT_PUBLIC_SANITY_DATASET || 'production');

// 配置 Sanity 客戶端
const client = createClient({
  projectId: 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function checkData() {
  try {
    console.log('\n1. 檢查用戶...');
    const users = await client.fetch('*[_type == "user"]');
    console.log(`找到 ${users.length} 個用戶`);
    console.log(users.map(u => ({
      _id: u._id,
      email: u.email,
      name: u.name,
      _createdAt: u._createdAt
    })));

    console.log('\n2. 檢查審核記錄...');
    const approvals = await client.fetch('*[_type == "userApproval"]');
    console.log(`找到 ${approvals.length} 個審核記錄`);
    console.log(approvals.map(a => ({
      _id: a._id,
      user: a.user?._ref,
      status: a.status,
      _createdAt: a._createdAt
    })));

    console.log('\n3. 檢查數據集列表...');
    try {
      const datasets = await client.request({
        uri: `/projects/von9yh08/datasets`,
        withCredentials: true,
      });
      console.log('可用的數據集:', datasets.map(d => ({
        name: d.name,
        aclMode: d.aclMode,
        createdAt: d.createdAt
      })));
    } catch (error) {
      console.log('無法獲取數據集列表，可能是權限問題');
    }

  } catch (error) {
    console.error('檢查數據時出錯:', error);
  }
}

checkData().catch(console.error);
