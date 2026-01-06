// pages/about/gatherings.tsx
'use client';

import NavBar from '@/components/NavBar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function GatheringsPage() {
  
  const gatherings = [
    {
      id: "01",
      title: '琴與爐敬拜、教會禱告會',
      engTitle: 'Worship & Prayer',
      time: '週日上午 09:00–09:50',
      description: '透過詩歌敬拜與禱告，與神親近，為教會和個人需要代求。',
      isSpecial: false
    },
    {
      id: "02",
      title: '主日聚會、兒童主日學',
      engTitle: 'Sunday Service',
      time: '週日上午 10:00–12:00',
      description: '主日崇拜信息與兒童聖經教導，適合全家一起參與。',
      isSpecial: false
    },
    {
      id: "03",
      title: '兒童品格班',
      engTitle: 'Kids Character',
      time: '週三晚上 19:00–20:30',
      description: '透過聖經故事和活動，培養孩子優良品格和屬靈生命。',
      isSpecial: false
    },
    {
      id: "04",
      title: '幸福門徒訓練',
      engTitle: 'Discipleship',
      time: '每年 1月、7月 (4學期×12週)',
      description: '系統性的門徒訓練課程，幫助信徒在真理上扎根成長。',
      isSpecial: false
    },
    {
      id: "05",
      title: '幸福小組',
      engTitle: 'Happiness Group',
      time: '每年 4月、10月 (8週)',
      description: '小組形式的福音聚會，分享生命見證，領人歸主。',
      isSpecial: false
    },
    {
      id: "06",
      title: '細胞小組',
      engTitle: 'Cell Group',
      time: '週間聚會', 
      description: '深入的團契生活，彼此牧養。點擊查看更多小組詳情。',
      isSpecial: true, 
      link: '/about/groups'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#423A32] font-sans selection:bg-[#C9A685] selection:text-white">
      <Head>
        <title>各種成全聚會 | 南科福氣教會</title>
        <meta name="description" content="琴與爐敬拜、主日崇拜、兒童主日學、門徒訓練、幸福小組。了解南科福氣教會的聚會時間。" />
      </Head>

      <NavBar />

      {/* ✅ 修正 1: 頂部間距加大至 pt-28 */}
      <main className="pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-20">
        
        {/* --- Section 1: 標題區 --- */}
        {/* ✅ 修正 2: 底部間距縮小至 mb-8 */}
        <section className="container mx-auto px-6 lg:px-12 mb-8 md:mb-16">
          <div className="border-b border-[#D4C5B5] pb-6 md:pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#9C826B] mb-2 md:mb-4 uppercase">
                  Gatherings & Events
                </span>
                {/* ✅ 修正 3: 手機版標題 text-3xl，統一全站風格 */}
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-[#423A32] leading-tight">
                  成全聚會
                </h1>
              </div>
              
              {/* 文字對齊維持 text-right md:text-left */}
              <p className="max-w-xl text-[#6B5D52] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                聚會是為了成全聖徒。<br/>
                我們提供不同類型的聚會，滿足<span className="text-[#423A32] border-b border-[#D4C5B5]">不同年齡與需求</span>的成長。
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 2: 聚會時刻表 --- */}
        <section className="container mx-auto px-6 lg:px-12 mb-12 md:mb-24">
          
          <div className="flex items-center gap-4 mb-6 md:mb-10">
             <div className="h-[1px] w-8 md:w-12 bg-[#423A32]"></div>
             <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#423A32] uppercase">Weekly Schedule</h2>
          </div>

          <div className="border-t border-[#D4C5B5]">
            {gatherings.map((item) => (
              item.isSpecial ? (
                // --- 特殊項目：細胞小組 ---
                <Link key={item.id} href={item.link || '#'} className="block">
                  {/* ✅ 修正 4: 手機版 p-6 */}
                  <div className="group relative bg-[#423A32] text-[#F5F2EB] p-6 lg:p-10 mt-[-1px] transition-all duration-500 hover:bg-[#5C5146] hover:shadow-xl hover:shadow-[#423A32]/20 hover:-translate-y-1 overflow-hidden cursor-pointer">
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A685] opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 relative z-10">
                      <div>
                        <div className="flex items-baseline gap-3 md:gap-4 mb-2">
                           <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#C9A685] uppercase">
                             {item.engTitle}
                           </span>
                           <span className="text-[10px] md:text-xs px-2 py-0.5 border border-[#C9A685]/50 rounded text-[#C9A685]">
                             點擊查看
                           </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#F5F2EB] mb-2 group-hover:text-white transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[#D4C5B5] font-light text-sm md:text-base group-hover:text-[#F5F2EB] transition-colors">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="flex-shrink-0 mt-2 md:mt-0">
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#C9A685] flex items-center justify-center text-[#C9A685] group-hover:bg-[#C9A685] group-hover:text-[#423A32] transition-all duration-300">
                           <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                           </svg>
                         </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                // --- 一般項目：時刻表樣式 ---
                <div key={item.id} className="group border-b border-[#D4C5B5] hover:bg-white transition-colors duration-500">
                  <div className="flex flex-col lg:flex-row lg:items-stretch min-h-[100px] md:min-h-[140px]">
                    
                    {/* 左側：時間區塊 */}
                    <div className="lg:w-1/3 py-4 md:py-8 lg:py-10 pr-6 flex flex-col justify-start">
                      <span className="text-[10px] md:text-sm font-bold text-[#9C826B] uppercase tracking-wider mb-1 md:mb-2">
                        Time
                      </span>
                      <p className="text-base md:text-lg font-serif font-medium text-[#423A32] group-hover:text-[#B49276] transition-colors">
                        {item.time}
                      </p>
                    </div>

                    <div className="hidden lg:block w-[1px] bg-[#D4C5B5] group-hover:bg-[#F5F2EB] transition-colors my-8"></div>

                    {/* 右側：內容區塊 */}
                    <div className="lg:w-2/3 pb-6 md:py-8 lg:py-10 lg:pl-10 relative">
                       <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#B49276] opacity-0 group-hover:opacity-100 transition-opacity lg:hidden"></div>

                       <div className="flex justify-between items-start mb-2 md:mb-3">
                          <h3 className="text-lg md:text-2xl font-serif font-bold text-[#423A32]">
                            {item.title}
                          </h3>
                          <span className="text-[10px] font-bold tracking-[0.1em] text-[#9C826B] opacity-50 uppercase mt-1 hidden md:block">
                            {item.engTitle}
                          </span>
                       </div>
                       
                       <p className="text-[#6B5D52] leading-relaxed text-sm md:text-base group-hover:text-[#423A32] transition-colors">
                         {item.description}
                       </p>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </section>

        {/* --- Section 3: 頁尾呼召 --- */}
        <section className="container mx-auto px-6 lg:px-12 mt-12 md:mt-24 mb-12">
           <div className="bg-[#EBE5DC] py-10 md:py-16 px-6 rounded-sm border border-[#D4C5B5] text-center">
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#423A32] mb-4 md:mb-6">
                歡迎回家
              </h2>
              <p className="text-[#6B5D52] mb-6 md:mb-8 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                聚會不只是一個儀式，而是家人團聚的時刻。<br/>
                期待在聚會中見到你。
              </p>
              
              {/* ✅ 修改重點：連結改為 Line 官方帳號連結 */}
              <a 
                href="https://lin.ee/nQ7s6dC" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="bg-[#9C826B] text-white hover:bg-[#856D58] px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-bold tracking-widest transition-colors duration-300 uppercase shadow-lg shadow-[#9C826B]/20">
                  聯絡我們
                </button>
              </a>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}