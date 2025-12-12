// pages/about/implementation.tsx
'use client';

import NavBar from '@/components/NavBar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ImplementationPage() {
  
  const cards = [
    {
      id: "01",
      title: "以聖經為基礎",
      engTitle: "Biblical Foundation",
      content: "聖經是我們信仰的唯一權威，一切的教導和實踐必須以聖經真理為根基。",
      verse: "聖經都是神所默示的，於教訓、督責、使人歸正、教導人學義都是有益的",
      ref: "提摩太後書 3:16"
    },
    {
      id: "02",
      title: "以基督和教會的見證為目標",
      engTitle: "Christ & Church",
      content: "我們的終極目標是彰顯基督並建造教會，使基督的身體得以成長並彰顯神的榮耀。",
      verse: "為要成全聖徒，各盡其職，建立基督的身體",
      ref: "以弗所書 4:12"
    },
    {
      id: "03",
      title: "以生命追求為實行之路",
      engTitle: "Life Practice",
      content: "透過生命的追求、事奉建造、傳揚福音和神人生活，建立並實踐基督徒生活的各個層面。",
      verse: "使你們行事為人對得起主，凡事蒙祂喜悅",
      ref: "歌羅西書 1:10"
    },
    {
      id: "04",
      title: "均衡長進的門徒培育",
      engTitle: "Discipleship",
      content: "培養在聖經、生命、事奉、福音和神人生活各方面均衡成長的門徒，使每位信徒都能全面發展。",
      verse: "我們要在真道上同歸於一，認識神的兒子，得以長大成人",
      ref: "以弗所書 4:13"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#44403C] font-sans selection:bg-[#D6C0A6] selection:text-white">
      <Head>
        <title>實行之路 | 南科福氣教會</title>
        <meta name="description" content="回歸聖經，落實信仰。南科福氣教會的實行之路。" />
      </Head>

      <NavBar />

      <main className="pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-20">
        
        {/* --- Section 1: 標題區 --- */}
        {/* ✅ 修正 1: padding 統一為 px-6，與 Strategy 頁面一致 */}
        <section className="container mx-auto px-6 lg:px-12 mb-8 md:mb-16">
          <div className="border-b border-[#A8A29E] pb-6 md:pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#78716C] mb-2 md:mb-4 uppercase">
                  Our Implementation
                </span>
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-[#292524] leading-tight">
                  實行之路
                </h1>
              </div>
              {/* ✅ 修正 2: 加入 text-right md:text-left，統一全站的手機版標題排版風格 */}
              <p className="max-w-md text-[#57534E] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                信仰不該是空泛的理論。<br/>
                我們致力於將<span className="border-b border-[#A8A29E] pb-0.5 text-[#292524]">真理的藍圖</span>，建造成真實的生命工程。
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 2: 架構藍圖 --- */}
        <section className="container mx-auto px-6 lg:px-12 mb-12 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 border-t border-b border-[#A8A29E]">
            
            {/* 左側：資訊欄 */}
            <div className="lg:col-span-4 py-6 md:py-12 lg:pr-12 border-b lg:border-b-0 lg:border-r border-[#A8A29E] flex flex-col justify-between">
               <div>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#292524] mb-3 md:mb-6">架構藍圖</h3>
                  <p className="text-[#57534E] leading-loose text-sm mb-4 md:mb-8 text-justify">
                    這張圖表並非裝飾，而是我們教會運作的指南針。每一個圓圈、每一個連結，都代表著聖經中關於「基督身體」運作的法則。
                  </p>
               </div>
               
               <div className="flex gap-3 md:gap-4">
                  <div className="bg-[#E7E5E4] px-3 py-1.5 md:px-4 md:py-2 rounded-sm text-[10px] md:text-xs font-bold tracking-wider text-[#57534E]">
                    VISION
                  </div>
                  <div className="bg-[#E7E5E4] px-3 py-1.5 md:px-4 md:py-2 rounded-sm text-[10px] md:text-xs font-bold tracking-wider text-[#57534E]">
                    STRATEGY
                  </div>
               </div>
            </div>

            {/* 右側：圖片展示 */}
            <div className="lg:col-span-8 bg-[#F2F0EB] relative group overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-auto lg:min-h-[400px]">
               <img 
                 src="/images/implementation-chart.jpg" 
                 alt="實行之路架構" 
                 className="w-full h-full object-contain object-center transition-transform duration-700 group-hover:scale-105 p-4 lg:p-0"
               />
               <div className="absolute bottom-0 right-0 bg-[#292524] text-[#F7F5F2] px-3 py-1.5 md:px-6 md:py-3 text-[10px] md:text-xs font-bold tracking-widest">
                 FIGURE 1.0
               </div>
            </div>
          </div>
        </section>

        {/* --- Section 3: 核心實踐 --- */}
        <section className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-4 mb-6 md:mb-10">
             <div className="h-[1px] flex-1 bg-[#A8A29E]"></div>
             <h2 className="text-base md:text-xl font-serif font-bold text-[#292524] tracking-wide">核心實踐</h2>
             <div className="h-[1px] flex-1 bg-[#A8A29E]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#A8A29E]">
            {cards.map((card) => (
              <div 
                key={card.id} 
                className="group border-r border-b border-[#A8A29E] p-6 lg:p-12 hover:bg-[#EBE9E4] transition-colors duration-300 relative"
              >
                <div className="flex justify-between items-start mb-3 md:mb-6">
                   <h3 className="text-xl md:text-2xl font-bold text-[#292524] group-hover:translate-x-2 transition-transform duration-300">
                     {card.title}
                   </h3>
                   <span className="text-2xl md:text-4xl font-serif font-light text-[#D6D3D1] group-hover:text-[#A8A29E]">
                     {card.id}
                   </span>
                </div>

                <div className="mb-4 md:mb-8">
                   <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#78716C] mb-1.5 md:mb-2 block">
                     {card.engTitle}
                   </span>
                   <p className="text-[#57534E] leading-relaxed text-sm text-justify">
                     {card.content}
                   </p>
                </div>

                <div className="mt-auto pt-3 md:pt-6 border-t border-[#D6D3D1] group-hover:border-[#A8A29E]">
                   <p className="font-serif italic text-[#44403C] text-xs md:text-sm opacity-90">
                     "{card.verse}"
                   </p>
                   <p className="text-[10px] md:text-xs text-[#78716C] mt-1.5 md:mt-2 font-bold uppercase">
                     — {card.ref}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 4: 頁尾呼召 --- */}
        <section className="container mx-auto px-6 lg:px-12 mt-12 md:mt-24 text-center">
           <div className="bg-[#292524] text-[#F7F5F2] py-10 md:py-16 px-6 rounded-sm">
              <h2 className="text-2xl md:text-3xl font-serif font-medium mb-3 md:mb-6">
                這是一條可以行走的道路
              </h2>
              <p className="text-[#A8A29E] mb-6 md:mb-8 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                邀請你不再只是旁觀，而是加入這個建造生命的工程。<br/>
                讓我們一起經歷真理的大能。
              </p>
              
              <Link href="/about/gatherings/">
                <button className="border border-[#F7F5F2] text-[#F7F5F2] hover:bg-[#F7F5F2] hover:text-[#292524] px-8 py-3 text-xs md:text-sm font-bold tracking-widest transition-colors duration-300 uppercase">
                  JOIN US TODAY
                </button>
              </Link>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}