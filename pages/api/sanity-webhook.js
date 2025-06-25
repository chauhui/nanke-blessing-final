import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

// 禁用默認的 bodyParser
export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

// 原生 buffer 解析
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

// 驗證 Sanity Webhook HMAC 簽名
function verifySanitySignature({ payloadBuffer, signature, secret }) {
  if (!signature || !secret) return false;
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(payloadBuffer);
  const expected = hmac.digest('base64');
  // sanity webhook signature 使用 base64
  return signature === expected;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 取得原始 payload
    const body = await buffer(req);

    // Sanity webhook 簽名在這個 header
    const signature = req.headers['sanity-webhook-signature'];
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    if (!verifySanitySignature({ payloadBuffer: body, signature, secret })) {
      return res.status(401).json({ message: 'Invalid signature' });
    }

    const payload = JSON.parse(body.toString('utf8'));

    // 只處理 userApproval 文檔類型的更新
    if (payload.type === 'userApproval') {
      const { user, isApproved, isAdmin } = payload;

      // 更新 Prisma 中的用戶狀態
      await prisma.user.update({
        where: { id: user._ref },
        data: {
          isApproved,
          isAdmin,
        },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Webhook handler failed', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
