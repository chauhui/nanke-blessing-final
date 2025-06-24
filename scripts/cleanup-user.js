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

async function cleanupUser(email) {
  try {
    console.log(`正在清理用戶: ${email}`);
    
    // 1. 查找用戶
    const user = await client.fetch('*[_type == "user" && email == $email][0]', { email });
    
    if (!user) {
      console.log('未找到用戶');
      return;
    }
    
    console.log('找到用戶:', user._id);
    
    // 2. 查找並刪除相關的審核記錄
    const approvals = await client.fetch(
      '*[_type == "userApproval" && references($userId)]',
      { userId: user._id }
    );
    
    console.log(`找到 ${approvals.length} 個相關審核記錄`);
    
    // 3. 先刪除審核記錄
    for (const approval of approvals) {
      console.log('刪除審核記錄:', approval._id);
      await client.delete(approval._id);
    }
    
    // 4. 然後刪除用戶
    console.log('刪除用戶:', user._id);
    await client.delete(user._id);
    
    console.log('清理完成');
    
  } catch (error) {
    console.error('清理過程中出錯:', error);
  }
}

// 從命令行參數獲取電子郵件
const email = process.argv[2];
if (!email) {
  console.error('請提供要清理的用戶電子郵件');
  console.log('使用方法: node scripts/cleanup-user.js 用戶電子郵件');
  process.exit(1);
}

cleanupUser(email).catch(console.error);
