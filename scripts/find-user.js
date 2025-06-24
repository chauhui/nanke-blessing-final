const { createClient } = require('@sanity/client');
require('dotenv').config();

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function findUser(email) {
  try {
    // 查詢用戶
    const userQuery = `*[_type == "user" && email == $email][0]`;
    const user = await client.fetch(userQuery, { email });
    
    if (user) {
      console.log('找到用戶:', user);
      
      // 查詢相關的審核記錄
      const approvalQuery = `*[_type == "userApproval" && user._ref == $userId][0]`;
      const approval = await client.fetch(approvalQuery, { userId: user._id });
      
      if (approval) {
        console.log('找到審核記錄:', approval);
      } else {
        console.log('未找到相關的審核記錄');
      }
      
      return { user, approval };
    } else {
      console.log('未找到用戶');
      return null;
    }
  } catch (error) {
    console.error('查詢出錯:', error);
    throw error;
  }
}

// 執行查詢
const email = 'ryan_chwang@yahoo.com.tw';
console.log(`正在查詢用戶: ${email}`);
findUser(email)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('執行出錯:', error);
    process.exit(1);
  });
