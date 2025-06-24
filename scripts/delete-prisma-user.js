const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteUserByEmail(email) {
  try {
    console.log(`正在查找用戶: ${email}`);
    
    // 1. 查找用戶
    const user = await prisma.user.findUnique({
      where: { email }
    });
    
    if (!user) {
      console.log('找不到該電子郵件的用戶');
      return;
    }
    
    console.log('找到用戶:', user);
    
    // 2. 先刪除相關的 account 和 session 記錄
    await prisma.account.deleteMany({
      where: { userId: user.id }
    });
    
    await prisma.session.deleteMany({
      where: { userId: user.id }
    });
    
    // 3. 刪除用戶
    const deletedUser = await prisma.user.delete({
      where: { email }
    });
    
    console.log('用戶刪除成功:', deletedUser);
    
  } catch (error) {
    console.error('刪除用戶時出錯:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 從命令行參數獲取電子郵件
const email = process.argv[2];
if (!email) {
  console.error('請提供要刪除的用戶電子郵件');
  console.log('使用方法: node scripts/delete-prisma-user.js 用戶電子郵件');
  process.exit(1);
}

deleteUserByEmail(email).catch(console.error);
