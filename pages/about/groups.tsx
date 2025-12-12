// pages/about/groups.tsx
'use client';

import NavBar from '@/components/NavBar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function GroupsPage() {
  
  // 1. 核心概念資料
  const groupConcepts = [
    {
      id: "01",
      title: "小組聚會",
      engTitle: "Gathering",
      content: "這不是例行公事，而是生命的交流。每週我們聚在一起讀經、分享、禱告，在彼此的代求中經歷神的大能，並一起投入福音的外展工作。",
      verse: "並且照著主所分給各人的，和神所召各人的，都要如此行。",
      ref: "哥林多前書 7:17"
    },
    {
      id: "02",
      title: "小組生活",
      engTitle: "Life Together",
      content: "小組是你屬靈的新家庭。在這裡我們卸下面具，真實地彼此接納。你將在這裡找到愛、肯定與扶持，與屬靈夥伴一同奔跑天路。",
      verse: "我們這許多人，在基督裡成為一身，互相聯絡作肢體。",
      ref: "羅馬書 12:5"
    }
  ];

  // 2. 服事內容資料
  const servicePoints = [
    "去幫助人、陪伴人、帶領人、祝福人",
    "幫助人經歷上帝的愛、醫治、大能",
    "找到生命的價值和意義"
  ];

  // 3. 小組時間表資料
  const groupSchedules = [
    { id: 1, name: "尤君小組", day: "週五", time: "19:30 - 21:30", location: "牧師家" },
    { id: 2, name: "朝暉小組", day: "週五", time: "19:30 - 21:30", location: "朝暉家" },
    { id: 3, name: "榮杰小組", day: "週五", time: "19:30 - 21:30", location: "榮杰家" },
    { id: 4, name: "淑麗小組", day: "週六", time: "08:00 - 09:45", location: "美善農場" },
    { id: 5, name: "俊男小組", day: "週六", time: "14:30 - 16:30", location: "美善農場" },
    { id: 6, name: "青少年團契", day: "週日", time: "16:00 - 18:30", location: "牧師家" },
    { id: 7, name: "黃晨小組", day: "週一", time: "19:30 - 21:00", location: "牧師家 (1、2樓)" },
    { id: 8, name: "勝騰小組", day: "週一", time: "20:00 - 22:00", location: "牧師家 (1、2樓)" },
    { id: 9, name: "玉真小組", day: "週一", time: "10:00 - 12:00", location: "玉真家" }
  ];

  return (
    // [配色計畫] 陶瓦紅 × 暖砂白
    <div className="min-h-screen bg-[#FCF9F6] text-[#5C2E2E] font-sans selection:bg-[#D4A373] selection:text-white">
      <Head>
        <title>我們的小組 | 南科福氣教會</title>
        <meta name="description" content="小組是教會的心臟。加入南科福氣教會的小組，經歷真實的肢體生活。" />
      </Head>

      <NavBar />

      {/* ✅ 修正 1: 頂部 pt-28 (防剪裁)，底部 pb-12 (手機版緊緻) */}
      <main className="pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-20">
        
        {/* --- Section 1: 標題區 --- */}
        {/* ✅ 修正 2: 底部間距縮小 mb-8 (手機) */}
        <section className="container mx-auto px-6 lg:px-12 mb-8 md:mb-20">
          <div className="border-b border-[#E6D5D5] pb-6 md:pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#B95C50] mb-2 md:mb-4 uppercase">
                  Our Community
                </span>
                {/* ✅ 修正 3: 手機版標題 text-3xl */}
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-[#4A2525] leading-tight">
                  我們的小組
                </h1>
              </div>
              
              <p className="max-w-xl text-[#7F5555] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                小組不只是聚會，而是信仰生活的核心。<br/>
                在這裡，我們彼此<span className="text-[#4A2525] border-b border-[#E6D5D5]">連結、成長、服事</span>。
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 2: 雙子星概念區 --- */}
        {/* ✅ 修正 4: 底部間距縮小 mb-12 */}
        <section className="container mx-auto px-6 lg:px-12 mb-12 md:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
            {groupConcepts.map((item) => (
              <div key={item.id} className="flex flex-col">
                <div className="w-8 md:w-12 h-1 bg-[#B95C50] mb-4 md:mb-6"></div>
                
                <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#4A2525] mb-2">
                  {item.title}
                </h3>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-[#B95C50] uppercase mb-4 md:mb-6 block">
                  {item.engTitle}
                </span>

                <p className="text-[#7F5555] leading-loose text-justify mb-6 md:mb-8 flex-grow text-sm md:text-base">
                  {item.content}
                </p>

                <div className="mt-auto p-6 bg-[#F5EBEB] rounded-sm border-l-2 border-[#B95C50]">
                  <p className="font-serif italic text-[#5C2E2E] text-xs md:text-sm">
                    "{item.verse}"
                  </p>
                  <p className="text-[10px] md:text-xs text-[#9C6D6D] mt-2 font-bold uppercase tracking-wide">
                    — {item.ref}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 3: 使命宣言區 --- */}
        {/* ✅ 修正 5: 垂直間距 py-12 mb-12 */}
        <section className="w-full bg-[#EBE0DC] py-12 md:py-20 mb-12 md:mb-24">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-[10px] md:text-sm font-bold tracking-[0.2em] text-[#B95C50] uppercase mb-3 md:mb-4">
              Service & Calling
            </h2>
            <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#4A2525] mb-6 md:mb-10 leading-snug">
              小組中的服事，<br className="md:hidden"/>發展屬靈的恩賜與能力
            </h3>

            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-12 text-left md:text-center">
              {servicePoints.map((point, index) => (
                <div key={index} className="flex items-center justify-center gap-3">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#B95C50] rotate-45 shrink-0"></div>
                  <p className="text-[#5C2E2E] font-medium text-sm md:text-lg">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Section 4: 小組名錄 --- */}
        <section className="container mx-auto px-6 lg:px-12">
          
          {/* ✅ 修正 6: 標題間距 mb-8 */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
             <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 md:w-12 bg-[#4A2525]"></div>
                <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#4A2525] uppercase">Find a Group</h2>
             </div>
             <span className="hidden md:block text-xs font-bold text-[#B95C50]">
               Total {groupSchedules.length} Groups
             </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {groupSchedules.map((group) => (
              <div 
                key={group.id}
                // ✅ 修正 7: 手機版內距 p-6
                className="group relative bg-white border border-[#E6D5D5] p-6 md:p-8 hover:border-[#B95C50] hover:shadow-xl hover:shadow-[#B95C50]/10 transition-all duration-300 flex flex-col items-center text-center"
              >
                {/* 頂部：星期標籤 */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                   <span className="bg-[#B95C50] text-white text-[10px] md:text-xs font-bold px-3 py-1 tracking-widest uppercase shadow-sm">
                     {group.day}
                   </span>
                </div>

                {/* 群組名稱 */}
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#4A2525] mt-2 md:mt-4 mb-2 group-hover:text-[#B95C50] transition-colors">
                  {group.name}
                </h3>
                
                <div className="w-8 h-[1px] bg-[#E6D5D5] my-3 md:my-4 group-hover:w-16 group-hover:bg-[#B95C50] transition-all"></div>

                {/* 時間與地點 */}
                <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-[#7F5555]">
                  <div className="flex items-center gap-2 justify-center">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{group.time}</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center">
                    <svg className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>{group.location}</span>
                  </div>
                </div>

                {/* 互動提示 */}
                <div className="mt-4 md:mt-6 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 hidden md:block">
                  <span className="text-[10px] font-bold text-[#B95C50] uppercase tracking-widest border-b border-[#B95C50]">
                    Join This Group
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 5: 頁尾呼召 --- */}
        {/* ✅ 修正 8: 頂部 margin mt-12, 內距 pt-12 */}
        <section className="container mx-auto px-6 lg:px-12 mt-12 md:mt-24 mb-12">
           <div className="border-t border-[#E6D5D5] pt-12 md:pt-16 flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-3xl md:text-4xl font-serif font-medium text-[#4A2525] mb-4 md:mb-6">
                還沒找到適合的小組？
              </h2>
              <p className="text-[#7F5555] mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                別擔心，我們樂意協助您找到屬靈的家。<br/>
                歡迎與教會辦公室聯繫。
              </p>
              
              <Link href="/contact">
                <button className="bg-[#B95C50] text-white hover:bg-[#9A4A40] px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-bold tracking-widest transition-colors duration-300 uppercase shadow-lg shadow-[#B95C50]/20">
                  聯絡我們
                </button>
              </Link>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}