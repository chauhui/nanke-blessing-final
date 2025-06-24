// 測試 Sanity 連接和權限
console.log('測試 Sanity 連接...');

// 使用 Next.js 的環境變數加載方式
const loadEnv = require('@next/env').loadEnvConfig('.');
const { createClient } = require('@sanity/client');

// 輸出環境變數
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('SANITY_WRITE_TOKEN 長度:', process.env.SANITY_WRITE_TOKEN ? process.env.SANITY_WRITE_TOKEN.length : '未設置');

// 創建客戶端
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

// 測試查詢
async function testQuery() {
  try {
    console.log('\n測試查詢...');
    const users = await client.fetch('*[_type == "user"]');
    console.log(`找到 ${users.length} 個用戶`);
    return true;
  } catch (error) {
    console.error('查詢失敗:', error.message);
    return false;
  }
}

// 測試寫入
async function testWrite() {
  try {
    console.log('\n測試寫入...');
    const testDoc = {
      _type: 'testDoc',
      message: '這是一個測試文檔',
      timestamp: new Date().toISOString()
    };
    
    console.log('準備創建文檔...');
    console.log('文檔內容:', JSON.stringify(testDoc, null, 2));
    
    const result = await client.create(testDoc).catch(err => {
      console.error('創建文檔時出錯:', err);
      if (err.response) {
        console.error('響應狀態碼:', err.statusCode);
        console.error('響應主體:', err.responseBody);
      }
      throw err;
    });
    
    console.log('寫入成功，文檔 ID:', result._id);
    
    // 清理測試文檔
    console.log('準備刪除測試文檔...');
    await client.delete(result._id);
    console.log('已清理測試文檔');
    
    return true;
  } catch (error) {
    console.error('寫入失敗:', error.message);
    if (error.response) {
      console.error('錯誤詳情:', {
        statusCode: error.statusCode,
        message: error.message,
        responseBody: error.responseBody
      });
    }
    return false;
  }
}

// 執行測試
async function runTests() {
  console.log('\n=== 開始測試 ===');
  
  const querySuccess = await testQuery();
  const writeSuccess = await testWrite();
  
  console.log('\n=== 測試結果 ===');
  console.log(`查詢: ${querySuccess ? '成功' : '失敗'}`);
  console.log(`寫入: ${writeSuccess ? '成功' : '失敗'}`);
  
  if (!querySuccess || !writeSuccess) {
    console.log('\n建議檢查：');
    console.log('1. 確認 SANITY_WRITE_TOKEN 是否正確');
    console.log('2. 確認 token 是否具有寫入權限');
    console.log('3. 確認專案 ID 和數據集名稱是否正確');
  } else {
    console.log('\n所有測試通過！');
  }
}

runTests().catch(console.error);
