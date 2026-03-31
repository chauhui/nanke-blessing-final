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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie_consent')
      setShowCookieBanner(consent !== 'true')
    }
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

          {/* 事工預覽 (米灰底) */}
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

          {/* 行事曆 (白底) */}
          <section className="bg-white border-b border-[#D4C5B5]">
            <div className="container mx-auto px-4 py-8 md:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
                
                {/* 左側：經文圖片區塊 */}
                <div className="flex flex-col">
                  <header className="mb-6 md:mb-8">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                       <div className="h-[1px] w-8 bg-[#1E1B4B]"></div>
                       <span className="text-xs font-bold tracking-[0.2em] text-[#64748B] uppercase">Calendar</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B4B]">教會行事曆</h2>
                  </header>

                  {/* 📱💻 關鍵修復區塊：雙重指令，分離手機與電腦版的呈現邏輯 */}
                  <div className="relative rounded-sm border border-[#D4C5B5] shadow-sm overflow-hidden flex-1 min-h-[200px] lg:min-h-0 bg-[#F7F5F2] flex flex-col justify-center">
                    {monthlyPlan && monthlyPlan.imageUrl ? (
                      <img 
                        src={monthlyPlan.imageUrl} 
                        alt="教會節期與重點經文"
                        // 雙重指令在此：
                        // 手機版：w-full h-auto (保持原比例不裁切，文字絕對清楚)
                        // 電腦版 (lg:)：absolute inset-0 h-full object-cover (填滿框框，對齊右側行事曆)
                        className="block w-full h-auto lg:absolute lg:inset-0 lg:h-full lg:object-cover"
                      />
                    ) : (
                      <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center text-[#64748B]">
                        <svg className="w-12 h-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        等待上傳圖片...
                      </div>
                    )}
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