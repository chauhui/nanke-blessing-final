require('dotenv').config();
const { createClient } = require('@sanity/client');

// 創建客戶端
const client = createClient({
  projectId: 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function testWrite() {
  try {
    console.log('測試 Sanity 寫入權限...');
    
    // 1. 測試查詢
    console.log('執行查詢測試...');
    const users = await client.fetch('*[_type == "user"]');
    console.log(`找到 ${users.length} 個用戶`);
    
    // 2. 測試寫入
    console.log('執行寫入測試...');
    const testDoc = {
      _type: 'testDoc',
      message: '這是一個測試文檔',
      timestamp: new Date().toISOString()
    };
    
    const result = await client.create(testDoc);
    console.log('寫入成功:', result);
    
    // 3. 清理測試文檔
    console.log('清理測試文檔...');
    await client.delete(result._id);
    console.log('測試完成，已清理測試文檔');
    
  } catch (error) {
    console.error('測試失敗:', error);
    if (error.response) {
      console.error('錯誤詳情:', {
        statusCode: error.statusCode,
        message: error.message,
        responseBody: error.responseBody
      });
    }
  }
}

testWrite();
