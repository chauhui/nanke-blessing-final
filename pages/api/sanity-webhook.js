import { PrismaClient } from '@prisma/client';
import { verifySignature } from '@sanity/webhook';

// 禁用默認的 bodyParser

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 驗證 webhook 簽名
    const signature = req.headers['sanity-webhook-signature'];
    const body = await buffer(req);
    
    // 驗證簽名（確保在 Sanity 管理面板中設置了 WEBHOOK_SECRET 環境變量）
    const isValid = await verifySignature(
      body.toString('utf8'),
      signature,
      process.env.SANITY_WEBHOOK_SECRET
    );

    if (!isValid) {
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
