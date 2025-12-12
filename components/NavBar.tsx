// components/NavBar.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

// --- 圖示元件 ---
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}><path d="M6 9l6 6 6-6" /></svg> }
function MenuIcon(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M3 12h18M3 6h18M3 18h18" /></svg> }
function XIcon(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M18 6L6 18M6 6l12 12" /></svg> }
function LogoutIcon(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg> }

export default function NavBar() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [coursesOpen, setCoursesOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [memberOpen, setMemberOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { data: session } = useSession()
  const pathname = usePathname()

  const aboutTimer = useRef<number | null>(null)
  const coursesTimer = useRef<number | null>(null)
  const videoTimer = useRef<number | null>(null)
  const memberTimer = useRef<number | null>(null)

  const openMenu = (setter: (v: boolean) => void, timerRef: React.MutableRefObject<number | null>) => { if (timerRef.current) window.clearTimeout(timerRef.current); setter(true) }
  const scheduleClose = (setter: (v: boolean) => void, timerRef: React.MutableRefObject<number | null>) => { timerRef.current = window.setTimeout(() => setter(false), 150) }
  
  useEffect(() => { const onScroll = () => (typeof window !== 'undefined'); window.addEventListener('scroll', onScroll as any); return () => window.removeEventListener('scroll', onScroll as any) }, [])
  useEffect(() => { document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto'; return () => { document.body.style.overflow = 'auto' } }, [mobileMenuOpen])
  useEffect(() => { setMobileMenuOpen(false) }, [pathname])

  const aboutLinks = [{ name: '異象與使命', href: '/about/vision-mission' }, { name: '實行之路', href: '/about/implementation' }, { name: '教會策略', href: '/about/strategy' }, { name: '教會核心價值', href: '/about/core-values' }, { name: '各種成全聚會', href: '/about/gatherings' }]
  const coursesLinks = [{ name: '如何教養青少年', href: '/courses/teen-parenting' }, { name: '如何教養孩童', href: '/courses/child-parenting' }, { name: '親密之旅', href: '/courses/intimacy-journey' }, { name: '理財有道', href: '/courses/financial-wisdom' }, { name: '兒童品格班', href: '/courses/children-character' }]
  const videoLinks = [{ name: '教會簡介', href: '/video/church-intro' }, { name: '幸福小組花絮', href: '/video/happy-group' }]
  const memberLinks = [{ name: '小組長回報系統', href: '/member/group-report', current: pathname === '/member/group-report' }, { name: '登出', href: '#', onClick: async (e: React.MouseEvent) => { e.preventDefault(); await signOut({ callbackUrl: '/' }) }, className: 'text-red-600 hover:bg-red-50', icon: <LogoutIcon className="w-4 h-4 mr-2 inline" /> }]
  
  const links = [
    { name: '首頁', href: '/' },
    { name: '關於我們', href: '/about', isAbout: true },
    { name: '課程資訊', href: '/courses', isCourses: true },
    { name: '影音平台', href: '/video', isVideo: true },
    { name: '活動報名', href: '/event-registration' }, 
    { name: '愛宴系統', href: '/meal' },
    { name: '會友專區', href: '/member', isMember: true },
  ]

  const linkBaseClass = "relative flex items-center gap-1 text-[15px] font-bold tracking-wide text-slate-700 transition-colors duration-300 hover:text-[#B45309] py-2 px-1 !no-underline group"
  const underlineAnimation = <span className="absolute left-0 bottom-0 w-0 h-[2.5px] bg-[#B45309] transition-all duration-300 ease-out group-hover:w-full rounded-full"></span>
  const dropdownClass = "absolute left-0 top-full pt-2 w-56 transition-all duration-200 z-50"
  const dropdownInnerClass = "bg-white border border-gray-100 shadow-xl shadow-slate-200/50 py-2 rounded-lg ring-1 ring-black/5 overflow-hidden"

  return (
    <>
      {/* ✅ 修正重點：毛玻璃質感設定 (Glassmorphism)
         1. bg-white/80: 透明度 80%，讓背景可以透出來
         2. backdrop-blur-md: 加入模糊濾鏡，消除「貼上去」的死板感
         3. border-white/50: 邊框也改半透明
         4. shadow-sm: 用輕柔陰影取代硬邊框
      */}
      <nav className="fixed w-full z-50 transition-all duration-300 h-20 lg:h-24 flex items-center bg-white/80 backdrop-blur-md shadow-sm border-b border-white/50">
        <div className="container mx-auto flex items-center justify-between px-6 lg:px-12 h-full">
          
          <Link href="/" className="flex items-center no-underline hover:opacity-90 transition-opacity h-full py-2">
            <img src="/images/logo-horizontal.png" alt="南科福氣教會" className="h-10 lg:h-12 w-auto object-contain" />
          </Link>

          <button className="lg:hidden p-2 text-[#1E1B4B] hover:bg-black/5 rounded-md transition-colors" onClick={() => setMobileMenuOpen(true)} aria-label="開啟選單">
            <MenuIcon />
          </button>

          <div className="hidden lg:flex items-center gap-8 h-full">
            <ul className="flex items-center gap-6 h-full">
              {links.map(l => {
                if (l.isAbout) return (<li key="about" className="relative h-full flex items-center" onMouseEnter={() => openMenu(setAboutOpen, aboutTimer)} onMouseLeave={() => scheduleClose(setAboutOpen, aboutTimer)}><button className={linkBaseClass} onClick={() => setAboutOpen(o => !o)}>關於我們 <ChevronDownIcon className={`transition-transform duration-300 text-slate-400 group-hover:text-[#B45309] ${aboutOpen ? 'rotate-180' : ''}`} />{underlineAnimation}</button><div className={`${dropdownClass} ${aboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}><ul className={dropdownInnerClass}>{aboutLinks.map(a => (<li key={a.name}><Link href={a.href} onClick={() => setAboutOpen(false)} className="block px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#B45309] transition-colors">{a.name}</Link></li>))}</ul></div></li>)
                if (l.isCourses) return (<li key="courses" className="relative h-full flex items-center" onMouseEnter={() => openMenu(setCoursesOpen, coursesTimer)} onMouseLeave={() => scheduleClose(setCoursesOpen, coursesTimer)}><button className={linkBaseClass} onClick={() => setCoursesOpen(o => !o)}>課程資訊 <ChevronDownIcon className={`transition-transform duration-300 text-slate-400 group-hover:text-[#B45309] ${coursesOpen ? 'rotate-180' : ''}`} />{underlineAnimation}</button><div className={`${dropdownClass} ${coursesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}><ul className={dropdownInnerClass}>{coursesLinks.map(c => (<li key={c.name}><Link href={c.href} onClick={() => setCoursesOpen(false)} className="block px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#B45309] transition-colors">{c.name}</Link></li>))}</ul></div></li>)
                if (l.isVideo) return (<li key="video" className="relative h-full flex items-center" onMouseEnter={() => openMenu(setVideoOpen, videoTimer)} onMouseLeave={() => scheduleClose(setVideoOpen, videoTimer)}><button className={linkBaseClass} onClick={() => setVideoOpen(o => !o)}>影音平台 <ChevronDownIcon className={`transition-transform duration-300 text-slate-400 group-hover:text-[#B45309] ${videoOpen ? 'rotate-180' : ''}`} />{underlineAnimation}</button><div className={`${dropdownClass} ${videoOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}><ul className={dropdownInnerClass}>{videoLinks.map(v => (<li key={v.name}><Link href={v.href} onClick={() => setVideoOpen(false)} className="block px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[#B45309] transition-colors">{v.name}</Link></li>))}</ul></div></li>)
                if (l.isMember) return (<li key="member" className="relative h-full flex items-center" onMouseEnter={() => openMenu(setMemberOpen, memberTimer)} onMouseLeave={() => scheduleClose(setMemberOpen, memberTimer)}><button className={linkBaseClass} onClick={() => setMemberOpen(o => !o)}>會友專區 <ChevronDownIcon className={`transition-transform duration-300 text-slate-400 group-hover:text-[#B45309] ${memberOpen ? 'rotate-180' : ''}`} />{underlineAnimation}</button><div className={`${dropdownClass} ${memberOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}><ul className={dropdownInnerClass}>{memberLinks.map(m => (<li key={m.name}>{m.onClick ? (<a href={m.href} onClick={e => { e.preventDefault(); m.onClick?.(e); setMemberOpen(false); }} className={`flex items-center px-5 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors ${m.className || 'text-slate-600'}`}>{m.icon}{m.name}</a>) : (<Link href={m.href} onClick={() => setMemberOpen(false)} className={`block px-5 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors ${m.current ? 'text-[#1E1B4B] font-bold bg-slate-50' : 'text-slate-600'}`}>{m.name}</Link>)}</li>))}</ul></div></li>)
                return <li key={l.name} className="h-full flex items-center"><Link href={l.href} className={linkBaseClass} style={{ textDecoration: 'none' }}>{l.name}{underlineAnimation}</Link></li>
              })}
            </ul>
            <Link href="/donate" className="ml-2 px-6 py-2.5 bg-[#1E1B4B] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#2E2A6B] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded shadow-md shadow-blue-900/20 no-underline">GIVING</Link>
          </div>
        </div>
      </nav>

      {/* 手機版選單 (維持不變) */}
      <div className={`fixed inset-0 z-[99999] bg-white flex flex-col transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between px-6 border-b border-gray-100 h-20 shrink-0 bg-white">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <img src="/images/logo-horizontal.png" alt="南科福氣教會" className="h-10 w-auto" />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#1E1B4B] bg-gray-50 rounded-full" aria-label="關閉選單">
            <XIcon />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="px-6 py-4">
            
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-xl font-bold text-[#1E1B4B] py-4 border-b border-gray-100">首頁</Link>
            
            <div className="border-b border-gray-100">
              <div className="flex justify-between items-center text-lg font-bold text-[#1E1B4B] py-4 cursor-pointer" onClick={() => setAboutOpen(!aboutOpen)}>
                關於我們
                <ChevronDownIcon className={`transition-transform duration-300 text-gray-400 ${aboutOpen ? 'rotate-180 text-[#B45309]' : ''}`} />
              </div>
              <div className={`${aboutOpen ? 'block' : 'hidden'} pb-4 pl-4 space-y-1 border-l-2 border-gray-100 ml-1`}>
                {aboutLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-base text-gray-600 font-medium hover:text-[#B45309] hover:bg-gray-50 rounded">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-100">
              <div className="flex justify-between items-center text-lg font-bold text-[#1E1B4B] py-4 cursor-pointer" onClick={() => setCoursesOpen(!coursesOpen)}>
                課程資訊
                <ChevronDownIcon className={`transition-transform duration-300 text-gray-400 ${coursesOpen ? 'rotate-180 text-[#B45309]' : ''}`} />
              </div>
              <div className={`${coursesOpen ? 'block' : 'hidden'} pb-4 pl-4 space-y-1 border-l-2 border-gray-100 ml-1`}>
                {coursesLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-base text-gray-600 font-medium hover:text-[#B45309] hover:bg-gray-50 rounded">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-gray-100">
              <div className="flex justify-between items-center text-lg font-bold text-[#1E1B4B] py-4 cursor-pointer" onClick={() => setVideoOpen(!videoOpen)}>
                影音平台
                <ChevronDownIcon className={`transition-transform duration-300 text-gray-400 ${videoOpen ? 'rotate-180 text-[#B45309]' : ''}`} />
              </div>
              <div className={`${videoOpen ? 'block' : 'hidden'} pb-4 pl-4 space-y-1 border-l-2 border-gray-100 ml-1`}>
                {videoLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-base text-gray-600 font-medium hover:text-[#B45309] hover:bg-gray-50 rounded">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link href="/event-registration" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-[#1E1B4B] border-b border-gray-100 py-4">活動報名</Link>
            <Link href="/meal" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-[#1E1B4B] border-b border-gray-100 py-4">愛宴系統</Link>
            
            <div className="border-b border-gray-100">
              <div className="flex justify-between items-center text-lg font-bold text-[#1E1B4B] py-4 cursor-pointer" onClick={() => setMemberOpen(!memberOpen)}>
                會友專區
                <ChevronDownIcon className={`transition-transform duration-300 text-gray-400 ${memberOpen ? 'rotate-180 text-[#B45309]' : ''}`} />
              </div>
              <div className={`${memberOpen ? 'block' : 'hidden'} pb-4 pl-4 space-y-1 border-l-2 border-gray-100 ml-1`}>
                {memberLinks.map(link => (
                   <div key={link.name}>
                     {link.onClick ? (
                       <a href="#" onClick={(e) => { e.preventDefault(); link.onClick?.(e as any); setMobileMenuOpen(false); }} className="flex items-center py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded">
                         {link.icon} {link.name}
                       </a>
                     ) : (
                       <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded">
                         {link.name}
                       </Link>
                     )}
                   </div>
                ))}
              </div>
            </div>

            <div className="pt-8 pb-12">
              <Link href="/donate" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-6 py-4 bg-[#1E1B4B] text-white text-lg font-bold tracking-widest uppercase rounded-md shadow-lg shadow-blue-900/20 active:scale-95 transition-transform">
                線上奉獻
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}