'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation'; // ← usePathname 取當前路徑
import { useEffect, useState, ReactNode } from 'react';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function Auth({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router    = useRouter();
  const pathname  = usePathname();                   // ← 實際路徑字串
  const [loading, setLoading] = useState(true);

  const isProtectedRoute = pathname?.startsWith('/member/');
  const isLoginPage      = pathname === '/auth/login';

  useEffect(() => {
    if (status === 'loading') return;                // 還在拿 session
    if (!isProtectedRoute) {
      setLoading(false);                             // 不保護
      return;
    }

    if (status === 'unauthenticated') {
      // 未登入→帶 callbackUrl 跳登入
      const cb = encodeURIComponent(pathname);
      router.replace(`/auth/login?callbackUrl=${cb}`);
      return;
    }

    if (!session?.user?.isApproved) {
      // 未通過審核→跳錯誤訊息
      router.replace('/auth/login?error=AccountNotApproved');
      return;
    }

    // 已登入且通過審核
    setLoading(false);
  }, [status, session, router, pathname, isProtectedRoute]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
