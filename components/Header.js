import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Logo 區塊 */}
        <div className="flex justify-center md:justify-start mb-2">
          <Link href="/" className="flex items-center gap-4">
            <Image
              src="/logo.png"
              alt="南科福氣教會 Logo"
              width={213}
              height={85}
              className="h-10 w-auto"
              priority
            />
          </Link>
        </div>

        {/* 平均分散的選單，每個選項 w-1/6 */}

        {/* 手機版選單按鈕 */}
        
      </div>

      {/* 手機版選單 */}
    </header>
  );
}
