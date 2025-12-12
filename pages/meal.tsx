// pages/meal.tsx
'use client';

import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { MapPin, Utensils, Clock } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

// 移除登入檢查，允許直接訪問
export async function getServerSideProps(ctx: any) {
  return { props: {} }
}

export default function MealRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    window.open('https://forms.gle/cLvanRm7Em4FeFL89', '_blank')
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#FFEDD5] selection:text-[#EA580C]">
      <Head>
        <title>愛宴系統 - 南科福氣教會</title>
        <meta name="description" content="南科福氣教會愛宴系統" />
      </Head>

      <NavBar />

      {/* 保持頂部 pt-28 (防剪裁)，底部 pb-12 */}
      <main className="flex-grow pt-28 md:pt-40 pb-12 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          
          {/* --- Header: 標題區 (統一風格修正) --- */}
          {/* ✅ 修正重點：結構改為 flex-row，不再 text-center */}
          <div className="border-b border-[#D4C5B5] pb-6 md:pb-10 mb-8 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                {/* 移除原本的裝飾線，改用標準小標 */}
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#EA580C] mb-2 md:mb-4 uppercase">
                  Sunday Fellowship
                </span>
                {/* 標題靠左 */}
                <h1 className="text-3xl md:text-6xl font-serif font-bold text-[#1E1B4B] leading-tight">
                  愛宴系統
                </h1>
              </div>
              
              {/* 文字對齊：手機靠右 text-right，電腦靠左 md:text-left */}
              <p className="max-w-md text-[#475569] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                不僅是食物的分享，更是生命的連結。<br/>
                邀請您每週日留步，與我們一同坐席，分享主裡的愛與豐盛。
              </p>
            </div>
          </div>

          {/* --- Content: 登記卡片 --- */}
          <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-[#D4C5B5] flex flex-col md:flex-row">
            
            {/* 左側：資訊與按鈕 */}
            <div className="md:w-1/2 p-6 md:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-dashed border-[#D4C5B5] relative">
              <div className="absolute top-3 left-3 right-3 bottom-3 md:top-4 md:left-4 md:right-4 md:bottom-4 border border-[#F7F5F2] pointer-events-none"></div>
              
              <div className="space-y-6 md:space-y-10 relative z-10">
                
                {/* 時間 */}
                <div className="flex gap-4 md:gap-5 items-start group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0 border border-[#EA580C]/20 group-hover:border-[#EA580C] transition-colors">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#EA580C]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] md:text-sm font-bold tracking-widest text-[#94A3B8] uppercase mb-1">Time</h3>
                    <p className="text-lg md:text-xl font-serif text-[#1E1B4B] font-bold">每主日 12:00 - 13:30</p>
                    <p className="text-xs md:text-sm text-[#64748B] mt-1">主日聚會結束後</p>
                  </div>
                </div>

                {/* 地點 */}
                <div className="flex gap-4 md:gap-5 items-start group">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFF7ED] flex items-center justify-center shrink-0 border border-[#EA580C]/20 group-hover:border-[#EA580C] transition-colors">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#EA580C]" />
                  </div>
                  <div>
                    <h3 className="text-[10px] md:text-sm font-bold tracking-widest text-[#94A3B8] uppercase mb-1">Location</h3>
                    <p className="text-lg md:text-xl font-serif text-[#1E1B4B] font-bold">南科育成中心 B1</p>
                    <p className="text-xs md:text-sm text-[#64748B] mt-1">愛宴用餐區 / 交誼廳</p>
                  </div>
                </div>

                {/* 按鈕 */}
                <div className="pt-2 md:pt-4">
                  <button onClick={handleSubmit} disabled={isSubmitting} className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold py-3 md:py-4 px-6 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group">
                    <Utensils className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    <span className="tracking-widest uppercase text-xs md:text-sm font-bold">
                      {isSubmitting ? 'Opening...' : 'Reserve A Seat / 立即登記'}
                    </span>
                  </button>
                  <p className="text-[10px] md:text-xs text-center text-[#94A3B8] mt-2 md:mt-3">* 將開啟 Google 表單進行登記</p>
                </div>
              </div>
            </div>

            {/* 右側：圖片 Banner */}
            <div className="md:w-1/2 bg-[#F1F5F9] relative min-h-[250px] md:min-h-auto">
              <Image src="/images/meal-banner.jpg" alt="愛宴聚會" fill className="object-cover mix-blend-multiply opacity-90" priority />
              <div className="absolute inset-0 bg-[#EA580C]/10 mix-blend-overlay"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/60 to-transparent text-white">
                <p className="font-serif italic text-base md:text-lg opacity-90">&quot;They broke bread in their homes and ate together with glad and sincere hearts.&quot;</p>
                <p className="text-[10px] md:text-xs mt-2 opacity-70 uppercase tracking-widest">— Acts 2:46</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}