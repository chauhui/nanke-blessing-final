// pages/index.tsx
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import HeroCarousel from '@/components/HeroCarousel'
import MinistriesPreview from '@/components/MinistriesPreview'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'
import type { GetServerSideProps } from 'next'
import { sanityClient } from '@/lib/sanity'
import { testimoniesQuery, type Testimony } from '@/lib/queries'
import Link from 'next/link'

type MonthlyPlan = { 
  title: string; 
  imageUrl: string | null; 
  description: string | null;
} | null

type HomeProps = {
  monthlyPlan: MonthlyPlan
  testimonies?: Testimony[]
}

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '')
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2]
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]
    }
    return null
  } catch {
    return null
  }
}

export default function Home({ monthlyPlan, testimonies = [] }: HomeProps) {
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  
  // ⏳ 倒數計時器的狀態
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isServiceTime, setIsServiceTime] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie_consent')
      setShowCookieBanner(consent !== 'true')
    }
  }, [])

  // ⏳ 全自動計算「下一個主日」的邏輯
  useEffect(() => {
    setMounted(true)
    
    const calculateNextSunday = () => {
      const now = new Date()
      const nextSunday = new Date()
      
      let daysUntilSunday = 7 - now.getDay()
      
      if (now.getDay() === 0 && now.getHours() >= 12) {
        daysUntilSunday = 7
      } else if (now.getDay() === 0) {
        daysUntilSunday = 0
      }
      
      nextSunday.setDate(now.getDate() + daysUntilSunday)
      nextSunday.setHours(10, 0, 0, 0) 
      return nextSunday.getTime()
    }

    const timer = setInterval(() => {
      const targetDate = calculateNextSunday()
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0 && distance > -7200000) { 
        setIsServiceTime(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        setIsServiceTime(false)
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true')
    setShowCookieBanner(false)
  }

  const title = '南科福氣教會'
  const desc = '南科福氣教會｜位於台南南科園區，為忙碌的科技人與家庭預備溫暖的信仰與陪伴。'
  const url = 'https://nanke-blessing.vercel.app'
  const image = 'https://nanke-blessing.vercel.app/images/og-image-1.jpg'
  
  const googleCalendarUrl = "https://calendar.google.com/calendar/embed?src=info.nkbbc%40gmail.com&src=zh.taiwan%23holiday%40group.v.calendar.google.com&ctz=Asia%2FTaipei&wkst=1&mode=AGENDA&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0"

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image} />
      </Head>

      <style jsx global>{`
        .ministry-palette a { color: #1E1B4B !important; font-weight: 600; }
        .ministry-palette a:hover { color: #B45309 !important; text-decoration: underline; }
      `}</style>

      <div className="relative bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
        <NavBar />

        {showCookieBanner && (
          <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[92%] md:w-auto md:min-w-[720px] rounded-sm border border-[#D4C5B5] bg-[#F7F5F2]/95 backdrop-blur px-6 py-4 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-[13px] md:text-[14px] text-[#475569]">
                本網站使用 cookie 儲存登入狀態。請點選「同意」以確保功能正常。
              </p>
              <button
                className="px-6 py-2 rounded-sm bg-[#1E1B4B] hover:bg-[#312E81] text-white text-sm font-bold tracking-wide transition"
                onClick={handleAcceptCookies}
              >
                同意
              </button>
            </div>
          </div>
        )}

        <main className="relative">
          {/* Hero */}
          <div className="pt-20 lg:pt-24 border-b border-[#D4C5B5] bg-white">
            <HeroCarousel />
          </div>

          {/* 事工預覽 */}
          <section className="bg-[#F7F5F2] border-b border-[#D4C5B5]">
            <div className="container mx-auto px-4 py-8 md:py-16">
              <header className="mb-6 md:mb-10 text-left">
                <div className="flex items-center gap-3 mb-2 md:mb-3">
                   <div className="h-[1px] w-8 bg-[#B45309]"></div>
                   <span className="text-xs font-bold tracking-[0.2em] text-[#B45309] uppercase">Ministries</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B4B]">聚會與事工</h2>
                <p className="mt-2 md:mt-4 text-sm md:text-base text-[#475569] max-w-2xl leading-relaxed">
                  認識我們固定聚會與主要事工，快速連結到你關心的內容。
                </p>
              </header>
              <div className="ministry-palette">
                <MinistriesPreview />
              </div>
            </div>
          </section>

          {/* 行事曆與動態倒數 (白底) */}
          <section className="bg-white border-b border-[#D4C5B5]">
            <div className="container mx-auto px-4 py-8 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
                
                {/* ⏳ 左側：全自動主日倒數計時器 */}
                <div className="flex flex-col">
                  <header className="mb-6 md:mb-8">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                       <div className="h-[1px] w-8 bg-[#1E1B4B]"></div>
                       <span className="text-xs font-bold tracking-[0.2em] text-[#64748B] uppercase">Calendar</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B4B]">教會行事曆</h2>
                  </header>

                  {/* 倒數計時卡片 (質感升級版：純白底卡片 + 燕麥色立體數字方塊) */}
                  <div className="relative rounded-sm border border-[#D4C5B5] bg-white shadow-sm flex-1 min-h-[400px] lg:min-h-0 flex flex-col justify-center items-center p-6 lg:p-12 text-center overflow-hidden">
                    
                    {/* 微妙的背景裝飾圓，增加畫面豐富度但不破壞極簡 */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F7F5F2] rounded-full opacity-50 pointer-events-none"></div>
                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-[#F7F5F2] rounded-full opacity-50 pointer-events-none"></div>

                    <div className="relative z-10 w-full max-w-sm mx-auto">
                      {mounted ? (
                        isServiceTime ? (
                          // 聚會正在進行中的畫面
                          <div className="animate-fade-in flex flex-col items-center bg-[#F7F5F2] p-8 rounded-lg border border-[#E5E5E5]">
                            <div className="w-3 h-3 bg-[#B45309] rounded-full animate-ping mb-4"></div>
                            <span className="text-xs font-bold tracking-[0.3em] text-[#B45309] uppercase mb-2">Live Now</span>
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1E1B4B] mb-3 tracking-wide">
                              主日崇拜進行中
                            </h3>
                            <p className="text-[#475569] mb-6 text-sm font-light">願神賜福您今天的信息與敬拜</p>
                            <a href="#" className="inline-block bg-[#1E1B4B] text-white hover:bg-[#312E81] px-6 py-2.5 rounded-sm text-sm font-bold tracking-widest transition-colors shadow-sm">
                              進入線上聚會
                            </a>
                          </div>
                        ) : (
                          // 倒數計時畫面
                          <div className="flex flex-col items-center w-full">
                            <span className="text-xs font-bold tracking-[0.3em] text-[#64748B] uppercase mb-6 md:mb-8">
                              Countdown
                            </span>
                            
                            {/* 改用 Grid 方塊排版，結構更穩定、更好看 */}
                            <div className="grid grid-cols-4 gap-2 md:gap-4 w-full mb-8 md:mb-10">
                              {/* 天 */}
                              <div className="flex flex-col items-center justify-center py-4 bg-[#F7F5F2] rounded-md border border-[#EAEAEA] shadow-sm">
                                <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1E1B4B]">{String(timeLeft.days).padStart(2, '0')}</span>
                                <span className="text-[9px] md:text-[10px] text-[#64748B] font-bold tracking-widest mt-2">DAYS</span>
                              </div>
                              
                              {/* 時 */}
                              <div className="flex flex-col items-center justify-center py-4 bg-[#F7F5F2] rounded-md border border-[#EAEAEA] shadow-sm">
                                <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1E1B4B]">{String(timeLeft.hours).padStart(2, '0')}</span>
                                <span className="text-[9px] md:text-[10px] text-[#64748B] font-bold tracking-widest mt-2">HRS</span>
                              </div>

                              {/* 分 */}
                              <div className="flex flex-col items-center justify-center py-4 bg-[#F7F5F2] rounded-md border border-[#EAEAEA] shadow-sm">
                                <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1E1B4B]">{String(timeLeft.minutes).padStart(2, '0')}</span>
                                <span className="text-[9px] md:text-[10px] text-[#64748B] font-bold tracking-widest mt-2">MINS</span>
                              </div>

                              {/* 秒 */}
                              <div className="flex flex-col items-center justify-center py-4 bg-[#F7F5F2] rounded-md border border-[#EAEAEA] shadow-sm">
                                <span className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#B45309]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                                <span className="text-[9px] md:text-[10px] text-[#64748B] font-bold tracking-widest mt-2">SECS</span>
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#F7F5F2] rounded-full border border-[#EAEAEA]">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#B45309]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm md:text-base font-bold text-[#1E1B4B] tracking-wide">每週日 10:00 AM</span>
                            </div>
                            <p className="text-[#475569] text-sm font-light tracking-wide mt-4">
                              預備心，與我們一同敬拜
                            </p>
                          </div>
                        )
                      ) : (
                        // Loading 骨架
                        <div className="animate-pulse flex space-x-4 justify-center items-center h-full">
                          <div className="w-16 h-24 bg-[#F7F5F2] rounded-md border border-[#EAEAEA]"></div>
                          <div className="w-16 h-24 bg-[#F7F5F2] rounded-md border border-[#EAEAEA]"></div>
                          <div className="w-16 h-24 bg-[#F7F5F2] rounded-md border border-[#EAEAEA]"></div>
                          <div className="w-16 h-24 bg-[#F7F5F2] rounded-md border border-[#EAEAEA]"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* 右側：行事曆區塊 */}
                <div className="flex flex-col h-full pt-0 lg:pt-[99px] relative min-h-[500px]">
                  <div className="relative rounded-sm border border-[#D4C5B5] bg-white shadow-sm overflow-hidden flex-1 h-full">
                    <iframe
                      src={googleCalendarUrl}
                      style={{ border: 0 }}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="yes"
                      title="教會行事曆"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <div className="mt-3 text-right lg:absolute lg:-bottom-8 lg:right-0 lg:w-full lg:mt-0">
                    <a 
                      href={googleCalendarUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#64748B] hover:text-[#B45309] transition-colors"
                    >
                      <span className="underline underline-offset-2">無法正常顯示行事曆？點此直接開啟 Google 日曆</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 生命見證 */}
          <section className="bg-[#F7F5F2]">
            <div className="container mx-auto px-4 py-8 md:py-16">
              <header className="mb-6 md:mb-10 text-left">
                <div className="flex items-center gap-3 mb-2 md:mb-3">
                   <div className="h-[1px] w-8 bg-[#1E1B4B]"></div>
                   <span className="text-xs font-bold tracking-[0.2em] text-[#64748B] uppercase">Testimonies</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B4B]">生命見證</h2>
                <p className="mt-2 md:mt-4 text-sm md:text-base text-[#475569] max-w-2xl leading-relaxed">
                  聽聽弟兄姊妹分享他們的生命故事，見證神的真實。
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {(testimonies ?? []).map((t) => {
                  const vid = extractYouTubeId(t.youtubeUrl)
                  const embedSrc = vid ? `https://www.youtube.com/embed/${vid}` : t.youtubeUrl
                  return (
                    <article
                      key={t._id}
                      className="group rounded-sm bg-white border border-[#D4C5B5] p-6 hover:shadow-xl hover:shadow-[#1E1B4B]/5 transition-all duration-300"
                    >
                      <header className="mb-4 flex items-center gap-3">
                        {t.tag ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-sm bg-[#1E1B4B] text-white text-xs font-bold tracking-wider uppercase">
                            {t.tag}
                          </span>
                        ) : null}
                        <h3 className="text-lg font-bold text-[#1E1B4B] line-clamp-1">
                          {t.title}
                        </h3>
                      </header>

                      <div className="rounded-sm overflow-hidden bg-gray-100 mb-5 relative aspect-video">
                        <iframe
                          src={embedSrc}
                          title={t.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        />
                      </div>

                      {t.description ? (
                        <p className="text-[#475569] leading-relaxed text-sm line-clamp-3">
                          {t.description}
                        </p>
                      ) : null}
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const monthlyPlanQuery = `
    *[_type == "monthlyPlan" && isActive == true] | order(_createdAt desc)[0] {
      title,
      "imageUrl": poster.asset->url,
      description
    }
  `

  try {
    const [monthlyPlan, testimonies] = await Promise.all([
      sanityClient.fetch<MonthlyPlan>(monthlyPlanQuery),
      sanityClient.fetch<Testimony[]>(testimoniesQuery),
    ])

    return {
      props: {
        monthlyPlan: monthlyPlan ?? null,
        testimonies: testimonies ?? [],
      },
    }
  } catch (e) {
    console.error('[SSR fetch error]:', e)
    return { props: { monthlyPlan: null, testimonies: [] } }
  }
}