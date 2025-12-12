// pages/video/happy-group.tsx
'use client';

import { motion } from 'framer-motion'
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function HappyGroup() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] font-sans selection:bg-[#FDE68A] selection:text-[#1E1B4B]">
      <Head>
        <title>幸福小組花絮 | 南科福氣教會</title>
        <meta name="description" content="分享愛、分享生活、分享福音——南科福氣教會幸福小組花絮" />
      </Head>
      
      <NavBar />
      
      <main className="flex-grow pt-28 md:pt-40 pb-12 md:pb-24 overflow-hidden">
        
        {/* --- Section 1: 手札封面 --- */}
        <div className="container mx-auto px-6 lg:px-12 mb-12 md:mb-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FBBF24]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block border border-[#1E1B4B] px-4 py-1.5 md:px-6 md:py-2 rounded-full mb-4 md:mb-6 bg-white shadow-sm">
                <span className="text-[#1E1B4B] text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">
                  Happy Group Moments
                </span>
              </div>
              
              <h1 className="text-3xl md:text-7xl font-serif font-bold text-[#1E1B4B] mb-4 md:mb-6 leading-tight">
                幸福小組<span className="text-[#F59E0B]">.</span>花絮
              </h1>
              
              <p className="text-[#475569] text-sm md:text-lg max-w-2xl mx-auto leading-loose">
                這不僅是一個聚會，更是一種生活方式。<br/>
                在這裡，我們一起吃飯、一起大笑、一起經歷生命的改變。
              </p>
            </motion.div>
          </div>
        </div>

        {/* --- Section 2: 錯位影片牆 --- */}
        <div className="container mx-auto px-6 lg:px-12 space-y-16 md:space-y-32">
          
          {/* Story 01 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* 影片容器 */}
            {/* ✅ 修正重點：手機版 order-2 (排後面)，電腦版 order-1 (排左邊) */}
            <div className="order-2 lg:order-1 relative group perspective-1000">
              <div className="absolute inset-0 bg-[#1E1B4B] rounded-sm transform translate-x-2 translate-y-2 md:translate-x-3 md:translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1"></div>
              <div className="relative bg-white p-3 md:p-4 rounded-sm border border-[#1E1B4B] shadow-xl transform rotate-[-2deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.02]">
                <div className="aspect-video w-full overflow-hidden rounded-sm bg-gray-100">
                  <iframe 
                    src="https://www.youtube.com/embed/MsldP9y4Xkg" 
                    title="幸福小組-前導片" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="pt-3 md:pt-4 pb-1 md:pb-2 px-1 md:px-2 flex justify-between items-end">
                  <span className="font-serif font-bold text-[#1E1B4B] text-base md:text-lg">Season 01</span>
                  <span className="text-[10px] md:text-xs text-[#94A3B8] tracking-widest uppercase">Teaser Video</span>
                </div>
              </div>
            </div>

            {/* 文字敘述 */}
            {/* ✅ 修正重點：手機版 order-1 (排前面)，電腦版 order-2 (排右邊) */}
            <div className="order-1 lg:order-2 lg:pl-10">
              <span className="text-[#F59E0B] font-bold text-5xl md:text-6xl font-serif leading-none opacity-50">01.</span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B4B] mt-2 md:mt-4 mb-4 md:mb-6">
                遇見幸福的起點
              </h2>
              <p className="text-[#475569] leading-loose text-sm md:text-lg mb-6 md:mb-8 text-justify">
                這是一段關於尋找與被尋找的旅程。在忙碌的城市節奏中，我們為你預備了一個溫暖的角落。沒有批判，只有接納；沒有壓力，只有真誠的分享。
              </p>
              <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8 text-sm md:text-base">
                {['輕鬆的晚餐時光', '真實的生命故事', '溫暖的陪伴關係'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-[#1E1B4B] font-medium">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Story 02 */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* 文字敘述 */}
            {/* ✅ 修正重點：移除 order-2，自然順序即為第一 (手機文字在上) */}
            <div className="lg:pr-10 text-right lg:text-right">
              <span className="text-[#F59E0B] font-bold text-5xl md:text-6xl font-serif leading-none opacity-50">02.</span>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#1E1B4B] mt-2 md:mt-4 mb-4 md:mb-6">
                生命翻轉的見證
              </h2>
              <p className="text-[#475569] leading-loose text-sm md:text-lg mb-6 md:mb-8 text-justify lg:text-right">
                每一個來到這裡的人，都帶著自己的故事。透過彼此的激勵與神的愛，我們看見無數個生命從破碎到完整，從憂愁到喜樂。這不是奇蹟，這是每天發生的真實。
              </p>
              <Link href="/about/gatherings" className="inline-block border-b-2 border-[#F59E0B] text-[#1E1B4B] font-bold pb-1 hover:text-[#F59E0B] transition-colors text-sm md:text-base">
                了解更多聚會資訊 &rarr;
              </Link>
            </div>

            {/* 影片容器 */}
            {/* ✅ 修正重點：移除 order-1，自然順序即為第二 (手機影片在下) */}
            <div className="relative group perspective-1000">
              <div className="absolute inset-0 bg-[#F59E0B] rounded-sm transform translate-x-[-8px] translate-y-2 md:translate-x-[-12px] md:translate-y-3 transition-transform group-hover:translate-x-[-4px] group-hover:translate-y-1"></div>
              <div className="relative bg-white p-3 md:p-4 rounded-sm border border-[#1E1B4B] shadow-xl transform rotate-[2deg] transition-all duration-500 group-hover:rotate-0 group-hover:scale-[1.02]">
                <div className="aspect-video w-full overflow-hidden rounded-sm bg-gray-100">
                  <iframe 
                    src="https://www.youtube.com/embed/nLjTCSNDnGA" 
                    title="幸福小組-見證" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen 
                    className="w-full h-full"
                  ></iframe>
                </div>
                <div className="pt-3 md:pt-4 pb-1 md:pb-2 px-1 md:px-2 flex justify-between items-end">
                  <span className="font-serif font-bold text-[#1E1B4B] text-base md:text-lg">Season 02</span>
                  <span className="text-[10px] md:text-xs text-[#94A3B8] tracking-widest uppercase">Testimony</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* --- Section 3: 底部邀請 --- */}
        <div className="container mx-auto px-6 lg:px-12 mt-16 md:mt-32 text-center">
          <div className="bg-white border border-[#D4C5B5] p-8 md:p-16 rounded-sm shadow-sm max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1E1B4B] mb-4 md:mb-6">
              預備好經歷這份幸福了嗎？
            </h3>
            <p className="text-[#475569] mb-6 md:mb-8 text-sm md:text-base">
              無論你正處於人生的哪個階段，這裡都有屬於你的位置。
            </p>
            <Link href="/about/gatherings">
              <button className="px-8 py-3 md:px-10 md:py-4 bg-[#1E1B4B] text-white font-bold tracking-widest uppercase rounded-sm hover:bg-[#F59E0B] hover:text-[#1E1B4B] transition-colors duration-300 shadow-lg text-sm md:text-base">
                加入我們 Join Us
              </button>
            </Link>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  )
}