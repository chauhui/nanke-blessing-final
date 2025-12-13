// components/NavBar.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

// --- 圖示元件 (保持不變) ---
function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M6 9l6 6 6-6" /></svg> }
function MenuIcon(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M3 12h18M3 6h18M3 18h18" /></svg> }
function XIcon(props: React.SVGProps<SVGSVGElement>) { return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" {...props}><path d="M18 6L6 18M6 6l12 12" /></svg> }
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

  // ✅ JAPANDI 風格設定
  // 1. 字體：font-medium (不過粗，優雅), tracking-widest (增加空氣感)
  // 2. 顏色：text-[#1E1B4B] (深靛藍，像墨水一樣的質感)
  // 3. 互動：hover 時變成琥珀金 (#B45309)
  const linkBaseClass = "relative flex items-center gap-1 text-[15px] font-medium tracking-wide text-[#1E1B4B] transition-colors duration-300 hover:text-[#B45309] py-2 px-1 !no-underline group"
  
  // 下劃線動畫：使用琥珀金
  const underlineAnimation = <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#B45309] transition-all duration-300 ease-out group-hover:w-full"></span>
  
  // 下拉選單：純白背景 + 暖灰邊框 + 輕柔陰影
  const dropdownClass = "absolute left-0 top-full pt-4 w-60 transition-all duration-300 z-50"
  const dropdownInnerClass = "bg-white border border-[#D4C5B5] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] py-3 rounded-sm"

  return (
    <>
      {/* ✅ 導覽列容器設計：
         1. bg-white (純白)：與頁面的米灰底色 (#F7F5F2) 形成明確區隔，不再糊在一起。
         2. border-b border-[#D4C5B5] (暖沙色邊框)：呼應 Japandi 的大地色系，畫出一條精緻的界線。
         3. h-20 / h-24：保持原本的高度大氣感。
      */}
      <nav className="fixed w-full z-50 transition-all duration-300 h-20 lg:h-24 flex items-center bg-white border-b border-[#D4C5B5] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)]">
        <div className="container mx-auto flex items-center justify-between px-6 lg:px-12 h-full">
          
          <Link href="/" className="flex items-center no-underline hover:opacity-80 transition-opacity h-full py-2">
            <img src="/images/logo-horizontal.png" alt="南科福氣教會" className="h-10 lg:h-12 w-auto object-contain" />
          </Link>

          <button className="lg:hidden p-2 text-[#1E1B4B] hover:bg-[#F7F5F2] rounded-sm transition-colors" onClick={() => setMobileMenuOpen(true)} aria-label="開啟選單">
            <MenuIcon />
          </button>

          <div className="hidden lg:flex items-center gap-10 h-full">
            <ul className="flex items-center gap-8 h-full">
              {links.map(l => {
                if (l.isAbout) return (<li key="about" className="relative h-full flex items-center" onMouseEnter={() => openMenu(setAboutOpen, aboutTimer)} onMouseLeave={() => scheduleClose(setAboutOpen, aboutTimer)}><button className={linkBaseClass} onClick={() => setAboutOpen(o => !o)}>關於我們 <ChevronDownIcon className={`ml-1 transition-transform duration-300 text-[#94A3B8] group-hover:text-[#B45309] ${aboutOpen ? 'rotate-180' : ''}`} />{underlineAnimation}</button><div className={`${dropdownClass} ${aboutOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}><ul className={dropdownInnerClass}>{aboutLinks.map(a => (<li key={a.name}><Link href={a.href} onClick={() => setAboutOpen(false)} className="block px-6 py-2.5 text-sm text-[#475569] hover:bg-[#F7F5F2] hover:text-[#B45309] transition-colors">{a.name}</Link></li>))}</ul></div></li>)
                if (l.isCourses) return (<li key="courses" className="relative h-full flex items-center" onMouseEnter={() => openMenu(setCoursesOpen, coursesTimer)} onMouseLeave={() => scheduleClose(setCoursesOpen, coursesTimer)}><button className={linkBaseClass} onClick={() => setCoursesOpen(o => !o)}>課程資訊 <ChevronDownIcon className={`ml-1 transition-transform duration-300 text-[#94A3B8] group-hover:text-[#B45309] ${coursesOpen ? 'rotate-180' : ''}`} />{underlineAnimation}</button><div className={`${dropdownClass} ${coursesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}><ul className={dropdownInnerClass}>{coursesLinks.map(c => (<li key={c.name}><Link href={c.href} onClick={() => setCoursesOpen(false)} className="block px-6 py-2.5 text-sm text-[#475569] hover:bg-[#F7F5F2] hover:text-[#B45309] transition-colors">{c.name}</Link></li>))}</ul></div></li>)
                if (l.isVideo) return (<li key="video" className="relative h-full flex items-center" onMouseEnter={() => openMenu(setVideoOpen, videoTimer)} onMouseLeave={() => scheduleClose(setVideoOpen, videoTimer)}><button className={linkBaseClass} onClick={() => setVideoOpen(o => !o)}>影音平台 <ChevronDownIcon className={`ml-1 transition-transform duration-300 text-[#94A3B8] group-hover:text-[#B45309] ${videoOpen ? 'rotate-180' : ''}`} />{underlineAnimation}</button><div className={`${dropdownClass} ${videoOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}><ul className={dropdownInnerClass}>{videoLinks.map(v => (<li key={v.name}><Link href={v.href} onClick={() => setVideoOpen(false)} className="block px-6 py-2.5 text-sm text-[#475569] hover:bg-[#F7F5F2] hover:text-[#B45309] transition-colors">{v.name}</Link></li>))}</ul></div></li>)
                if (l.isMember) return (<li key="member" className="relative h-full flex items-center" onMouseEnter={() => openMenu(setMemberOpen, memberTimer)} onMouseLeave={() => scheduleClose(setMemberOpen, memberTimer)}><button className={linkBaseClass} onClick={() => setMemberOpen(o => !o)}>會友專區 <ChevronDownIcon className={`ml-1 transition-transform duration-300 text-[#94A3B8] group-hover:text-[#B45309] ${memberOpen ? 'rotate-180' : ''}`} />{underlineAnimation}</button><div className={`${dropdownClass} ${memberOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}><ul className={dropdownInnerClass}>{memberLinks.map(m => (<li key={m.name}>{m.onClick ? (<a href={m.href} onClick={e => { e.preventDefault(); m.onClick?.(e); setMemberOpen(false); }} className={`flex items-center px-6 py-2.5 text-sm text-[#475569] hover:bg-[#F7F5F2] hover:text-[#B45309] transition-colors ${m.className || ''}`}>{m.icon}{m.name}</a>) : (<Link href={m.href} onClick={() => setMemberOpen(false)} className={`block px-6 py-2.5 text-sm text-[#475569] hover:bg-[#F7F5F2] hover:text-[#B45309] transition-colors ${m.current ? 'text-[#1E1B4B] font-bold bg-[#F7F5F2]' : ''}`}>{m.name}</Link>)}</li>))}</ul></div></li>)
                return <li key={l.name} className="h-full flex items-center"><Link href={l.href} className={linkBaseClass} style={{ textDecoration: 'none' }}>{l.name}{underlineAnimation}</Link></li>
              })}
            </ul>
            <Link href="/donate" className="ml-4 px-8 py-3 bg-[#1E1B4B] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#B45309] hover:shadow-lg transition-all duration-300 rounded-sm shadow-md no-underline">
              GIVING
            </Link>
          </div>
        </div>
      </nav>

      {/* 手機版選單：保持純白背景與暖灰邊線 */}
      <div className={`fixed inset-0 z-[99999] bg-white flex flex-col transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between px-6 border-b border-[#D4C5B5] h-20 shrink-0 bg-white">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <img src="/images/logo-horizontal.png" alt="南科福氣教會" className="h-10 w-auto" />
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#1E1B4B] hover:bg-[#F7F5F2] rounded-sm transition-colors" aria-label="關閉選單">
            <XIcon />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-white">
          <div className="px-6 py-6 space-y-2">
            
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-[#1E1B4B] py-3 border-b border-[#F1F5F9]">首頁</Link>
            
            {/* Mobile Dropdowns */}
            <div className="border-b border-[#F1F5F9]">
              <div className="flex justify-between items-center text-lg font-bold text-[#1E1B4B] py-3 cursor-pointer" onClick={() => setAboutOpen(!aboutOpen)}>
                關於我們
                <ChevronDownIcon className={`transition-transform duration-300 text-[#94A3B8] ${aboutOpen ? 'rotate-180 text-[#B45309]' : ''}`} />
              </div>
              <div className={`${aboutOpen ? 'block' : 'hidden'} pb-3 pl-4 space-y-1 border-l-2 border-[#D4C5B5] ml-1`}>
                {aboutLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm text-[#475569] font-medium hover:text-[#B45309]">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-[#F1F5F9]">
              <div className="flex justify-between items-center text-lg font-bold text-[#1E1B4B] py-3 cursor-pointer" onClick={() => setCoursesOpen(!coursesOpen)}>
                課程資訊
                <ChevronDownIcon className={`transition-transform duration-300 text-[#94A3B8] ${coursesOpen ? 'rotate-180 text-[#B45309]' : ''}`} />
              </div>
              <div className={`${coursesOpen ? 'block' : 'hidden'} pb-3 pl-4 space-y-1 border-l-2 border-[#D4C5B5] ml-1`}>
                {coursesLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm text-[#475569] font-medium hover:text-[#B45309]">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-b border-[#F1F5F9]">
              <div className="flex justify-between items-center text-lg font-bold text-[#1E1B4B] py-3 cursor-pointer" onClick={() => setVideoOpen(!videoOpen)}>
                影音平台
                <ChevronDownIcon className={`transition-transform duration-300 text-[#94A3B8] ${videoOpen ? 'rotate-180 text-[#B45309]' : ''}`} />
              </div>
              <div className={`${videoOpen ? 'block' : 'hidden'} pb-3 pl-4 space-y-1 border-l-2 border-[#D4C5B5] ml-1`}>
                {videoLinks.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm text-[#475569] font-medium hover:text-[#B45309]">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link href="/event-registration" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-[#1E1B4B] border-b border-[#F1F5F9] py-3">活動報名</Link>
            <Link href="/meal" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-[#1E1B4B] border-b border-[#F1F5F9] py-3">愛宴系統</Link>
            
            <div className="border-b border-[#F1F5F9]">
              <div className="flex justify-between items-center text-lg font-bold text-[#1E1B4B] py-3 cursor-pointer" onClick={() => setMemberOpen(!memberOpen)}>
                會友專區
                <ChevronDownIcon className={`transition-transform duration-300 text-[#94A3B8] ${memberOpen ? 'rotate-180 text-[#B45309]' : ''}`} />
              </div>
              <div className={`${memberOpen ? 'block' : 'hidden'} pb-3 pl-4 space-y-1 border-l-2 border-[#D4C5B5] ml-1`}>
                {memberLinks.map(link => (
                   <div key={link.name}>
                     {link.onClick ? (
                       <a href="#" onClick={(e) => { e.preventDefault(); link.onClick?.(e as any); setMobileMenuOpen(false); }} className="flex items-center py-2 px-3 text-sm font-medium text-[#475569] hover:text-[#B45309]">
                         {link.icon} {link.name}
                       </a>
                     ) : (
                       <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="block py-2 px-3 text-sm text-[#475569] font-medium hover:text-[#B45309]">
                         {link.name}
                       </Link>
                     )}
                   </div>
                ))}
              </div>
            </div>

            <div className="pt-8 pb-12">
              <Link href="/donate" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-6 py-4 bg-[#1E1B4B] text-white text-base font-bold tracking-[0.2em] uppercase rounded-sm shadow-lg hover:bg-[#B45309] transition-colors">
                線上奉獻
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}