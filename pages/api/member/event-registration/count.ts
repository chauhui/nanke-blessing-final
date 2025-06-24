import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';

// 定義響應類型
interface RegistrationCountResponse {
  success: boolean;
  count?: number;
  message?: string;
  error?: string;
  debug?: {
    eventId?: string;
    query?: string;
    responseTime?: number;
    requestId?: string;
  };
}

// 初始化 Sanity 客戶端
const client = createClient({
  projectId: 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  withCredentials: true
});

// 生成簡單的請求 ID 用於日誌追蹤
const generateRequestId = () => {
  return Math.random().toString(36).substring(2, 9);
};

// 處理程序函數
const registrationCountHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<RegistrationCountResponse>
) => {
  const requestId = generateRequestId();
  const startTime = Date.now();
  
  console.log(`[${requestId}] 收到請求:`, {
    method: req.method,
    url: req.url,
    query: req.query,
    headers: req.headers
  });

  // 只允許 GET 請求
  if (req.method !== 'GET') {
    const errorMessage = `不支援的 HTTP 方法: ${req.method}`;
    console.error(`[${requestId}] ${errorMessage}`);
    
    if (!res.headersSent) {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({
        success: false,
        message: errorMessage,
        error: 'Method not allowed',
        debug: {
          requestId,
          responseTime: Date.now() - startTime
        }
      });
    }
    return;
  }

  try {
    // 驗證查詢參數
    const eventId = req.query.eventId as string;
    const responseTime = Date.now() - startTime;
    
    console.log(`[${requestId}] 處理請求參數:`, { eventId });

    if (!eventId) {
      const errorMessage = '缺少必要的查詢參數: eventId';
      console.error(`[${requestId}] ${errorMessage}`);
      
      return res.status(400).json({
        success: false,
        message: errorMessage,
        error: 'Invalid request parameters',
        debug: {
          requestId,
          responseTime
        }
      });
    }

    // 檢查 Sanity 配置
    console.log(`[${requestId}] Sanity 配置:`, {
      projectId: client.config().projectId,
      dataset: client.config().dataset,
      apiVersion: client.config().apiVersion
    });

    // 構建查詢
    const query = `count(*[_type == "registration" && references($eventId)])`;
    console.log(`[${requestId}] 執行查詢:`, query, { eventId });

    // 執行 Sanity 查詢
    try {
      // 調試：先查詢所有報名記錄
      const allRegistrations = await client.fetch(`*[_type == "registration"]{ _id, event }`);
      console.log(`[${requestId}] 所有報名記錄:`, JSON.stringify(allRegistrations, null, 2));
      
      // 調試：查詢特定活動的報名記錄
      const specificRegistrations = await client.fetch(
        `*[_type == "registration" && references($eventId)]`,
        { eventId }
      );
      console.log(`[${requestId}] 特定活動報名記錄 (${eventId}):`, JSON.stringify(specificRegistrations, null, 2));
      
      // 執行計數查詢
      const count = await client.fetch<number>(query, { eventId });
      const finalResponseTime = Date.now() - startTime;
      
      console.log(`[${requestId}] 查詢成功:`, { 
        count,
        responseTime: finalResponseTime 
      });

      return res.status(200).json({
        success: true,
        count: count || 0,
        message: 'Successfully retrieved registration count',
        debug: {
          eventId,
          query,
          responseTime: finalResponseTime,
          requestId
        }
      });

    } catch (sanityError) {
      const finalResponseTime = Date.now() - startTime;
      const errorMessage = sanityError instanceof Error ? sanityError.message : 'Unknown error';
      
      console.error(`[${requestId}] Sanity 查詢錯誤:`, {
        error: errorMessage,
        query,
        responseTime: finalResponseTime
      });

      // 檢查是否為速率限制錯誤
      if (errorMessage.includes('rate limit') || errorMessage.includes('too many requests')) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later.',
          error: 'Rate limit exceeded',
          debug: {
            eventId,
            query,
            responseTime: finalResponseTime,
            requestId
          }
        });
      }

      return res.status(500).json({
        success: false,
        message: 'Failed to fetch registration count',
        error: errorMessage,
        debug: {
          eventId,
          query,
          responseTime: finalResponseTime,
          requestId
        }
      });
    }

  } catch (error) {
    const finalResponseTime = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    console.error(`[${requestId}] 處理請求時發生未預期的錯誤:`, {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
      responseTime: finalResponseTime
    });

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: errorMessage,
        debug: {
          requestId,
          responseTime: finalResponseTime
        }
      });
    }
  }
};

export default registrationCountHandler;
