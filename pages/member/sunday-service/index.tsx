import React, { useState, useMemo } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { client as sanityClient } from '@/lib/sanity.client'

// --- 定義資料型態 ---
interface Sermon {
  _id: string
  title: string
  speaker?: string
  date: string
  youtubeUrl?: string
  slidesUrl?: string
}

interface SundayServiceProps {
  sermons: Sermon[]
}

// --- Helper Functions ---

// YouTube 網址轉換
const getEmbedUrl = (url: string) => {
  if (!url) return ''
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : ''
}

// 取得年份的 Helper
const getYear = (dateString: string) => {
  return dateString.split('-')[0]
}

export default function SundayServicePage({ sermons }: SundayServiceProps) {
  // 1. 分離出「最新一篇」與「歷史信息」
  // 假設 sermons 已經是依照日期從新到舊排序
  const latestSermon = sermons.length > 0 ? sermons[0] : null
  const pastSermons = sermons.length > 1 ? sermons.slice(1) : []

  // 2. 自動計算所有出現過的年份 (從歷史信息中)
  const availableYears = useMemo(() => {
    const years = new Set(pastSermons.map(s => getYear(s.date)))
    // 轉成陣列並降序排列 (2025, 2024...)
    return Array.from(years).sort((a, b) => Number(b) - Number(a))
  }, [pastSermons])

  // 3. 控制目前選擇的年份 (預設為最新的年份)
  const [selectedYear, setSelectedYear] = useState<string>(availableYears[0] || '')

  // 4. 根據年份篩選顯示的影片
  const filteredSermons = useMemo(() => {
    return pastSermons.filter(s => getYear(s.date) === selectedYear)
  }, [pastSermons, selectedYear])

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <NavBar />

      <main className="flex-grow pt-28 md:pt-40 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* 標題區 */}
          <div className="mb-10 md:mb-14 border-b border-[#D4C5B5] pb-6">
            <span className="text-[#B45309] font-bold tracking-[0.2em] text-xs uppercase block mb-2">
              Sunday Service
            </span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1E1B4B]">
              主日信息專區
            </h1>
          </div>

          {/* 如果完全沒有資料 */}
          {!latestSermon && (
            <div className="text-center py-20 bg-white border border-[#D4C5B5] rounded-sm">
              <p className="text-[#64748B]">目前暫無上傳的主日信息。</p>
            </div>
          )}

          {/* --- 第一區塊：本週最新信息 (Hero Section) --- */}
          {latestSermon && (
            <section className="mb-20">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-8 bg-[#B45309]"></div>
                <h2 className="text-2xl font-bold tracking-wide">本週最新信息</h2>
              </div>

              <div className="bg-white border border-[#D4C5B5] rounded-sm shadow-lg overflow-hidden flex flex-col lg:flex-row">
                {/* 左側：大影片 */}
                <div className="w-full lg:w-3/4 aspect-video bg-black relative group">
                  {latestSermon.youtubeUrl ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={getEmbedUrl(latestSermon.youtubeUrl)}
                      title={latestSermon.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-white/50 text-sm">無影片連結</div>
                  )}
                </div>

                {/* 右側：詳細資訊 */}
                <div className="w-full lg:w-1/4 p-6 lg:p-8 flex flex-col bg-[#fff] relative">
                  <div className="flex-grow">
                    <span className="inline-block px-3 py-1 bg-[#1E1B4B] text-white text-xs font-bold tracking-widest mb-4">
                      LATEST
                    </span>
                    <div className="text-[#B45309] text-sm font-bold tracking-widest uppercase mb-2">
                      {latestSermon.date}
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-[#1E1B4B] mb-4 leading-tight">
                      {latestSermon.title}
                    </h3>
                    {latestSermon.speaker && (
                      <div className="flex items-center gap-2 text-[#64748B] text-sm mb-4">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        <span>講員：{latestSermon.speaker}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    {latestSermon.slidesUrl ? (
                      <a
                        href={`${latestSermon.slidesUrl}?dl=`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full py-3 px-4 bg-[#F1F5F9] hover:bg-[#B45309] text-[#1E1B4B] hover:text-white text-sm font-bold tracking-wide transition-all rounded-sm group"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        下載簡報
                      </a>
                    ) : (
                      <span className="block text-center text-xs text-gray-400 py-2">本週無簡報</span>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* --- 第二區塊：歷史信息回顧 (Archive Section) --- */}
          {pastSermons.length > 0 && (
            <section>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-6 bg-[#94A3B8]"></div>
                  <h2 className="text-xl font-bold tracking-wide text-[#475569]">信息回顧</h2>
                </div>

                {/* 年份篩選按鈕 */}
                <div className="flex flex-wrap gap-2">
                  {availableYears.map(year => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`
                        px-4 py-1.5 text-sm font-bold rounded-full transition-all duration-300 border
                        ${selectedYear === year 
                          ? 'bg-[#1E1B4B] text-white border-[#1E1B4B] shadow-md' 
                          : 'bg-white text-[#64748B] border-gray-200 hover:border-[#B45309] hover:text-[#B45309]'}
                      `}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* 網格列表 (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSermons.length > 0 ? (
                  filteredSermons.map((sermon) => (
                    <div key={sermon._id} className="bg-white border border-[#E2E8F0] rounded-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                      {/* 縮圖/影片區 */}
                      <div className="aspect-video bg-black relative overflow-hidden">
                         {/* 這裡使用 iframe，但在列表頁建議可改用 Youtube 縮圖以免載入太慢，這裡先維持 iframe 方便直接看 */}
                        {sermon.youtubeUrl ? (
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={getEmbedUrl(sermon.youtubeUrl)}
                            title={sermon.title}
                            loading="lazy" // 懶加載優化效能
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full bg-gray-100 text-gray-400 text-xs">No Video</div>
                        )}
                      </div>

                      {/* 內容區 */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="text-[#B45309] text-xs font-bold tracking-wider mb-2">
                          {sermon.date}
                        </div>
                        <h3 className="text-lg font-bold text-[#1E1B4B] mb-2 line-clamp-2 group-hover:text-[#B45309] transition-colors">
                          {sermon.title}
                        </h3>
                        {sermon.speaker && (
                          <p className="text-sm text-[#64748B] mb-4">講員：{sermon.speaker}</p>
                        )}
                        
                        <div className="mt-auto pt-4 border-t border-gray-50 flex justify-end">
                          {sermon.slidesUrl ? (
                            <a
                              href={`${sermon.slidesUrl}?dl=`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-[#64748B] hover:text-[#1E1B4B] flex items-center gap-1 transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              下載簡報
                            </a>
                          ) : (
                            <span className="text-xs text-gray-300">-</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-gray-400">
                    該年份沒有信息紀錄。
                  </div>
                )}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </div>
  )
}

// 伺服器端驗證與資料抓取
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // 1. 檢查登入權限
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?callbackUrl=${encodeURIComponent(ctx.resolvedUrl)}`,
        permanent: false,
      },
    }
  }

  // 2. 從 Sanity 抓取資料
  // 按照日期從新到舊排序
  const query = `*[_type == "sundayService"] | order(date desc) {
    _id,
    title,
    speaker,
    date,
    youtubeUrl,
    "slidesUrl": slides.asset->url
  }`

  const sermons = await sanityClient.fetch(query)

  return {
    props: {
      sermons,
    },
  }
}