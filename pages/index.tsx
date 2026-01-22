// pages/index.tsx
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import HeroCarousel from '@/components/HeroCarousel'
import MinistriesPreview from '@/components/MinistriesPreview'
import Footer from '@/components/Footer'
import { useEffect, useMemo, useState } from 'react'
import type { GetServerSideProps } from 'next'
import { sanityClient } from '@/lib/sanity'
import { testimoniesQuery, type Testimony } from '@/lib/queries'
import Link from 'next/link'

// 1. 修改 Type 定義，加入 pptUrl (字串或 null)
type Entry = { date: string; title: string; note?: string | null; pptUrl?: string | null }
type MonthlyPlan = { themeTitle: string; entries: Entry[] } | null

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

  // === 本月所有主日 ===
  const now = new Date()
  const year = now.getFullYear()
  const month0 = now.getMonth()
  const sundaysThisMonth = useMemo(() => {
    const first = new Date(year, month0, 1)
    const delta = (7 - first.getDay()) % 7
    const firstSunday = new Date(year, month0, 1 + delta)
    const list: Date[] = []
    for (let d = new Date(firstSunday); d.getMonth() === month0; d.setDate(d.getDate() + 7)) {
      list.push(new Date(d))
    }
    return list
  }, [year, month0])

  const byDate = new Map(
    (monthlyPlan?.entries ?? [])
      .filter(e => e?.date)
      .map(e => [e.date, e])
  )
  const uiEntries: Entry[] = sundaysThisMonth.map(d => {
    const key = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Taipei' })
    return byDate.get(key) ?? { date: key, title: '主題待公布' }
  })

  const weekdayNames = ['週日','週一','週二','週三','週四','週五','週六']
  const fMD = useMemo(
    () => new Intl.DateTimeFormat('zh-TW', { month: 'numeric', day: 'numeric', timeZone: 'Asia/Taipei' }),
    []
  )

  const leftDateBlock = (date: Date) => {
    const day = new Intl.DateTimeFormat('en-US', { day: '2-digit', timeZone: 'Asia/Taipei' })
      .format(date)
      .replace(/[^\d]/g, '')
    const monthNum = new Intl.DateTimeFormat('en-US', { month: 'numeric', timeZone: 'Asia/Taipei' }).format(date)
    const yearNum = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: 'Asia/Taipei' }).format(date)

    return (
      <div
        className="
          w-20 h-[72px] shrink-0 text-center px-1 py-2 rounded-sm
          border border-[#D4C5B5] bg-[#F7F5F2]
          flex flex-col items-center justify-center
        "
      >
        <div className="text-3xl font-serif font-bold leading-none tracking-tight text-[#1E1B4B]">{day}</div>
        <div className="mt-1 text-[11px] leading-none text-[#64748B] font-medium">{monthNum}月, {yearNum}</div>
      </div>
    )
  }

  const title = '南科福氣教會'
  const desc = '南科福氣教會｜位於台南南科園區，為忙碌的科技人與家庭預備溫暖的信仰與陪伴。'
  const url = 'https://nanke-blessing.vercel.app'
  const image = 'https://nanke-blessing.vercel.app/images/og-image-1.jpg'
  
  // [維護者筆記] 修正 Google Calendar 參數錯誤
  // 錯誤修正：wkst 參數必須是 1 (週日)，之前誤植為 0 導致 400 Error 及拒絕連線
  // mode=AGENDA: 維持日程清單模式
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
                <div className="flex flex-col">
                  <header className="mb-6 md:mb-8">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                       <div className="h-[1px] w-8 bg-[#1E1B4B]"></div>
                       <span className="text-xs font-bold tracking-[0.2em] text-[#64748B] uppercase">Calendar</span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B4B]">教會行事曆</h2>
                  </header>

                  <div className="rounded-sm border border-[#D4C5B5] bg-[#F7F5F2] p-4 md:p-6 flex-1">
                    <div className="divide-y divide-[#D4C5B5]/50">
                      {uiEntries.map((e, i) => {
                        const d = e.date ? new Date(e.date) : null
                        return (
                          <article key={`${e.date ?? i}`} className="flex gap-4 md:gap-5 py-4 md:py-5 first:pt-0 last:pb-0 hover:bg-white/50 transition px-2 -mx-2 rounded-sm">
                            {d ? leftDateBlock(d) : <div className="w-20 h-[72px]" />}
                            <div className="min-w-0 flex-1 flex flex-col justify-center">
                              <h4 className="text-lg font-bold text-[#1E1B4B] line-clamp-2 mb-1">
                                {e.title}
                                {e.note ? <span className="text-[#64748B] font-normal text-base ml-2">（{e.note}）</span> : null}
                              </h4>
                              
                              <div className="flex flex-wrap items-center gap-3 text-sm text-[#B45309] font-medium tracking-wide mt-1">
                                {d && (
                                  <div className="flex items-center gap-2">
                                    <span>{weekdayNames[d.getDay()]}</span>
                                    <span className="w-1 h-1 bg-[#B45309] rounded-full"></span>
                                    <span>{fMD.format(d)}</span>
                                  </div>
                                )}
                                
                                {/* 3. 新增下載按鈕：如果有 pptUrl 才顯示 */}
                                {e.pptUrl && (
                                  <a 
                                    href={e.pptUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-[#B45309]/10 text-[#B45309] text-xs font-bold hover:bg-[#B45309] hover:text-white transition-colors border border-[#B45309]/20"
                                    title="下載本週簡報"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                                    下載簡報
                                  </a>
                                )}
                              </div>

                            </div>
                          </article>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* [維護者筆記] 微調對齊：
                    將 lg:pt-24 (96px) 增加至 lg:pt-[99px]，
                    以精確匹配左側 Header 的高度（副標+主標+margin），
                    解決右側日曆「稍微突出」的問題。
                */}
                <div className="flex flex-col h-full pt-0 lg:pt-[99px] relative">
                  <div className="relative rounded-sm border border-[#D4C5B5] bg-white shadow-sm overflow-hidden flex-1">
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
                  {/* 新增：Google 日曆外部連結 (防呆用) - 桌機版顯示於區塊外下方 */}
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
                  聽聽弟兄姊妹們分享他們的生命故事，見證神的真實。
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
  const ymKey = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    timeZone: 'Asia/Taipei'
  }).format(new Date())

  // 2. 更新 Query: 使用 asset->url 來取得真實檔案連結
  const monthlyPlanQuery = `
    *[_type == "monthlyPlan" && (month == $ymKey || ym == $ymKey || monthSlug == $ymKey)][0]{
      "themeTitle": coalesce(themeTitle, title, bookTitle, ""),
      "entries": coalesce(entries, [])
        | order(date asc)[] {
          "date": date,
          title,
          note,
          "pptUrl": pptFile.asset->url
        }
    }
  `

  try {
    const [monthlyPlan, testimonies] = await Promise.all([
      sanityClient.fetch<MonthlyPlan>(monthlyPlanQuery, { ymKey }),
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