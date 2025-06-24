import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

// 源專案（當前）的客戶端
const sourceClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
});

// 目標專案的客戶端
const targetClient = createClient({
  projectId: 'ygyygj70', // 新專案 ID
  dataset: 'production', // 或您想要使用的資料集名稱
  token: process.env.SANITY_WRITE_TOKEN, // 確保這個 token 有寫入權限
  apiVersion: '2024-01-01',
  useCdn: false,
});

// 導出函數
async function exportRegistrations() {
  try {
    console.log('正在查詢報名資料...');
    
    // 查詢所有報名記錄
    const registrations = await sourceClient.fetch(
      `*[_type == "registration"]{
        _id,
        _createdAt,
        _updatedAt,
        name,
        email,
        phone,
        note,
        "eventId": event._ref,
        registeredAt
      }`
    );

    console.log(`找到 ${registrations.length} 筆報名記錄`);

    // 將資料保存到 JSON 文件（備份）
    const exportDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }
    
    const exportPath = path.join(exportDir, `registrations-${new Date().toISOString().replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(exportPath, JSON.stringify(registrations, null, 2));
    console.log(`已將報名資料備份到: ${exportPath}`);

    // 導入到目標專案
    console.log('開始導入到目標專案...');
    
    for (const reg of registrations) {
      try {
        // 檢查是否已存在相同記錄
        const existing = await targetClient.fetch(
          `*[_type == "registration" && email == $email && event._ref == $eventId][0]`,
          { email: reg.email, eventId: reg.eventId }
        );

        if (!existing) {
          // 創建新記錄
          const newReg = {
            _type: 'registration',
            event: {
              _type: 'reference',
              _ref: reg.eventId,
              _weak: true, // 如果事件可能還不存在，使用弱引用
            },
            name: reg.name,
            email: reg.email,
            phone: reg.phone || '',
            note: reg.note || '',
            registeredAt: reg.registeredAt || new Date().toISOString(),
          };

          await targetClient.create(newReg);
          console.log(`已創建報名記錄: ${reg.name} (${reg.email})`);
        } else {
          console.log(`跳過已存在的記錄: ${reg.name} (${reg.email})`);
        }
      } catch (error) {
        console.error(`處理記錄時出錯 (${reg.email}):`, error);
      }
      
      // 添加延遲以避免觸發速率限制
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('導入完成！');
  } catch (error) {
    console.error('導出/導入過程中出錯:', error);
    process.exit(1);
  }
}

// 執行導出
exportRegistrations();
