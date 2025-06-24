import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import rateLimit from '../../lib/rate-limit';

// Initialize rate limiter
const limiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500,
});

// 定義報名記錄的類型
interface Registration {
  _type: 'registration';
  event: {
    _type: 'reference';
    _ref: string;
  };
  name: string;
  email: string;
  phone?: string;
  note?: string;
  registeredAt: string;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // 使用專門的 write token
});

// Set CORS headers
const setCorsHeaders = (res: NextApiResponse, req: NextApiRequest) => {
  const allowedOrigins = [
    'https://nanke-blessing.vercel.app',
    'http://localhost:3000',
  ];
  
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Content-Type', 'application/json');
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  setCorsHeaders(res, req);

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed',
      allowedMethods: ['POST']
    });
  }

  // Apply rate limiting
  try {
    const ip = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || 'unknown';
    await new Promise((resolve, reject) => {
      limiter.check(res, 10, ip, (err: Error | null) => {
        if (err) {
          console.error(`Rate limit exceeded for IP: ${ip}`);
          reject(new Error('Rate limit exceeded'));
        } else {
          resolve(true);
        }
      });
    });
  } catch (error: any) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.'
    });
  }

  // Check if Sanity client is properly configured
  if (!client) {
    console.error('Sanity client not properly configured');
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: 'Sanity client not configured'
    });
  }

  try {
    const { eventId, name, email, phone = '', note = '' } = req.body;

    if (!eventId || !name || !email) {
      return res.status(400).json({ 
        message: 'Missing required fields', 
        fields: ['eventId', 'name', 'email']
      });
    }

    // 驗證電子郵件格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Invalid email format', 
        email: email
      });
    }

    // 驗證活動是否存在
    console.log('Fetching event with ID:', eventId);
    const event = await client.fetch(
      `*[_type == "event" && _id == "${eventId}"]`,
      { eventId }
    );

    if (!event?.length) {
      console.error('Event not found:', eventId);
      return res.status(400).json({ 
        message: 'Invalid event', 
        eventId: eventId
      });
    }

    // 儲存到 Sanity
    const registration = {
      _type: 'registration',
      event: {
        _type: 'reference',
        _ref: eventId,
      },
      name,
      email,
      ...(phone && { phone }),
      ...(note && { note }),
      registeredAt: new Date().toISOString(),
    };

    console.log('Creating registration:', registration);
    
    // 使用 Sanity 的 createMutation 來創建記錄
    const result = await client.create(registration);
    
    if (!result) {
      console.error('Failed to create registration:', registration);
      return res.status(500).json({ 
        message: 'Failed to create registration',
        error: 'No result from Sanity'
      });
    }

    console.log('Registration successful:', result);
    return res.status(200).json({ 
      message: 'Registration successful',
      registrationId: result._id
    });
  } catch (error: any) {
    console.error('Error creating registration:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('Rate limit')) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later.'
        });
      }
      
      if (error.message.includes('duplicate')) {
        return res.status(409).json({
          success: false,
          message: 'You have already registered for this event.'
        });
      }
    }
    
    // Generic error response
    return res.status(500).json({
      success: false,
      message: 'Error processing registration',
      ...(process.env.NODE_ENV === 'development' && {
        error: error.message || 'Unknown error',
        stack: error.stack
      })
    });
  }
}
