// pages/member/index.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MemberIndex() {
  const router = useRouter();
  
  useEffect(() => {
    // [修正] 原本導向 /member/meal (已不存在)，現在改為導向小組長回報系統
    router.replace('/member/group-report');
  }, [router]);

  return null; // 頁面本身不顯示任何內容，只負責轉址
}