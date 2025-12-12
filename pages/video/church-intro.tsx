// pages/video/church-intro.tsx
'use client';

import { motion } from 'framer-motion'
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ChurchIntro() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <Head>
        <title>教會簡介 | 南科福氣教會</title>
        <meta name="description" content="了解南科福氣教會的歷史與使命" />
      </Head>
      
      <NavBar />
      
      <main className="flex-grow">
        
        {/* --- Section 1: 極簡開場 (Minimal Hero) --- */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 lg:px-12 relative overflow-hidden">
          {/* 背景裝飾字 */}
          <div className="absolute top-20 right-[-5%] text-[6rem] md:text-[15rem] font-serif font-bold text-[#E5E5E5] opacity-40 select-none pointer-events-none rotate-90 md:rotate-0">
            STORY
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="h-[1px] w-12 bg-[#B45309]"></span>
                <span className="text-[#B45309] font-bold tracking-[0.2em] text-xs uppercase">
                  Who We Are
                </span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-serif font-bold text-[#1E1B4B] mb-8 leading-tight">
                建造榮耀的教會<br/>
                <span className="text-2xl md:text-5xl opacity-60 font-light italic">Building a Glorious Church</span>
              </h1>
              
              <p className="text-base md:text-xl text-[#475569] leading-loose max-w-2xl border-l-4 border-[#1E1B4B] pl-6 md:pl-8">
                這是一個關於愛、關於家、關於生命改變的故事。<br/>
                我們渴望看見每一個來到這裡的人，都能經歷神真實的同在。
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- Section 2: 影院模式 (Cinema Mode) --- */}
        <section className="bg-[#1C1917] py-20 md:py-32 relative">
          <div className="container mx-auto px-6 lg:px-12">
            
            {/* 影片容器 */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full aspect-video max-w-5xl mx-auto shadow-2xl shadow-black/50 rounded-sm overflow-hidden border border-[#44403C]"
            >
              <iframe 
                src="https://www.youtube.com/embed/Lzjs1mX6qmI" 
                title="Church Intro Video" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                className="w-full h-full"
              ></iframe>
            </motion.div>

            {/* 影片下方說明 */}
            <div className="text-center mt-12">
              <p className="text-[#A8A29E] text-sm tracking-widest uppercase mb-2">Watch Our Story</p>
              <h3 className="text-white text-xl md:text-2xl font-serif">南科福氣教會 簡介影片</h3>
            </div>

          </div>
        </section>

        {/* --- Section 3: 雜誌專訪排版 (修正重點) --- */}
        <section className="py-16 md:py-32 container mx-auto px-6 lg:px-12">
          {/* gap-12: 手機版間距縮小，電腦版 gap-16 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* 左側：大標題 */}
            {/* ✅ 關鍵修正：將 sticky 改為 relative lg:sticky。
                手機版 (relative) 會隨頁面捲動，不會擋住下方的字；
                電腦版 (lg:sticky) 維持原本的側欄懸浮效果。 */}
            <div className="relative lg:sticky lg:top-32">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1E1B4B] mb-6 md:mb-8 leading-tight">
                不僅是聚會，<br/>
                更是<span className="text-[#B45309] border-b-2 border-[#B45309]">家人</span>。
              </h2>
              <div className="hidden lg:block w-24 h-1 bg-[#1E1B4B] mb-8"></div>
              <p className="text-[#64748B] text-base md:text-lg font-medium">
                Established in 2010
              </p>
            </div>

            {/* 右側：內文故事 */}
            <div className="space-y-8 md:space-y-12">
              <div className="prose prose-lg text-[#475569] leading-loose text-justify">
                <p>
                  {/* Drop Cap (首字放大)：手機版稍微縮小，避免撐開行高 */}
                  <span className="text-5xl md:text-6xl float-left mr-3 mt-[-5px] md:mt-[-10px] font-serif font-bold text-[#1E1B4B]">南</span>
                  科福氣教會成立於 2010 年，我們是一群在南科工作與生活的夥伴。起初，我們只是一個小小的查經班，但在神的恩典下，我們看見了這塊土地的需要——那些忙碌於工作、卻渴望心靈安歇的靈魂。
                </p>
                <p>
                  我們的異象很單純：致力於分享福音、牧養群體、關懷社區。我們希望這裡不只是一個宗教場所，而是人人都能經歷神同在與恩典的屬靈家園。
                </p>
              </div>

              {/* 重點引言卡片 */}
              {/* 手機版內距 p-6，電腦版 p-10 */}
              <div className="bg-white border-l-4 border-[#B45309] p-6 md:p-10 shadow-lg relative rounded-sm">
                <span className="absolute top-2 left-4 text-5xl md:text-6xl text-[#E2E8F0] font-serif leading-none">“</span>
                <h3 className="text-lg md:text-2xl font-bold text-[#1E1B4B] mb-3 md:mb-4 relative z-10">
                  教會宗旨
                </h3>
                <p className="text-[#475569] italic relative z-10 text-base md:text-lg">
                  我們在基督的愛中成長，天天追求並經歷基督的豐富，成為耶穌基督道成肉身的見證人，以建造榮耀的教會。
                </p>
              </div>

              {/* 數據/里程碑 */}
              <div className="grid grid-cols-2 gap-8 border-t border-[#D4C5B5] pt-8 md:pt-12">
                <div>
                  <span className="block text-3xl md:text-4xl font-serif font-bold text-[#1E1B4B] mb-1">2010</span>
                  <span className="text-xs md:text-sm text-[#64748B] uppercase tracking-wider">Founded</span>
                </div>
                <div>
                  <span className="block text-3xl md:text-4xl font-serif font-bold text-[#1E1B4B] mb-1">100+</span>
                  <span className="text-xs md:text-sm text-[#64748B] uppercase tracking-wider">Families</span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}