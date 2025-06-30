'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    // 如果未登入且不在登入頁面
    if (status === 'unauthenticated' && !pathname?.startsWith('/member')) {
      if (!isRedirecting) {
        setIsRedirecting(true);
        router.push(`/member?callbackUrl=${encodeURIComponent(pathname || '/')}`);
      }
      return;
    }

    // 如果已經登入且在登入頁面
    if (status === 'authenticated' && pathname === '/member') {
      if (!isRedirecting) {
        setIsRedirecting(true);
        router.push('/member/meal');
      }
      return;
    }

    // 重置重定向狀態
    if (isRedirecting) {
      setIsRedirecting(false);
    }
  }, [status, pathname, router, isRedirecting]);

  // 如果正在載入或正在重定向，顯示載入狀態
  if (status === 'loading' || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  // **修正重點：如果未登入且不在登入頁面，顯示登入提示，不要 return null**
  if (status === 'unauthenticated' && pathname !== '/member') {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center text-gray-500">
        <span className="text-xl font-semibold mb-2">請先登入才能使用本功能</span>
        <span className="text-sm">若未自動跳轉，請手動前往登入頁面</span>
      </div>
    );
  }

  // 已經登入或在登入頁面，顯示內容
  return <>{children}</>;
}
