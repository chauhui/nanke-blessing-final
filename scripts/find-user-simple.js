const { createClient } = require('@sanity/client');
const config = require('../sanity.config.js');

// 使用專案中的配置創建客戶端
const client = createClient({
  ...config.api,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || ''
});

async function findUser(email) {
  try {
    console.log('正在查詢用戶:', email);
    
    // 查詢用戶
    const userQuery = `*[_type == "user" && email == $email][0]`;
    const user = await client.fetch(userQuery, { email });
    
    if (user) {
      console.log('\n找到用戶:');
      console.log(JSON.stringify(user, null, 2));
      
      // 查詢相關的審核記錄
      const approvalQuery = `*[_type == "userApproval" && user._ref == $userId][0]`;
      const approval = await client.fetch(approvalQuery, { userId: user._id });
      
      if (approval) {
        console.log('\n找到審核記錄:');
        console.log(JSON.stringify(approval, null, 2));
      } else {
        console.log('\n未找到相關的審核記錄');
      }
      
      return { user, approval };
    } else {
      console.log('\n未找到用戶');
      return null;
    }
  } catch (error) {
    console.error('\n查詢出錯:');
    console.error(error);
    throw error;
  }
}

// 執行查詢
const email = 'ryan_chwang@yahoo.com.tw';
findUser(email)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('執行出錯:', error);
    process.exit(1);
  });
