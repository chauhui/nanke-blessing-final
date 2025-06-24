import { createClient } from '@sanity/client';
import type { NextApiRequest, NextApiResponse } from 'next';

// 建立 Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
  withCredentials: true,
  ignoreBrowserTokenWarning: true,
});

// 設置 CORS 標頭
const setCorsHeaders = (res: NextApiResponse, req: NextApiRequest) => {
  const allowedOrigins = [
    'https://nanke-blessing.vercel.app',
    'http://localhost:3000',
    'https://nanke-blessing.vercel.app',
    'https://*.vercel.app',
    'http://localhost:*',
    ...(process.env.NODE_ENV === 'development' ? ['*'] : [])
  ];
  
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
};

// 定義請求體類型
interface RegistrationRequest {
  eventId: string;
  name: string;
  email: string;
  phone?: string;
  note?: string;
}

// 定義響應類型
interface RegistrationResponse {
  success: boolean;
  message: string;
  registrationId?: string;
  error?: string;
}

const registrationHandler = async (req: NextApiRequest, res: NextApiResponse<RegistrationResponse>) => {
  try {
    setCorsHeaders(res, req);

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({
        success: false,
        message: `Method ${req.method} Not Allowed`,
        error: 'Method not allowed'
      });
      return;
    }

    // 取得並檢查欄位
    const { eventId, name, email, phone = '', note = '' } = req.body as RegistrationRequest;

    if (!eventId || !name || !email) {
      console.error('Missing required fields:', { eventId, name, email });
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'Missing required fields: ' + ['eventId', 'name', 'email'].filter(f => !req.body[f]).join(', ')
      });
      return;
    }

    // 驗證電子郵件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format',
        error: 'The provided email address is not valid'
      });
      return;
    }

    // 創建報名記錄
    const registration = {
      _type: 'registration',
      event: {
        _type: 'reference',
        _ref: eventId,
      },
      name,
      email,
      phone,
      note,
      registeredAt: new Date().toISOString(),
    };

    // 檢查是否已經報名過
    const existingRegistration = await client.fetch(
      `*[_type == "registration" && email == $email && event._ref == $eventId][0]`,
      { email, eventId }
    );

    if (existingRegistration) {
      res.status(409).json({
        success: false,
        message: 'You have already registered for this event',
        registrationId: existingRegistration._id,
        error: 'Duplicate registration detected'
      });
      return;
    }

    // 保存到 Sanity
    const result = await client.create(registration);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      registrationId: result._id
    });
  } catch (error: any) {
    console.error('Unexpected error in registration handler:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data,
    });
    
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || 'An unexpected error occurred';
    res.status(statusCode).json({
      success: false,
      message: '處理請求時發生錯誤',
      error: errorMessage,
      stack: error.stack
    });
    return;
  }
};

export default registrationHandler;