// components/NavBar.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

/** ===== Inline SVG icons（取代 lucide-react，避免 undefined） ===== */
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  )
}
function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
function LogoutIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  )
}
/** ================================================================== */

export default function NavBar() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [memberOpen, setMemberOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()

  // --- 關閉延遲計時器（避免邊界閃爍） ---
  const aboutTimer = useRef<number | null>(null)
  const coursesTimer = useRef<number | null>(null)
  const videoTimer = useRef<number | null>(null)
  const memberTimer = useRef<number | null>(null)

  const openMenu = (setter: (v: boolean) => void, timerRef: React.MutableRefObject<number | null>) => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setter(true)
  }
  const scheduleClose = (setter: (v: boolean) => void, timerRef: React.MutableRefObject<number | null>) => {
    timerRef.current = window.setTimeout(() => setter(false), 120)
  }

  // 手機選單開關時鎖住背景捲動
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [mobileMenuOpen])

  // ESC 關閉
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // 切頁自動關閉手機選單
  useEffect(() => { setMobileMenuOpen(false) }, [pathname])

  // 捲動陰影
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const aboutLinks = [
    { name: '異象與使命', href: '/about/vision-mission' },
    { name: '實行之路', href: '/about/implementation' },
    { name: '教會策略', href: '/about/strategy' },
    { name: '教會核心價值', href: '/about/core-values' },
    { name: '各種成全聚會', href: '/about/gatherings' },
  ]

  const coursesLinks = [
    { name: '如何教養青少年', href: '/courses/teen-parenting' },
    { name: '如何教養孩童', href: '/courses/child-parenting' },
    { name: '親密之旅', href: '/courses/intimacy-journey' },
    { name: '理財有道', href: '/courses/financial-wisdom' },
    { name: '兒童品格班', href: '/courses/children-character' },
  ]

  const videoLinks = [
    { name: '教會簡介', href: '/video/church-intro' },
    { name: '幸福小組花絮', href: '/video/happy-group' },
  ]

  // 🔴 直開受保護頁，讓該頁用 SSR 決定是否轉登入，避免 callbackUrl 迴圈
  const memberLinks = [
    { name: '愛宴系統', href: '/member/meal', current: pathname === '/member/meal' },
    { name: '小組長回報系統', href: '/member/group-report', current: pathname === '/member/group-report' },
    { name: '活動報名', href: '/member/event-registration', current: pathname === '/member/event-registration' },
    {
      name: '登出',
      href: '#',
      onClick: async (e: React.MouseEvent) => {
        e.preventDefault()
        await signOut({ callbackUrl: '/' })
      },
      className: 'text-red-600 hover:bg-red-50',
      icon: <LogoutIcon className="w-4 h-4 mr-2 inline" />,
    },
  ]

  const links = [
    { name: '首頁', href: '/' },
    { name: '關於我們', href: '/about', isAbout: true },
    { name: '課程資訊', href: '/courses', isCourses: true },
    { name: '影音平台', href: '/video', isVideo: true },
    { name: '會友專區', href: '/member', isMember: true },
  ]

  return (
    <nav className={`fixed w-full z-50 bg-white ${scrolled ? 'shadow-md' : ''}`}>
      <div className="container mx-auto flex items-center justify-between h-16 md:h-28 px-4">
        <Link href="/" className="flex items-center h-full no-underline hover:no-underline">
          <img src="/images/logo-horizontal.png" alt="南科福氣教會" className="h-10 lg:h-16 w-auto" />
        </Link>

        {/* 手機菜單按鈕 */}
        <button
          className="lg:hidden p-2 text-primary hover:text-secondary transition"
          onClick={() => setMobileMenuOpen(o => !o)}
          aria-label="開啟選單"
        >
          <MenuIcon />
        </button>

        {/* 桌面版選單 */}
        <div className="hidden lg:flex items-center">
          <ul className="flex items-center gap-12 whitespace-nowrap">
            {links.map(l => {
              if (l.isAbout) {
                return (
                  <li
                    key="about"
                    className="relative"
                    onMouseEnter={() => openMenu(setAboutOpen, aboutTimer)}
                    onMouseLeave={() => scheduleClose(setAboutOpen, aboutTimer)}
                  >
                    <button
                      className="flex items-center gap-1 text-gray-800 no-underline hover:no-underline hover:text-primary focus:text-primary active:text-primary/80 transition text-base lg:text-lg"
                      onClick={() => setAboutOpen(o => !o)}
                      aria-haspopup="menu"
                      aria-expanded={aboutOpen}
                    >
                      關於我們 <ChevronDownIcon className={`ml-1 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {/* 使用 top-full + pt-2 消除觸發器與面板的空隙，避免閃爍 */}
                    <div className="absolute left-0 top-full pt-2">
                      <ul
                        className={`w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 ${
                          aboutOpen ? 'block' : 'hidden'
                        }`}
                        role="menu"
                      >
                        {aboutLinks.map(a => (
                          <li key={a.name}>
                            <Link
                              href={a.href}
                              onClick={() => setAboutOpen(false)}
                              className="block px-4 py-2 text-gray-800 no-underline hover:no-underline hover:bg-gray-100 hover:text-primary focus:text-primary active:text-primary/80 transition"
                              role="menuitem"
                            >
                              {a.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              }
              if (l.isCourses) {
                return (
                  <li
                    key="courses"
                    className="relative"
                    onMouseEnter={() => openMenu(setCoursesOpen, coursesTimer)}
                    onMouseLeave={() => scheduleClose(setCoursesOpen, coursesTimer)}
                  >
                    <button
                      className="flex items-center gap-1 text-gray-800 no-underline hover:no-underline hover:text-primary focus:text-primary active:text-primary/80 transition text-base lg:text-lg"
                      onClick={() => setCoursesOpen(o => !o)}
                      aria-haspopup="menu"
                      aria-expanded={coursesOpen}
                    >
                      課程資訊 <ChevronDownIcon className={`ml-1 transition-transform ${coursesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="absolute left-0 top-full pt-2">
                      <ul
                        className={`w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 ${
                          coursesOpen ? 'block' : 'hidden'
                        }`}
                        role="menu"
                      >
                        {coursesLinks.map(c => (
                          <li key={c.name}>
                            <Link
                              href={c.href}
                              onClick={() => setCoursesOpen(false)}
                              className="block px-4 py-2 text-gray-800 no-underline hover:no-underline hover:bg-gray-100 hover:text-primary focus:text-primary active:text-primary/80 transition"
                              role="menuitem"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              }
              if (l.isVideo) {
                return (
                  <li
                    key="video"
                    className="relative"
                    onMouseEnter={() => openMenu(setVideoOpen, videoTimer)}
                    onMouseLeave={() => scheduleClose(setVideoOpen, videoTimer)}
                  >
                    <button
                      className="flex items-center gap-1 text-gray-800 no-underline hover:no-underline hover:text-primary focus:text-primary active:text-primary/80 transition text-base lg:text-lg"
                      onClick={() => setVideoOpen(o => !o)}
                      aria-haspopup="menu"
                      aria-expanded={videoOpen}
                    >
                      影音平台 <ChevronDownIcon className={`ml-1 transition-transform ${videoOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="absolute left-0 top-full pt-2">
                      <ul
                        className={`w-48 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 ${
                          videoOpen ? 'block' : 'hidden'
                        }`}
                        role="menu"
                      >
                        {videoLinks.map(v => (
                          <li key={v.name}>
                            <Link
                              href={v.href}
                              onClick={() => setVideoOpen(false)}
                              className="block px-4 py-2 text-gray-800 no-underline hover:no-underline hover:bg-gray-100 hover:text-primary focus:text-primary active:text-primary/80 transition"
                              role="menuitem"
                            >
                              {v.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              }
              if (l.isMember) {
                return (
                  <li
                    key="member"
                    className="relative"
                    onMouseEnter={() => openMenu(setMemberOpen, memberTimer)}
                    onMouseLeave={() => scheduleClose(setMemberOpen, memberTimer)}
                  >
                    <button
                      className="flex items-center gap-1 text-gray-800 no-underline hover:no-underline hover:text-primary focus:text-primary active:text-primary/80 transition text-base lg:text-lg"
                      onClick={() => setMemberOpen(o => !o)}
                      aria-haspopup="menu"
                      aria-expanded={memberOpen}
                    >
                      會友專區 <ChevronDownIcon className={`ml-1 transition-transform ${memberOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="absolute left-0 top-full pt-2">
                      <ul
                        className={`w-56 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 ${
                          memberOpen ? 'block' : 'hidden'
                        }`}
                        role="menu"
                      >
                        {memberLinks.map(m => (
                          <li key={m.name}>
                            {m.onClick ? (
                              <a
                                href={m.href}
                                onClick={e => {
                                  e.preventDefault()
                                  m.onClick?.(e)
                                  setMemberOpen(false)
                                }}
                                className={`flex items-center px-4 py-2 transition no-underline hover:no-underline hover:text-primary ${
                                  m.className ||
                                  (m.current ? 'text-primary font-semibold' : 'text-gray-800 hover:bg-primary/10')
                                }`}
                              >
                                {m.icon}
                                {m.name}
                              </a>
                            ) : (
                              <Link
                                href={m.href}
                                onClick={() => setMemberOpen(false)}
                                className={`block px-4 py-2 transition no-underline hover:no-underline hover:text-primary ${
                                  m.current ? 'text-primary font-semibold' : 'text-gray-800 hover:bg-primary/10'
                                }`}
                              >
                                {m.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              }
              return (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-gray-800 no-underline hover:no-underline hover:text-primary focus:text-primary active:text-primary/80 transition text-base lg:text-lg"
                  >
                    {l.name}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* 桌面版「線上奉獻」 */}
          <Link
            href="/donate"
            className="ml-12 px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium hover:opacity-90 shadow-lg transition no-underline hover:no-underline"
          >
            線上奉獻
          </Link>
        </div>
      </div>

      {/* 手機版全螢幕選單 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9999] bg-white flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="no-underline hover:no-underline">
              <img src="/images/logo-horizontal.png" alt="南科福氣教會" className="h-10 w-auto" />
            </Link>
            <button onClick={() => setMobileMenuOpen(false)} aria-label="關閉選單">
              <XIcon className="text-primary" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 text-xl font-semibold hover:bg-gray-100 rounded-lg no-underline hover:no-underline"
            >
              首頁
            </Link>

            {[
              { title: '關於我們', open: aboutOpen, setOpen: setAboutOpen, list: aboutLinks },
              { title: '課程資訊', open: coursesOpen, setOpen: setCoursesOpen, list: coursesLinks },
              { title: '影音平台', open: videoOpen, setOpen: setVideoOpen, list: videoLinks },
              { title: '會友專區', open: memberOpen, setOpen: setMemberOpen, list: memberLinks },
            ].map(block => (
              <div key={block.title}>
                <div
                  className="flex justify-between items-center px-4 py-3 text-xl font-semibold hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => block.setOpen(v => !v)}
                >
                  {block.title}
                  <ChevronDownIcon className={`transition ${block.open ? 'rotate-180' : ''}`} />
                </div>
                {block.open && (
                  <div className="pl-6 space-y-2">
                    {block.list.map((l: any) =>
                      l.onClick ? (
                        <a
                          key={l.name}
                          href={l.href}
                          onClick={e => {
                            e.preventDefault()
                            l.onClick?.(e)
                            setMobileMenuOpen(false)
                          }}
                          className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg no-underline hover:no-underline"
                        >
                          {l.icon}
                          {l.name}
                        </a>
                      ) : (
                        <Link
                          key={l.name}
                          href={l.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100 rounded-lg no-underline hover:no-underline"
                        >
                          {l.name}
                        </Link>
                      ),
                    )}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center px-4 py-3 text-xl font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg no-underline hover:no-underline"
            >
              線上奉獻
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
