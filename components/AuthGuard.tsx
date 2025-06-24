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

  // 如果未登入且不在登入頁面，返回 null（已經處理了重定向）
  if (status === 'unauthenticated' && pathname !== '/member') {
    return null;
  }

  // 已經登入或在登入頁面，顯示內容
  return <>{children}</>;
}
