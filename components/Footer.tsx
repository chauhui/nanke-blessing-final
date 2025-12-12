// components/Footer.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';
import Image from 'next/image';

interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="h-0 w-0" />;
  }

  return (
    <footer className={`bg-[#E5E5E5] text-[#475569] w-full mt-auto border-t border-[#D4D4D8] ${className}`}>
      
      {/* 調整 padding: 手機版 py-10, 電腦版維持原本設定 */}
      <div className="w-full pt-10 pb-8 lg:pt-16 lg:pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* [修改重點] Grid 佈局：
             1. 手機版改為 grid-cols-2 (兩欄)，這樣連結區可以並排。
             2. 電腦版維持 lg:grid-cols-12。
             3. 間距調整為 gap-y-8 gap-x-4。
          */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-4 gap-y-8 lg:gap-8 mb-8 lg:mb-12">
            
            {/* 1. 品牌區塊 */}
            {/* 手機版佔滿兩欄 (col-span-2)，電腦版佔 4 欄 */}
            <div className="col-span-2 lg:col-span-4 space-y-4 lg:space-y-6">
              {/* 手機版：Logo 與 社群 icon 左右並排 (flex-row)，節省空間 */}
              {/* 電腦版：回復原本的垂直排列 (lg:flex-col) */}
              <div className="flex flex-row lg:flex-col justify-between items-center lg:items-start">
                <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
                  <img 
                    src="/images/logo-horizontal.png" 
                    alt="南科福氣教會"
                    className="h-8 lg:h-10 w-auto mix-blend-multiply" 
                  />
                </Link>

                {/* 社群 Icon (手機版顯示在 Logo 右側，電腦版會在下方) */}
                <div className="flex space-x-4 lg:space-x-6 lg:pt-2">
                  <a href="https://lin.ee/nQ7s6dC" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 hover:opacity-80">
                    <Image src="/images/social/line.png" alt="Line" width={32} height={32} className="w-7 h-7 lg:w-8 lg:h-8" />
                  </a>
                  <a href="https://www.instagram.com/info_nkbbc/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 hover:opacity-80">
                    <Image src="/images/social/instagram.png" alt="Instagram" width={32} height={32} className="w-7 h-7 lg:w-8 lg:h-8" />
                  </a>
                  <a href="https://www.youtube.com/@南科福氣教會/featured" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 hover:opacity-80">
                    <Image src="/images/social/youtube.png" alt="YouTube" width={32} height={32} className="w-7 h-7 lg:w-8 lg:h-8" />
                  </a>
                </div>
              </div>

              {/* [修改重點] 描述文字：手機版隱藏 (hidden)，電腦版顯示 (lg:block) */}
              {/* 這樣可以大幅減少手機版 Footer 的長度 */}
              <p className="hidden lg:block text-[#525252] text-sm leading-loose max-w-sm font-medium">
                我們是一群追隨耶穌的門徒，致力於建立一個充滿愛與盼望的信仰群體，
                透過真理的教導和生命的見證，將福音帶給每一個人。
              </p>
            </div>

            {/* 2. 快速連結 */}
            {/* 手機版佔 1 欄 (col-span-1)，與右邊的探索更多並排 */}
            <div className="col-span-1 lg:col-span-2 lg:pl-8">
              <h3 className="text-[#171717] font-serif font-bold tracking-widest uppercase mb-4 lg:mb-6 text-sm border-b-2 border-[#1E1B4B] inline-block pb-1">
                快速連結
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { label: '首頁', href: '/' },
                  { label: '聚會資訊', href: '/about/gatherings' },
                  { label: '活動報名', href: '/event-registration' },
                  { label: '愛宴系統', href: '/member/meal' },
                  { label: '小組長回報', href: '/member/group-report' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[#525252] hover:text-[#B45309] transition-colors text-sm flex items-center gap-2 group font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A3A3A3] group-hover:bg-[#B45309] transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. 探索更多 */}
            {/* 手機版佔 1 欄 (col-span-1)，並排顯示 */}
            <div className="col-span-1 lg:col-span-2">
              <h3 className="text-[#171717] font-serif font-bold tracking-widest uppercase mb-4 lg:mb-6 text-sm border-b-2 border-[#1E1B4B] inline-block pb-1">
                探索更多
              </h3>
              <ul className="space-y-2 lg:space-y-3">
                {[
                  { label: '異象與使命', href: '/about/vision-mission' },
                  { label: '實行之路', href: '/about/implementation' },
                  { label: '教會策略', href: '/about/strategy' },
                  { label: '教會核心價值', href: '/about/core-values' },
                  { label: '教會簡介影片', href: '/video/church-intro' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-[#525252] hover:text-[#B45309] transition-colors text-sm flex items-center gap-2 group font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A3A3A3] group-hover:bg-[#B45309] transition-colors"></span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. 聯絡資訊 */}
            {/* 手機版佔滿兩欄 (col-span-2)，維持在最下方 */}
            <div className="col-span-2 lg:col-span-4 lg:pl-8 border-t lg:border-t-0 lg:border-l border-[#D4D4D8] pt-6 lg:pt-0">
              <h3 className="text-[#171717] font-serif font-bold tracking-widest uppercase mb-4 lg:mb-6 text-sm border-b-2 border-[#1E1B4B] inline-block pb-1">
                Contact Us
              </h3>
              
              <ul className="space-y-4 lg:space-y-5">
                <li className="flex items-start group">
                  <div className="mt-0.5"><Clock className="w-5 h-5 text-[#1E1B4B] group-hover:text-[#B45309] transition-colors" /></div>
                  <div className="ml-4">
                    <span className="block text-xs text-[#737373] uppercase tracking-wider mb-1 font-bold">Service Time</span>
                    <span className="text-[#404040] text-sm font-medium">每週日 上午 10:00-12:00</span>
                  </div>
                </li>
                
                <li className="flex items-start group">
                  <div className="mt-0.5"><MapPin className="w-5 h-5 text-[#1E1B4B] group-hover:text-[#B45309] transition-colors" /></div>
                  <div className="ml-4">
                    <span className="block text-xs text-[#737373] uppercase tracking-wider mb-1 font-bold">Address</span>
                    <span className="text-[#404040] text-sm font-medium">南科育成中心 B101 國際會議廳</span>
                  </div>
                </li>

                <li className="flex items-start group">
                  <div className="mt-0.5"><Phone className="w-5 h-5 text-[#1E1B4B] group-hover:text-[#B45309] transition-colors" /></div>
                  <div className="ml-4">
                    <span className="block text-xs text-[#737373] uppercase tracking-wider mb-1 font-bold">Phone</span>
                    <div className="flex gap-3 text-[#404040] text-sm font-medium">
                      <a href="tel:+886929327486" className="hover:text-[#B45309] transition-colors">0929-327-486</a>
                      <span className="text-[#A3A3A3]">/</span>
                      <a href="tel:+8865834626" className="hover:text-[#B45309] transition-colors">06-5834626</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* 版權資訊 */}
          <div className="border-t border-[#D4D4D8] pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#737373] text-[10px] lg:text-xs font-medium text-center md:text-left">
              © {currentYear} 南科福氣教會 Nanke Blessed & Blessing Church. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-[#737373] hover:text-[#1E1B4B] text-[10px] lg:text-xs transition-colors font-medium">隱私權政策</Link>
              <Link href="/terms" className="text-[#737373] hover:text-[#1E1B4B] text-[10px] lg:text-xs transition-colors font-medium">使用條款</Link>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}