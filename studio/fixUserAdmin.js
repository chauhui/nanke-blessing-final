// fixUserAdmin.js
import { getCliClient } from 'sanity/cli';

const client = getCliClient({ apiVersion: '2024-01-01' });

async function fixUserAdmin() {
  try {
    // 獲取所有用戶文檔
    const users = await client.fetch('*[_type == "userRegistration"]');
    
    console.log(`找到 ${users.length} 個用戶文檔`);
    
    // 為每個用戶文檔創建更新事務
    const transactions = users.map(user => {
      console.log(`處理用戶: ${user.name || user.email}`);
      
      // 創建更新操作
      return client
        .patch(user._id)
        .setIfMissing({ isAdmin: false }) // 如果 isAdmin 不存在，則設置為 false
        .commit();
    });

    // 執行所有更新
    console.log('正在更新用戶文檔...');
    const results = await Promise.all(transactions);
    console.log(`✅ 成功更新 ${results.length} 個用戶文檔`);
    
  } catch (error) {
    console.error('❌ 修復過程中出錯:', error);
  } finally {
    process.exit(0);
  }
}

// 執行修復
fixUserAdmin();
