// pages/courses/teen-parenting.tsx
'use client';

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function TeenParentingCourse() {
  return (
    // [配色] 全站統一：米灰底色 + 深靛藍文字
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <NavBar />

      {/* ✅ 修正 1: 底部間距縮小為 pb-12 (手機)，電腦版維持 pb-20 */}
      <main className="flex-grow pt-28 md:pt-40 pb-12 md:pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* --- Section 1: 頁面標題 (Header) --- */}
          {/* ✅ 修正 2: 底部間距縮小為 mb-8 (手機)，電腦版維持 mb-16 */}
          <div className="border-b border-[#D4C5B5] pb-8 md:pb-10 mb-8 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   <div className="h-[1px] w-8 bg-[#B45309]"></div>
                   <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#B45309] uppercase">
                     Parenting Course
                   </span>
                </div>
                {/* ✅ 修正 3: 手機版標題縮小至 text-3xl，電腦版維持原樣 */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1E1B4B] leading-tight">
                  如何教養青少年
                </h1>
              </div>
              
              <div className="max-w-xl text-left md:text-right">
                {/* ✅ 修正 4: 手機版內文 text-sm */}
                <p className="text-[#475569] font-medium leading-relaxed text-sm md:text-base">
                  建立溝通橋樑，化解親子衝突。<br/>
                  從<span className="border-b border-[#1E1B4B] text-[#1E1B4B] pb-0.5 mx-1">聖經智慧</span>與<span className="border-b border-[#1E1B4B] text-[#1E1B4B] pb-0.5 mx-1">專業諮商</span>角度，陪孩子走過關鍵期。
                </p>
              </div>
            </div>
          </div>

          {/* --- Section 2: 課程內容 (Content Grid) --- */}
          {/* ✅ 修正 5: 手機版 grid gap 縮小至 gap-8 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* 左側：課程核心 (佔 4 欄) */}
            <div className="lg:col-span-4">
              {/* ✅ 修正 6: 手機版內距縮小至 p-6 */}
              <div className="bg-white border border-[#D4C5B5] p-6 md:p-8 rounded-sm sticky top-28 md:top-32">
                <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-4 md:mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#B45309] rounded-full"></span>
                  課程焦點
                </h3>
                
                <ul className="space-y-4 md:space-y-6">
                  <li className="flex gap-3 md:gap-4 items-start group">
                    <span className="text-[#B45309] font-serif font-bold text-base md:text-lg opacity-60 group-hover:opacity-100 transition-opacity">01.</span>
                    <div>
                      <h4 className="font-bold text-[#1E1B4B] mb-1 text-sm md:text-base">理解內在需要</h4>
                      <p className="text-xs md:text-sm text-[#475569] leading-relaxed">運用聖經智慧，讀懂孩子行為背後的呼求。</p>
                    </div>
                  </li>
                  <li className="flex gap-3 md:gap-4 items-start group">
                    <span className="text-[#B45309] font-serif font-bold text-base md:text-lg opacity-60 group-hover:opacity-100 transition-opacity">02.</span>
                    <div>
                      <h4 className="font-bold text-[#1E1B4B] mb-1 text-sm md:text-base">溝通與引導</h4>
                      <p className="text-xs md:text-sm text-[#475569] leading-relaxed">學習「聽」比「說」更重要的對話藝術。</p>
                    </div>
                  </li>
                  <li className="flex gap-3 md:gap-4 items-start group">
                    <span className="text-[#B45309] font-serif font-bold text-base md:text-lg opacity-60 group-hover:opacity-100 transition-opacity">03.</span>
                    <div>
                      <h4 className="font-bold text-[#1E1B4B] mb-1 text-sm md:text-base">同行成長</h4>
                      <p className="text-xs md:text-sm text-[#475569] leading-relaxed">建立信任關係，讓家成為最安全的避風港。</p>
                    </div>
                  </li>
                </ul>

                {/* 裝飾線 */}
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-[#F1F5F9]">
                  <p className="text-[10px] md:text-xs text-[#94A3B8] tracking-widest uppercase text-center">Nanke Blessed & Blessing Church</p>
                </div>
              </div>
            </div>

            {/* 右側：詳細說明 & 呼召 (佔 8 欄) */}
            <div className="lg:col-span-8 space-y-8 md:space-y-12">
              
              {/* 文章區塊 */}
              <section>
                {/* ✅ 修正 7: 手機版標題 text-2xl */}
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1E1B4B] mb-4 md:mb-6">
                  青春期，是風暴還是轉機？
                </h2>
                {/* ✅ 修正 8: 手機版內文 text-sm，電腦版 text-lg */}
                <div className="text-sm md:text-lg text-[#475569] leading-loose text-justify space-y-4 md:space-y-6">
                  <p>
                    許多父母發現，孩子進入青春期後彷彿變了一個人。沈默寡言、情緒起伏、甚至拒絕溝通。這段時期，往往是親子關係最緊張，卻也是最需要彼此理解的時刻。
                  </p>
                  <p>
                    這門課程不只是一套教養方法，更是一趟父母自我成長的旅程。我們相信，透過真理的亮光與實務的演練，您可以從「焦慮的管教者」轉變為「智慧的同行者」。
                  </p>
                </div>
              </section>

              {/* 資訊卡片 (Information Box) */}
              {/* ✅ 修正 9: 手機版內距 p-6 */}
              <div className="bg-[#E5E5E5] border-l-4 border-[#1E1B4B] p-6 md:p-10 rounded-r-sm">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-[#1E1B4B] mb-2">
                      想了解更多資訊？
                    </h3>
                    <p className="text-xs md:text-base text-[#475569] mb-4 leading-relaxed">
                      課程時間與報名方式，歡迎於主日後至服務台洽詢，或直接透過下方管道聯繫我們。
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs md:text-sm font-medium text-[#1E1B4B]">
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        06-5834626
                      </span>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        Info.NKBBC@gmail.com
                      </span>
                    </div>
                  </div>
                  
                  {/* 按鈕 */}
                  <Link href="/about/gatherings" className="shrink-0 w-full md:w-auto">
                    <button className="w-full md:w-auto bg-[#1E1B4B] text-white hover:bg-[#312E81] px-8 py-3 md:py-4 text-xs md:text-sm font-bold tracking-[0.15em] transition-all duration-300 uppercase shadow-lg shadow-[#1E1B4B]/20 rounded-sm">
                      CONTACT US
                    </button>
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}