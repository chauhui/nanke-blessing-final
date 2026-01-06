// pages/courses/financial-wisdom.tsx
'use client';

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function FinancialWisdomCourse() {
  return (
    // [配色] Cool Slate (#F0F4F8) + Emerald (#0F766E)
    <div className="min-h-screen flex flex-col bg-[#F0F4F8] text-[#1E1B4B] font-sans selection:bg-[#CCFBF1] selection:text-[#0F766E]">
      <NavBar />

      {/* ✅ 修正 1: 頂部 pt-28 (防剪裁)，底部 pb-12 (手機版緊緻) */}
      <main className="flex-1 pt-28 md:pt-40 pb-12 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* --- Header: 標題區 --- */}
          {/* ✅ 修正 2: 底部間距縮小 mb-8 */}
          <div className="border-b border-slate-300 pb-8 md:pb-10 mb-8 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   {/* 裝飾線 */}
                   <div className="h-[1px] w-8 bg-[#0F766E]"></div>
                   <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#0F766E] uppercase">
                     Biblical Finance
                   </span>
                </div>
                {/* ✅ 修正 3: 手機版標題 text-3xl */}
                <h1 className="text-3xl md:text-6xl font-serif font-bold text-[#1E1B4B] leading-tight">
                  理財有道
                </h1>
              </div>
              
              <div className="max-w-xl text-left md:text-right">
                {/* ✅ 修正 4: 手機版內文 text-sm */}
                <p className="text-[#475569] font-medium leading-relaxed text-sm md:text-base">
                  讓財務成為祝福的管道。<br/>
                  從<span className="text-[#0F766E] font-bold mx-1 border-b border-[#0F766E] pb-0.5">聖經原則</span>看金錢管理，建立忠心管家的生命。
                </p>
              </div>
            </div>
          </div>

          {/* --- Main Content --- */}
          {/* ✅ 修正 5: 手機版 gap-8 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* 左側內容 */}
            <div className="lg:col-span-7 space-y-8 md:space-y-10">
              
              {/* 痛點引導 */}
              {/* ✅ 修正 6: 手機版內距 p-6 */}
              <div className="bg-white border-l-4 border-[#0F766E] p-6 md:p-8 rounded-sm shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-[#1E1B4B] mb-4 md:mb-6 flex items-center gap-2">
                  <span className="text-[#0F766E] text-xl md:text-2xl">?</span>
                  你有以下財務的問題嗎？
                </h3>
                <ul className="space-y-3 md:space-y-4 text-[#475569] text-sm md:text-base">
                  {[
                    '明明工作好多年，卻總是無法存下任何積蓄？',
                    '每個月總有繳不完的帳單（房貸、車貸、學貸、信貸）',
                    '該如何終止這樣的惡性循環？',
                    '已經負債累累了，該如何有智慧的償還？',
                    '要如何準備應急基金、結婚基金、教育基金、退休基金？'
                  ].map((q, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <svg className="w-5 h-5 text-[#0F766E]/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 聖經觀點 */}
              {/* ✅ 修正 7: 手機版內距 p-6 */}
              <div className="bg-[#1E1B4B] text-white p-6 md:p-8 rounded-sm text-center shadow-lg shadow-[#1E1B4B]/10">
                <p className="font-serif text-base md:text-lg leading-relaxed">
                  " 很多人不知道，聖經提到金錢與財務的經文多達數千次；<br className="hidden md:block"/>
                  在聖經裡有你需要的原則與幫助。"
                </p>
              </div>

              {/* 課程詳細資訊 */}
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {/* 主題 */}
                <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-sm hover:border-[#0F766E] transition-colors duration-300">
                  <h4 className="text-[#0F766E] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 md:mb-3">Topic</h4>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 md:mb-4">課程主題</h3>
                  <p className="text-[#475569] text-sm leading-loose text-justify">
                    神的角色與我們的角色、債務處理、誠實原則、奉獻意義、工作觀、投資智慧、永恆視角。
                  </p>
                </div>

                {/* 目標 */}
                <div className="bg-white border border-slate-200 p-5 md:p-6 rounded-sm hover:border-[#0F766E] transition-colors duration-300">
                  <h4 className="text-[#0F766E] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 md:mb-3">Goal</h4>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 md:mb-4">課程目標</h3>
                  <p className="text-[#475569] text-sm leading-loose text-justify">
                    財務得自由，不再被金錢綑綁。建立知足、慷慨、忠心與誠實的管家生命。
                  </p>
                </div>

                {/* 特色 */}
                <div className="md:col-span-2 bg-[#E0F2FE] p-5 md:p-6 rounded-sm border border-slate-200">
                  <h4 className="text-[#0369A1] font-bold tracking-widest uppercase text-[10px] md:text-xs mb-2 md:mb-3">Features</h4>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#0C4A6E] mb-3 md:mb-4">課程特色</h3>
                  <ul className="grid sm:grid-cols-2 gap-y-2 md:gap-y-3 gap-x-4 text-sm text-[#334155]">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0369A1] rounded-full"></span>連續八週小組研討</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0369A1] rounded-full"></span>聖經原則 × 真實見證</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0369A1] rounded-full"></span>逐週實作預算計畫</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0369A1] rounded-full"></span>建立個人財務帳本</li>
                  </ul>
                </div>
              </div>

            </div>

            {/* 右側：書籍與報名 */}
            <div className="lg:col-span-5 space-y-8 md:space-y-10 lg:sticky lg:top-32">
              
              <div className="relative flex justify-center py-4 md:py-8">
                {/* 背景光暈 */}
                <div className="absolute inset-0 bg-white rounded-full scale-90 blur-3xl opacity-60 -z-10"></div>
                <div className="relative transform scale-90 md:scale-100">
                   <img
                    src="/images/bfs-handbook.png"
                    alt="小組員手冊"
                    className="w-40 md:w-48 shadow-2xl rounded-sm rotate-[-3deg] z-10 relative hover:rotate-0 transition-transform duration-500"
                  />
                  <img
                    src="/images/your-money-counts.png"
                    alt="理財贏家"
                    className="w-32 md:w-40 shadow-xl rounded-sm rotate-[5deg] absolute bottom-[-10px] md:bottom-[-20px] right-[-20px] md:right-[-30px] z-0"
                  />
                </div>
              </div>

              {/* 報名資訊卡 */}
              {/* ✅ 修正 8: 手機版內距 p-6 */}
              <div className="bg-white border-t-4 border-[#0F766E] p-6 md:p-8 rounded-sm shadow-xl shadow-slate-200">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1E1B4B] mb-4 md:mb-6">
                  上課資訊
                </h3>
                
                <div className="space-y-4 md:space-y-6 text-sm">
                  <div>
                    <span className="block text-[#94A3B8] text-[10px] md:text-xs uppercase tracking-wider mb-1">Fee</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl md:text-2xl font-bold text-[#0F766E]">NT$ 1,500</span>
                      <span className="text-[#64748B] text-xs md:text-sm">(含兩本教材)</span>
                    </div>
                  </div>

                  <div className="w-full h-[1px] bg-slate-100"></div>

                  <div>
                    <span className="block text-[#94A3B8] text-[10px] md:text-xs uppercase tracking-wider mb-1">Format</span>
                    <span className="font-medium text-[#475569]">採 8–12 人精緻小班制（小組研討）</span>
                  </div>

                  <div>
                    <span className="block text-[#94A3B8] text-[10px] md:text-xs uppercase tracking-wider mb-1">Contact</span>
                    <span className="font-medium text-[#475569]">
                      請洽服務台或致電教會
                    </span>
                  </div>
                </div>

                <div className="mt-6 md:mt-8">
                  {/* ✅ 修改重點：按鈕改成「聯絡我們」，連結改為 Line */}
                  <a 
                    href="https://lin.ee/nQ7s6dC" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 md:py-4 bg-[#1E1B4B] text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#0F766E] transition-colors shadow-lg"
                  >
                    聯絡我們
                  </a>
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