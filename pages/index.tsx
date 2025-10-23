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

type Entry = { date: string; title: string; note?: string | null }
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

  // === 本月所有主日（4~5 個） ===
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

  const themeTitle = monthlyPlan?.themeTitle || '敬請期待'
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
          w-20 h-[72px] shrink-0 text-center px-1 py-2 rounded-md
          border border-gray-200 bg-white
          bg-[repeating-linear-gradient(-45deg,_rgba(0,0,0,0.04)_0_2px,_transparent_2px_4px)]
          flex flex-col items-center justify-center
        "
      >
        <div className="text-3xl font-bold leading-none tracking-tight text-gray-800">{day}</div>
        <div className="mt-1 text-[11px] leading-none text-gray-500">{monthNum}月, {yearNum}</div>
      </div>
    )
  }

  const title = '南科福氣教會 Nanke Blessed & Blessing Church'
  const desc =
    '主日聚會每週日10:00–12:00，地點：南科育成中心國際會議廳B104。兒童主日學、品格班、週三小組與新營據點，歡迎參與。'
  const url = 'https://nanke-blessing.vercel.app'
  const image = 'https://nanke-blessing.vercel.app/images/og-image-1.jpg' // 1200x630 建議

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="canonical" href={url} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="南科福氣教會" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />

        {/* WebSite 結構化資料 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '南科福氣教會',
              alternateName: [
                'Nanke Blessed & Blessing Church',
                '南科福氣教會 Nanke Blessed & Blessing Church',
              ],
              url,
            }),
          }}
        />
        {/* Organization（可帶 logo） */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: '南科福氣教會',
              url,
              logo: `${url}/android-chrome-512x512.png`,
            }),
          }}
        />
      </Head>

      {/* 搜尋摘要常會抓頁面可見內容，放隱藏 H1/段落輔助 */}
      <h1 className="sr-only">{title}</h1>
      <p className="hidden">{desc}</p>

      {/* 只調整顏色（覆蓋 MinistriesPreview 裡的 Tailwind 顏色類別），其他完全不變 */}
      <style jsx global>{`
        .monthly-title::selection { color: #0f766e; } /* teal-700 */

        /* —— 事工卡顏色依照圖片 —— 
           時間那行(通常使用 text-orange/amber-*) → 粉紅 #EA5F98
           地點那行(通常使用 text-emerald/green-*) → 藍色 #3B82F6
           連結維持藍色，hover 更深 */
        .ministry-palette [class*="text-orange-"],
        .ministry-palette [class*="text-amber-"] {
          color: #EA5F98 !important;
        }
        .ministry-palette [class*="text-emerald-"],
        .ministry-palette [class*="text-green-"] {
          color: #3B82F6 !important;
        }
        .ministry-palette a { color: #2563EB !important; }
        .ministry-palette a:hover { color: #1D4ED8 !important; }
      `}</style>

      <div className="relative">
        <NavBar />

        {/* Cookie Consent */}
        {showCookieBanner && (
          <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 w-[92%] md:w-auto md:min-w-[720px] rounded-2xl border border-gray-200 bg-white/95 backdrop-blur px-4 py-3 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <p className="text-[13px] md:text-[14px] text-gray-600">
                本網站使用 cookie 儲存登入狀態與個人化設定。請點選「同意」以確保功能正常運作。
              </p>
              <button
                className="px-5 py-2 rounded-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white text-sm font-semibold transition"
                onClick={handleAcceptCookies}
              >
                同意
              </button>
            </div>
          </div>
        )}

        <main className="relative bg-white text-gray-700 text-[16px] md:text-[17px]">
          {/* Hero */}
          <div className="pt-16 md:pt-28 border-b border-gray-200 bg-white">
            <HeroCarousel />
          </div>

          {/* 事工預覽（用 class 包住僅為套顏色；不改任何 DOM 結構） */}
          <section className="bg-slate-50 border-y border-gray-200">
            <div className="container mx-auto px-4 py-9 md:py-12">
              <header className="mb-5 md:mb-6">
                <h2 className="text-2xl md:text-[28px] font-semibold tracking-tight text-gray-800">聚會與事工</h2>
                <div className="mt-2 h-[3px] w-10 bg-sky-500 rounded-full" />
                <p className="mt-2 text-[15px] md:text-base text-gray-600">
                  認識我們固定聚會與主要事工，快速連結到你關心的內容。
                </p>
              </header>
              <div className="ministry-palette">
                <MinistriesPreview />
              </div>
            </div>
          </section>

          {/* 本月主題 & 行事曆 */}
          <section className="bg-white">
            <div className="container mx-auto px-4 py-10 md:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch">
                {/* 左：教會行事曆列表 */}
                <div className="flex flex-col">
                  <header className="mb-5 md:mb-6">
                    <h2 className="text-2xl md:text-[28px] font-semibold tracking-tight text-gray-800">教會行事曆</h2>
                    <div className="mt-2 h-[3px] w-10 bg-sky-500 rounded-full" />
                  </header>

                  <div className="rounded-xl border border-gray-200 bg-[#FAF7F2] shadow-sm p-5 md:p-6 flex-1">
                    <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
                      {uiEntries.map((e, i) => {
                        const d = e.date ? new Date(e.date) : null
                        return (
                          <article key={`${e.date ?? i}`} className="flex gap-4 p-4 md:p-5 hover:bg-black/0 transition">
                            {d ? leftDateBlock(d) : <div className="w-20 h-[72px]" />}
                            <div className="min-w-0 flex-1">
                              <h4 className="monthly-title text-[16px] md:text-[17px] font-normal tracking-tight text-gray-800 line-clamp-2">
                                {e.title}{e.note ? <span className="monthly-title text-gray-500">（{e.note}）</span> : null}
                              </h4>
                              {d && (
                                <div className="mt-1 flex items-center gap-3 text-[13px] text-gray-500">
                                  <span className="inline-flex items-center gap-1">
                                    <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70">
                                      <path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3V2zm13 7H4v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9z"/>
                                    </svg>
                                    {weekdayNames[d.getDay()]}，{fMD.format(d)}
                                  </span>
                                </div>
                              )}
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* 右：行事曆 iframe */}
                <div className="flex flex-col h-full">
                  <div className="mt-auto relative rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden aspect-[5/4.12]">
                    <iframe
                      src="https://calendar.google.com/calendar/embed?src=info.nkbbc%40gmail.com&src=zh.taiwan%23holiday%40group.v.calendar.google.com&ctz=Asia%2FTaipei&wkst=1"
                      style={{ border: 0 }}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      title="教會行事曆"
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 生命見證 */}
          <section className="bg-slate-50 border-t border-gray-200">
            <div className="container mx-auto px-4 py-10 md:py-12">
              <div className="mb-5 md:mb-6">
                <h2 className="text-2xl md:text-[28px] font-semibold tracking-tight text-gray-800">生命見證</h2>
                <div className="mt-2 h-[3px] w-10 bg-sky-500 rounded-full" />
                <p className="mt-2 text-[15px] md:text-base text-gray-600">
                  聽聽弟兄姊妹們分享他們的生命故事。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                {(testimonies ?? []).map((t) => {
                  const vid = extractYouTubeId(t.youtubeUrl)
                  const embedSrc = vid ? `https://www.youtube.com/embed/${vid}` : t.youtubeUrl
                  return (
                    <article
                      key={t._id}
                      className="group rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-card transition px-5 py-5 md:px-6 md:py-6"
                    >
                      <header className="mb-3 flex items-center gap-2">
                        {t.tag ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-sky-100 text-sky-700 text-xs md:text-[12px] font-semibold">
                            {t.tag}
                          </span>
                        ) : null}
                        <h3 className="text-[17px] md:text-[18.5px] font-semibold tracking-tight text-gray-800">
                          {t.title}
                        </h3>
                      </header>

                      <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-4">
                        <div className="aspect-video">
                          <iframe
                            src={embedSrc}
                            title={t.title}
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      </div>

                      {t.description ? (
                        <p className="text-[16px] md:text-[17px] leading-[1.75] text-gray-700">
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

// ====== SSR ======
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const ymKey = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    timeZone: 'Asia/Taipei'
  }).format(new Date())

  const monthlyPlanQuery = `
    *[_type == "monthlyPlan" && (month == $ymKey || ym == $ymKey || monthSlug == $ymKey)][0]{
      "themeTitle": coalesce(themeTitle, title, bookTitle, ""),
      "entries": coalesce(entries, [])
        | order(date asc)[] {
          "date": date,
          title,
          note
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
