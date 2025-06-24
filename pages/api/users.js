import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // 驗證管理員權限
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || !session.user?.isAdmin) {
    return res.status(403).json({ message: '無權訪問' });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        isApproved: true,
        isAdmin: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('獲取用戶失敗:', error);
    res.status(500).json({ message: '獲取用戶數據失敗' });
  } finally {
    await prisma.$disconnect();
  }
}
