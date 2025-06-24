// pages/member/index.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MemberIndex() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/member/meal');
  }, [router]);
  return null;
}
