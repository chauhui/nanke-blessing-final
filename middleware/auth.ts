import { NextApiRequest, NextApiResponse } from 'next';

// 定義 API 處理程序的類型
type ApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>
) => Promise<void> | void;

// 標準 API 響應類型
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// 身份驗證中間件
export const withAuth = (handler: ApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // 檢查請求方法
    if (req.method !== 'POST') {
      return res.status(405).json({ 
        success: false, 
        message: 'Method not allowed' 
      });
    }

    try {
      // 驗證 API 密鑰
      const apiKey = req.headers['x-api-key'];
      if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ 
          success: false, 
          message: 'Unauthorized: Invalid API key' 
        });
      }

      // 調用下一個處理程序
      return await handler(req, res);
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  };
};

// 管理員權限檢查中間件
export const withAdmin = (handler: ApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // 這裡可以實現自定義的管理員驗證邏輯
      // 例如從請求頭中獲取管理員令牌
      const adminToken = req.headers['x-admin-token'];
      
      // 檢查管理員令牌是否有效
      if (!adminToken || adminToken !== process.env.ADMIN_TOKEN) {
        return res.status(403).json({ 
          success: false, 
          message: 'Forbidden: Admin access required' 
        });
      }

      // 調用下一個處理程序
      return await handler(req, res);
    } catch (error) {
      console.error('Admin check error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  };
};

// 驗證請求體的結構
export const validateRequestBody = <T extends object>(
  req: NextApiRequest,
  requiredFields: (keyof T)[]
): { isValid: boolean; message?: string } => {
  const body = req.body as T;
  
  for (const field of requiredFields) {
    if (!body[field]) {
      return { 
        isValid: false, 
        message: `Missing required field: ${String(field)}` 
      };
    }
  }
  
  return { isValid: true };
};
