// pages/about/vision-mission.tsx
'use client';

import NavBar from '@/components/NavBar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function VisionMissionPage() {
  
  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1e1b4b] font-sans selection:bg-[#c7d2fe] selection:text-[#1e1b4b]">
      <Head>
        <title>異象與使命 | 南科福氣教會</title>
        <meta name="description" content="基督是頭，教會是身體。在道成肉身的見證中，活出神的榮耀。" />
      </Head>

      <NavBar />

      {/* ✅ 修正 1: 頂部間距設為 pt-28 (112px)，防止標題被導覽列遮擋 */}
      <main className="pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-20">
        
        {/* --- Section 1: 標題區 --- */}
        {/* ✅ 修正 2: 減少底部留白 mb-8，手機版更緊湊 */}
        <section className="container mx-auto px-6 lg:px-12 mb-8 md:mb-20">
          <div className="border-b border-[#94a3b8] pb-6 md:pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#64748b] mb-2 md:mb-4 uppercase">
                  Our Purpose
                </span>
                {/* ✅ 修正 3: 手機版標題縮小至 text-3xl，避免換行難看 */}
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1e1b4b] leading-tight">
                  異象與使命
                </h1>
              </div>
              
              <div className="max-w-xl text-right md:text-left">
                <p className="text-[#475569] font-medium leading-relaxed text-sm md:text-base pb-1">
                  我們不只是一群聚會的人，<br/>
                  我們是一群<span className="text-[#1e1b4b] border-b border-[#94a3b8]">有方向、有使命</span>的門徒。
                </p>
                <div className="flex gap-1 justify-end md:justify-start mt-3 md:mt-4">
                   <div className="w-8 md:w-12 h-[2px] bg-[#1e1b4b]"></div>
                   <div className="w-2 h-[2px] bg-[#fbbf24]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Section 2: 異象區 (Vision) --- */}
        <section className="container mx-auto px-6 lg:px-12 mb-12 md:mb-24">
          <div className="flex items-center gap-4 mb-6 md:mb-12">
             <div className="h-[1px] w-8 md:w-12 bg-[#1e1b4b]"></div>
             <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#1e1b4b] uppercase">Our Vision</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-[#cbd5e1] border border-[#cbd5e1]">
            
            {/* 基督 (The Head) */}
            {/* ✅ 修正 4: 手機版卡片內距縮小至 p-6 */}
            <div className="group bg-white p-6 md:p-10 lg:p-16 flex flex-col justify-between min-h-[300px] md:min-h-[400px] relative overflow-hidden transition-all duration-500 hover:bg-[#1e1b4b] hover:text-white">
               {/* ✅ 修正 5: 背景大字縮小至 6rem，防止撐爆版面 */}
               <span className="absolute top-[-10px] right-[-10px] text-[6rem] lg:text-[10rem] font-serif font-bold text-[#f1f5f9] opacity-50 group-hover:opacity-10 transition-opacity select-none pointer-events-none">
                 C
               </span>

               <div>
                 <span className="inline-block px-3 py-1 border border-[#94a3b8] rounded-full text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6 group-hover:border-white/30 group-hover:text-white/80 transition-colors">
                   The Head
                 </span>
                 <h3 className="text-2xl md:text-4xl font-serif font-bold mb-2 md:mb-4">基督</h3>
                 <p className="text-sm md:text-lg font-serif italic opacity-60 mb-4 md:mb-8">Christ is All & In All</p>
               </div>

               <div className="relative z-10">
                 <p className="text-[#334155] leading-loose group-hover:text-white/90 transition-colors text-justify text-sm md:text-base">
                   基督是一切，又在一切之內。祂是教會的元首，我們的高臺。我們的異象單單定睛於祂，高舉祂的名，讓祂在凡事上居首位。
                 </p>
               </div>
            </div>

            {/* 教會 (The Body) */}
            <div className="group bg-[#f8fafc] p-6 md:p-10 lg:p-16 flex flex-col justify-between min-h-[300px] md:min-h-[400px] relative overflow-hidden transition-all duration-500 hover:bg-[#f59e0b] hover:text-white">
               <span className="absolute bottom-[-10px] right-[-10px] text-[6rem] lg:text-[10rem] font-serif font-bold text-[#e2e8f0] opacity-50 group-hover:opacity-10 transition-opacity select-none pointer-events-none">
                 B
               </span>

               <div>
                 <span className="inline-block px-3 py-1 border border-[#94a3b8] rounded-full text-[10px] tracking-[0.2em] uppercase mb-4 md:mb-6 group-hover:border-white/30 group-hover:text-white/80 transition-colors">
                   The Body
                 </span>
                 <h3 className="text-2xl md:text-4xl font-serif font-bold mb-2 md:mb-4">教會</h3>
                 <p className="text-sm md:text-lg font-serif italic opacity-60 mb-4 md:mb-8">The Vessel of Glory</p>
               </div>

               <div className="relative z-10">
                 <p className="text-[#334155] leading-loose group-hover:text-white/90 transition-colors text-justify text-sm md:text-base">
                   教會是基督的身體，是那充滿萬有者所充滿的。我們是承載神榮耀的器皿，在愛中彼此建立，在真理中一同長進，彰顯神的豐盛。
                 </p>
               </div>
            </div>
          </div>
        </section>

        {/* --- Section 3: 使命區 (Mission) --- */}
        <section className="container mx-auto px-6 lg:px-12 mb-12 md:mb-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
            
            {/* 左側：標題 */}
            <div className="lg:w-1/3 w-full">
               <div className="flex items-center gap-4 mb-3 md:mb-6">
                  <div className="h-[1px] w-8 md:w-12 bg-[#b45309]"></div>
                  <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#b45309] uppercase">Our Mission</h2>
               </div>
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#1e1b4b] leading-tight mb-3 md:mb-6">
                 道成肉身的<br/>真實見證
               </h2>
               <p className="text-[#64748b] font-medium uppercase tracking-widest text-xs">
                 Witness of Incarnation
               </p>
            </div>

            {/* 右側：內容卡片 */}
            <div className="lg:w-2/3 w-full">
               {/* ✅ 修正 6: 內容卡片內距縮小至 p-6 */}
               <div className="bg-white border-l-4 border-[#b45309] p-6 md:p-12 shadow-xl shadow-slate-200/50">
                 <p className="text-lg md:text-2xl text-[#334155] leading-relaxed font-serif mb-6 md:mb-8">
                   "在生活每個場域中，活出耶穌基督道成肉身的真實見證。"
                 </p>
                 
                 <div className="flex flex-col md:flex-row gap-6 md:gap-12 pt-6 md:pt-8 border-t border-[#f1f5f9]">
                   <div>
                     <span className="block text-xs font-bold text-[#b45309] uppercase tracking-wider mb-2">WHERE</span>
                     <p className="text-[#475569] text-sm leading-relaxed">無論是在職場、家庭、學校，或是社區的每一個角落。</p>
                   </div>
                   <div>
                     <span className="block text-xs font-bold text-[#b45309] uppercase tracking-wider mb-2">HOW</span>
                     <p className="text-[#475569] text-sm leading-relaxed">讓人從我們身上看見基督的榮美，同享祂的同在。</p>
                   </div>
                 </div>
               </div>
            </div>

          </div>
        </section>

        {/* --- Section 4: 頁尾呼召 --- */}
        <section className="container mx-auto px-6 lg:px-12 mt-16 md:mt-24">
           <div className="border-t border-[#94a3b8] pt-12 md:pt-16 flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#1e1b4b] mb-4 md:mb-6">
                回應呼召，與神同行
              </h2>
              <p className="text-[#64748b] mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                異象不只是看見，更是行動。<br/>
                邀請你加入這個榮耀的行列。
              </p>
              
              <Link href="/about/gatherings/">
                <button className="bg-[#1e1b4b] text-[#fbbf24] hover:bg-[#312e81] px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-bold tracking-widest transition-colors duration-300 uppercase shadow-lg shadow-[#1e1b4b]/20">
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