// components/NavBar.tsx

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, LogOut } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export default function NavBar() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  const pathname = usePathname();

  // 路由切換時自動關閉手機選單
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // 按 Escape 時關閉手機選單
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileMenuOpen]);

  // 手機選單開啟時禁止背景滾動
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  // 滾動時加陰影
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const aboutLinks = [
    { name: '異象與使命', href: '/about/vision-mission' },
    { name: '實行之路', href: '/about/implementation' },
    { name: '教會策略', href: '/about/strategy' },
    { name: '教會核心價值', href: '/about/core-values' },
    { name: '各種成全聚會', href: '/about/gatherings' },
  ];

  const coursesLinks = [
    { name: '如何教養青少年', href: '/courses/teen-parenting' },
    { name: '如何教養兒童', href: '/courses/child-parenting' },
    { name: '親密之旅', href: '/courses/intimacy-journey' },
    { name: '理財有道', href: '/courses/financial-wisdom' },
    { name: '兒童品格班', href: '/courses/children-character' },
  ];

  const videoLinks = [
    { name: '教會簡介', href: '/video/church-intro' },
    { name: '幸福小組花絮', href: '/video/happy-group' },
  ];

  const memberLinks = [
    {
      name: '愛宴系統',
      href: '/auth/login?callbackUrl=/member/meal',
      current: pathname === '/member/meal',
    },
    {
      name: '小組長回報系統',
      href: '/auth/login?callbackUrl=/member/group-report',
      current: pathname === '/member/group-report',
    },
    {
      name: '活動報名',
      href: '/auth/login?callbackUrl=/member/event-registration',
      current: pathname === '/member/event-registration',
    },
    {
      name: '登出',
      href: '#',
      onClick: async (e: React.MouseEvent) => {
        e.preventDefault();
        await signOut({ callbackUrl: '/' });
      },
      className: 'text-red-600 hover:bg-red-50',
      icon: <LogOut className="w-4 h-4 mr-2 inline" />
    },
  ];

  const links = [
    { name: '首頁', href: '/' },
    { name: '關於我們', href: '/about', isAbout: true },
    { name: '課程資訊', href: '/courses', isCourses: true },
    { name: '影音平台', href: 'https://www.youtube.com/@南科福氣教會/featured', isVideo: true },
    { name: '會友專區', href: '/member', isMember: true },
    // 線上奉獻：不用加在這裡，直接在下方分開寫（如原本設計）
  ];

  return (
    <nav className={`fixed w-full z-50 bg-white ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto flex items-center justify-between h-16 md:h-28 px-4">
        <Link href="/" className="flex items-center h-full">
          <img
            src="/images/logo-horizontal-1.png"
            alt="南科福氣教會"
            className="h-10 lg:h-16 w-auto"
          />
        </Link>
        <button
          className="lg:hidden p-2 text-yellow-500 hover:text-yellow-600 transition"
          onClick={() => setMobileMenuOpen(o => !o)}
          aria-label="開啟選單"
        >
          <Menu size={24} />
        </button>

        {/* 桌面版選單 */}
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center gap-12 whitespace-nowrap">
            {links.map(l => {
              if (l.isAbout) {
                return (
                  <li key="about" className="relative group">
                    <button
                      className="flex items-center gap-1 text-gray-800 hover:text-pink-500 transition text-base lg:text-lg"
                      onClick={e => { e.preventDefault(); setAboutOpen(o => !o); }}
                    >
                      關於我們 <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <ul className={`absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 ${aboutOpen ? 'block' : 'hidden'}`}>
                      {aboutLinks.map(a => (
                        <li key={a.name}>
                          <Link href={a.href} className="block px-4 py-2 text-gray-800 hover:bg-pink-500/10">
                            {a.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              if (l.isCourses) {
                return (
                  <li key="courses" className="relative group">
                    <button
                      className="flex items-center gap-1 text-gray-800 hover:text-pink-500 transition text-base lg:text-lg"
                      onClick={e => { e.preventDefault(); setCoursesOpen(o => !o); }}
                    >
                      課程資訊 <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <ul className={`absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 ${coursesOpen ? 'block' : 'hidden'}`}>
                      {coursesLinks.map(c => (
                        <li key={c.name}>
                          <Link href={c.href} className="block px-4 py-2 text-gray-800 hover:bg-pink-500/10">
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              if (l.isVideo) {
                return (
                  <li key="video" className="relative group">
                    <button
                      className="flex items-center gap-1 text-gray-800 hover:text-pink-500 transition text-base lg:text-lg"
                      onClick={e => { e.preventDefault(); setVideoOpen(o => !o); }}
                    >
                      影音平台 <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <ul className={`absolute left-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 ${videoOpen ? 'block' : 'hidden'}`}>
                      {videoLinks.map(v => (
                        <li key={v.name}>
                          <Link href={v.href} className="block px-4 py-2 text-gray-800 hover:bg-pink-500/10">
                            {v.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              if (l.isMember) {
                return (
                  <li key="member" className="relative group">
                    <button
                      className="flex items-center gap-1 text-gray-800 hover:text-pink-500 transition text-base lg:text-lg"
                      onClick={e => { e.preventDefault(); setMemberOpen(o => !o); }}
                    >
                      會友專區 <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <ul className={`absolute left-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 ${memberOpen ? 'block' : 'hidden'}`}>
                      {memberLinks.map(m => (
                        <li key={m.name}>
                          {m.onClick ? (
                            <a
                              href={m.href}
                              onClick={e => { e.preventDefault(); m.onClick?.(e); setMemberOpen(false); }}
                              className={`flex items-center px-4 py-2 transition ${m.className || (m.current ? 'text-pink-500 font-semibold' : 'text-gray-800 hover:bg-pink-500/10')}`}
                            >
                              {m.icon}{m.name}
                            </a>
                          ) : (
                            <Link
                              href={m.href}
                              onClick={() => setMemberOpen(false)}
                              className={`block px-4 py-2 transition ${m.current ? 'text-pink-500 font-semibold' : 'text-gray-800 hover:bg-pink-500/10'}`}
                            >
                              {m.name}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }
              return (
                <li key={l.name}>
                  <Link href={l.href} className="text-gray-800 hover:text-pink-500 transition text-base lg:text-lg">
                    {l.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* 桌面版的「線上奉獻」按鈕 */}
          <Link
            href="/donate"
            className="ml-12 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-medium hover:opacity-90 shadow-lg transition"
          >
            線上奉獻
          </Link>
        </div>
      </div>

      {/* 手機版全螢幕浮層選單 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Link href="/">
              <img src="/images/logo-horizontal-1.png" alt="南科福氣教會" className="h-10 w-auto" />
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="關閉選單">
              <X size={24} className="text-yellow-500" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {/* 首頁 */}
            <Link href="/" className="block px-4 py-3 text-xl font-semibold hover:bg-gray-100 rounded-lg">
              首頁
            </Link>
            {/* 關於我們 */}
            <div>
              <div
                className="flex justify-between items-center px-4 py-3 text-xl font-semibold hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => setAboutOpen(o => !o)}
              >
                關於我們
                <ChevronDown className={`transform transition ${aboutOpen ? 'rotate-180' : ''}`} />
              </div>
              {aboutOpen && (
                <div className="pl-6 space-y-2">
                  {aboutLinks.map(a => (
                    <Link key={a.name} href={a.href} className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      {a.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* 課程資訊 */}
            <div>
              <div
                className="flex justify-between items-center px-4 py-3 text-xl font-semibold hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => setCoursesOpen(c => !c)}
              >
                課程資訊
                <ChevronDown className={`transform transition ${coursesOpen ? 'rotate-180' : ''}`} />
              </div>
              {coursesOpen && (
                <div className="pl-6 space-y-2">
                  {coursesLinks.map(c => (
                    <Link key={c.name} href={c.href} className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* 影音平台 */}
            <div>
              <div
                className="flex justify-between items-center px-4 py-3 text-xl font-semibold hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => setVideoOpen(v => !v)}
              >
                影音平台
                <ChevronDown className={`transform transition ${videoOpen ? 'rotate-180' : ''}`} />
              </div>
              {videoOpen && (
                <div className="pl-6 space-y-2">
                  {videoLinks.map(v => (
                    <Link key={v.name} href={v.href} className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                      {v.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {/* 會友專區 */}
            <div>
              <div
                className="flex justify-between items-center px-4 py-3 text-xl font-semibold hover:bg-gray-100 rounded-lg cursor-pointer"
                onClick={() => setMemberOpen(m => !m)}
              >
                會友專區
                <ChevronDown className={`transform transition ${memberOpen ? 'rotate-180' : ''}`} />
              </div>
              {memberOpen && (
                <div className="pl-6 space-y-2">
                  {memberLinks.map(m => (
                    <React.Fragment key={m.name}>
                      {m.onClick ? (
                        <a
                          onClick={m.onClick}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg"
                        >
                          {m.icon}{m.name}
                        </a>
                      ) : (
                        <Link href={m.href} className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                          {m.name}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            {/* 線上奉獻 */}
            <Link
              href="/donate"
              className="block text-center px-4 py-3 text-xl font-bold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl shadow-lg"
            >
              線上奉獻
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
