// pages/about/strategy.tsx
'use client';

import NavBar from '@/components/NavBar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function StrategyPage() {
  
  const strategies = [
    {
      id: "01",
      title: "以共同追求材料成全聖徒",
      engTitle: "Equipping Saints",
      content: "透過統一的『聖經與生命』教材，幫助信徒在真理上紮根。我們不追求雜亂的知識，而是專注於能帶來生命改變的共同追求，使眾人在真道上同歸於一。",
      verse: "為要成全聖徒，各盡其職，建立基督的身體",
      ref: "以弗所書 4:12"
    },
    {
      id: "02",
      title: "以祭司團成全成全聖徒",
      engTitle: "Priesthood",
      content: "我們致力於培育信徒成為『稱職的祭司』。信仰不只是領受，更是服事；透過祭司團的運作，讓每一位弟兄姊妹都能夠起來服事神，並去牧養他人。",
      verse: "你們是被揀選的族類，是有君尊的祭司",
      ref: "彼得前書 2:9"
    },
    {
      id: "03",
      title: "以幸福小組為平台",
      engTitle: "Happiness Group",
      content: "幸福小組是我們『宣揚福音』的核心平台。我們走出教會的圍牆，進入人群，透過小組的溫暖與關懷，讓更多人有機會認識基督，經歷福音的大能。",
      verse: "我不以福音為恥，這福音本是神的大能",
      ref: "羅馬書 1:16"
    },
    {
      id: "04",
      title: "以幸福門訓系統成全聖徒",
      engTitle: "Discipleship System",
      content: "透過系統性的門徒訓練，讓每位信徒都能找到自己的恩賜與位置。我們不僅是信徒，更是門徒，能夠『各盡其職』，讓基督的身體漸漸增長。",
      verse: "按著各體的功用彼此相助，便叫身體漸漸增長",
      ref: "以弗所書 4:16"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4F6F4] text-[#2F3E35] font-sans selection:bg-[#A3B8AD] selection:text-white">
      <Head>
        <title>教會策略 | 南科福氣教會</title>
        <meta name="description" content="南科福氣教會四大策略：共同追求、祭司團、幸福小組、門訓系統。" />
      </Head>

      <NavBar />

      {/* ✅ 修正 1: 頂部間距加大至 pt-28，防止標題被導覽列遮擋 */}
      <main className="pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-20">
        
        {/* --- Section 1: 標題區 --- */}
        {/* ✅ 修正 2: 底部間距縮小至 mb-8，手機版更緊湊 */}
        <section className="container mx-auto px-6 lg:px-12 mb-8 md:mb-16">
          <div className="border-b border-[#B0BDB5] pb-6 md:pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#6B8576] mb-2 md:mb-4 uppercase">
                  Our Strategy
                </span>
                {/* ✅ 修正 3: 手機版標題 text-3xl，視覺比例剛好 */}
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1A2E26] leading-tight">
                  教會策略
                </h1>
              </div>
              
              <p className="max-w-xl text-[#526058] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                策略不是為了管理，而是為了成全。<br/>
                我們透過<span className="text-[#1A2E26] border-b border-[#B0BDB5]">四大核心策略</span>，建立健康且榮耀的教會。
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 2: 四大策略網格 --- */}
        <section className="container mx-auto px-6 lg:px-12">
          
          <div className="flex items-center gap-4 mb-6 md:mb-10">
             <div className="h-[1px] w-8 md:w-12 bg-[#1A2E26]"></div>
             <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#1A2E26] uppercase">Core Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#B0BDB5]">
            {strategies.map((item) => (
              <div 
                key={item.id} 
                // ✅ 修正 4: 手機版內距 p-6 (24px)，電腦版 p-12
                className="group border-r border-b border-[#B0BDB5] p-6 lg:p-12 hover:bg-[#E8EDE9] transition-colors duration-500 relative flex flex-col min-h-[300px] lg:min-h-[360px]"
              >
                {/* 頂部：編號與英文標題 */}
                <div className="flex justify-between items-start mb-6 md:mb-8">
                   <span className="text-4xl md:text-5xl font-serif font-light text-[#CBD5D0] group-hover:text-[#1A2E26] transition-colors duration-500">
                     {item.id}
                   </span>
                   <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B8576] py-1 px-3 border border-[#CBD5D0] rounded-full">
                     {item.engTitle}
                   </span>
                </div>

                {/* 內容區 */}
                <div className="mb-6 md:mb-8 flex-grow">
                   <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1A2E26] mb-3 md:mb-4 group-hover:translate-x-1 transition-transform duration-300">
                     {item.title}
                   </h3>
                   <p className="text-[#526058] leading-loose text-sm text-justify">
                     {item.content}
                   </p>
                </div>

                {/* 底部：經文 */}
                <div className="mt-auto pt-4 md:pt-6 border-t border-[#CBD5D0] group-hover:border-[#B0BDB5] transition-colors duration-500">
                   <p className="font-serif italic text-[#3E4F46] text-xs md:text-sm opacity-90">
                     "{item.verse}"
                   </p>
                   <p className="text-[10px] md:text-xs text-[#6B8576] mt-1.5 md:mt-2 font-bold uppercase tracking-wide">
                     — {item.ref}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 3: 頁尾呼召 --- */}
        {/* ✅ 修正 5: 頂部 margin 縮減至 mt-12 */}
        <section className="container mx-auto px-6 lg:px-12 mt-12 md:mt-24 mb-12">
           <div className="border-t border-[#B0BDB5] pt-12 md:pt-16 flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#1A2E26] mb-4 md:mb-6">
                讓策略成為生命的養分
              </h2>
              <p className="text-[#526058] mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                我們渴望看見每一位聖徒都被成全，各盡其職。<br/>
                邀請您加入這個被神使用的器皿。
              </p>
              
              {/* ✅ 修改重點：連結改為 Line 官方帳號連結 */}
              <a 
                href="https://lin.ee/nQ7s6dC" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="bg-[#2C3E36] text-[#F4F6F4] hover:bg-[#435C50] px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-bold tracking-widest transition-colors duration-300 uppercase shadow-lg shadow-[#2C3E36]/20">
                  JOIN US TODAY
                </button>
              </a>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}