'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
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

  // 在客戶端渲染前返回空 div 避免 hydration 不匹配
  if (!isMounted) {
    return <div className="h-0 w-0" />;
  }

  return (
    <footer className={`bg-gradient-to-br from-rose-50 via-amber-50 to-cyan-50 text-gray-700 w-full mt-auto ${className}`}>
      <div className="w-full">
        <div className="lg:hidden pt-8 pb-12 px-4 w-full">
          <div className="container mx-auto px-4">
            <div className="space-y-8">
              {/* 聯絡我們區塊 */}
              <div className="rounded-xl p-6 bg-white/50 backdrop-blur-sm shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 relative pb-2">
                  聯絡我們
                  <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-cyan-400 to-rose-400"></span>
                </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="flex-shrink-0 h-5 w-5 text-amber-400 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">主日聚會時間</p>
                    <p className="text-sm text-gray-600">每週日 上午 10:00-12:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="flex-shrink-0 h-5 w-5 text-rose-500 mt-0.5" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">聚會地址</p>
                    <p className="text-sm text-gray-600">南科育成中心 B101 國際會議廳</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-cyan-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">電子郵件</p>
                    <a href="mailto:Info.NKBBC@gmail.com" className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors">
                      Info.NKBBC@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-amber-500" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">聯絡電話</p>
                    <div className="flex flex-wrap items-center gap-x-1">
                      <a href="tel:+886929327486" className="text-sm text-rose-600 hover:text-rose-700 transition-colors">
                        0929-327-486
                      </a>
                      <span className="text-gray-400">/</span>
                      <a href="tel:+8865834626" className="text-sm text-rose-600 hover:text-rose-700 transition-colors">
                        06-5834626
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 社群媒體 */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-3">關注我們</p>
                <div className="flex space-x-4">
                  <a href="https://lin.ee/nQ7s6dC" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                    <Image src="/images/social/line.png" alt="Line" width={24} height={24} className="w-6 h-6" />
                  </a>
                  <a href="https://www.instagram.com/info_nkbbc/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                    <Image src="/images/social/instagram.png" alt="Instagram" width={24} height={24} className="w-6 h-6" />
                  </a>
                  <a href="https://www.youtube.com/@南科福氣教會/featured" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                    <Image src="/images/social/youtube.png" alt="YouTube" width={24} height={24} className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* 版權資訊 */}
            <div className="text-center">
              <div className="flex justify-center space-x-4 mb-1">
                <Link href="/privacy" className="text-xs text-gray-500 hover:text-rose-500 transition-colors">
                  隱私權政策
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/terms" className="text-xs text-gray-500 hover:text-rose-500 transition-colors">
                  使用條款
                </Link>
              </div>
              <p className="text-xs text-gray-500">
                &copy; {currentYear} 南科福氣教會 版權所有
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 桌面版頁尾 */}
      <div className="hidden lg:block w-full bg-gradient-to-br from-rose-50 via-amber-50 to-cyan-50 pt-12 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-5 mb-8">
            <style jsx>{`
              .footer-column {
                padding: 0 1.5rem;
              }
              .footer-column:first-child {
                padding-left: 0;
              }
              .footer-column:last-child {
                padding-right: 0;
              }
            `}</style>
            {/* 教會資訊 */}
            <div className="space-y-4 footer-column">
              <Link href="/" className="inline-block">
                <img 
                  src="/images/logo-horizontal.png" 
                  alt="南科福氣教會"
                  className="h-12 w-auto"
                />
              </Link>
              <p className="text-gray-600 text-sm leading-relaxed">
                我們是一群追隨耶穌的門徒，致力於建立一個充滿愛與盼望的信仰群體，
                透過真理的教導和生命的見證，將福音帶給每一個人。
              </p>
              <div className="flex space-x-4 pt-2">
                <a href="https://lin.ee/nQ7s6dC" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                  <Image src="/images/social/line.png" alt="Line" width={24} height={24} className="w-6 h-6" />
                </a>
                <a href="https://www.instagram.com/info_nkbbc/" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                  <Image src="/images/social/instagram.png" alt="Instagram" width={24} height={24} className="w-6 h-6" />
                </a>
                <a href="https://www.youtube.com/@南科福氣教會/featured" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
                  <Image src="/images/social/youtube.png" alt="YouTube" width={24} height={24} className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* 快速連結 */}
            <div className="footer-column" style={{ paddingLeft: '2rem' }}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 relative pb-2">
                快速連結
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-rose-400 to-amber-400"></span>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/"
                    className="text-gray-600 hover:text-rose-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                    首頁
                  </Link>
                </li>

                <li>
                  <Link 
                    href="/about/gatherings"
                    className="text-gray-600 hover:text-rose-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                    聚會資訊
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/event-registration"
                    className="text-gray-600 hover:text-rose-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                    活動報名
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/member/meal"
                    className="text-gray-600 hover:text-rose-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                    愛宴系統
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/member/group-report"
                    className="text-gray-600 hover:text-rose-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mr-2"></span>
                    小組長回報系統
                  </Link>
                </li>
              </ul>
            </div>

            {/* 關於我們 */}
            <div className="footer-column">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 relative pb-2">
                關於我們
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-amber-400 to-cyan-400"></span>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/about/vision-mission"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                    異象與使命
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about/implementation"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                    實行之路
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about/strategy"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                    教會策略
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about/core-values"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                    教會核心價值
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about/gatherings"
                    className="text-gray-600 hover:text-amber-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2"></span>
                    各種成全聚會
                  </Link>
                </li>
              </ul>
            </div>

            {/* 影音平台 */}
            <div className="footer-column">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 relative pb-2">
                影音平台
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-amber-400 to-cyan-400"></span>
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/video/church-intro"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                    教會簡介
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/video/happy-group"
                    className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
                    幸福小組花絮
                  </Link>
                </li>
              </ul>
            </div>

            {/* 聯絡資訊 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 relative pb-2">
                聯絡我們
                <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-cyan-400 to-rose-400"></span>
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Clock className="flex-shrink-0 h-5 w-5 text-rose-400 mt-0.5" />
                  <span className="ml-3 text-gray-600 text-sm">
                    主日聚會時間：<br />每週日 上午 10:00-12:00
                  </span>
                </li>
                <li className="flex items-start">
                  <MapPin className="flex-shrink-0 h-5 w-5 text-rose-500 mt-0.5" />
                  <span className="ml-3 text-gray-600 text-sm">
                    聚會地址：<br />南科育成中心 B101 國際會議廳
                  </span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-cyan-500" />
                  <a href="mailto:Info.NKBBC@gmail.com" className="ml-3 text-gray-600 hover:text-cyan-600 transition-colors text-sm">
                    Info.NKBBC@gmail.com
                  </a>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-amber-500" />
                  <a href="tel:+886929327486" className="ml-3 text-gray-600 hover:text-amber-600 transition-colors text-sm">
                    0929-327-486
                  </a>
                  <span className="mx-2 text-gray-400">/</span>
                  <a href="tel:+8865834626" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">
                    06-5834626
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* 版權資訊 */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">
                © {currentYear} 南科福氣教會 版權所有
              </p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="text-gray-500 hover:text-rose-500 text-sm transition-colors">
                  隱私權政策
                </Link>
                <span className="text-gray-300">|</span>
                <Link href="/terms" className="text-gray-500 hover:text-rose-500 text-sm transition-colors">
                  使用條款
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}