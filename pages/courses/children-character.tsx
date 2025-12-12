// pages/courses/children-character.tsx
'use client';

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ChildrenCharacterCourse() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <NavBar />

      {/* ✅ 修正 1: 頂部 pt-28 (防剪裁)，底部 pb-12 (手機版緊緻) */}
      <main className="flex-grow pt-28 md:pt-40 pb-12 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* --- Section 1: 標題區 (Header) --- */}
          {/* ✅ 修正 2: 底部間距縮小 mb-8 (手機) */}
          <div className="flex flex-col items-start mb-8 md:mb-16 border-b-2 border-dashed border-[#D4C5B5] pb-8 md:pb-12">
            <div className="bg-[#1E1B4B] text-white px-3 py-1 md:px-4 md:py-1.5 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-4 md:mb-6 rounded-sm">
              Kids Character Class
            </div>
            {/* ✅ 修正 3: 手機版標題 text-3xl */}
            <h1 className="text-3xl md:text-6xl font-serif font-bold text-[#1E1B4B] mb-4 md:mb-6">
              兒童品格班
            </h1>
            {/* ✅ 修正 4: 手機版內文 text-sm */}
            <p className="text-sm md:text-lg text-[#475569] max-w-2xl leading-relaxed">
              品格的培養是個內隱的學習，是長期模仿、觀察、內化的結果。<br/>
              我們透過團體互動，協助孩子把「知道」變成「習慣」。
            </p>
          </div>

          {/* --- Section 2: Bento Grid 佈局 (核心內容) --- */}
          {/* ✅ 修正 5: 底部間距縮小 mb-12 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-20">
            
            {/* Block 1: 教學理念 */}
            {/* ✅ 修正 6: 手機版內距 p-6 */}
            <div className="md:col-span-2 bg-white border border-[#D4C5B5] p-6 md:p-10 rounded-sm flex flex-col justify-center relative overflow-hidden">
              <span className="absolute top-[-10px] right-[-10px] text-8xl md:text-9xl font-serif font-bold text-[#F7F5F2] opacity-80 pointer-events-none select-none">
                01
              </span>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1E1B4B] mb-3 md:mb-4 relative z-10">
                潛移默化的歷程
              </h3>
              <p className="text-[#475569] text-sm md:text-base leading-loose relative z-10 text-justify">
                品格不是用「教」的，而是用「薰陶」的。我們創造一個充滿正向語言與鼓勵的環境，讓孩子在遊戲與互動中，自然而然地吸收誠實、負責、尊重等核心價值。
              </p>
            </div>

            {/* Block 2: 學習焦點 (深色塊) */}
            {/* ✅ 修正 7: 手機版內距 p-6 */}
            <div className="bg-[#1E1B4B] text-white p-6 md:p-10 rounded-sm flex flex-col justify-between group hover:bg-[#312E81] transition-colors duration-500">
              <div>
                <h3 className="text-lg md:text-xl font-bold tracking-widest border-b border-white/20 pb-3 md:pb-4 mb-4">
                  CORE VALUES
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {['誠實 Honesty', '負責 Responsibility', '感恩 Gratitude', '尊重 Respect', '同理 Empathy'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 bg-[#FBBF24] rounded-full"></span>
                      <span className="text-xs md:text-sm font-medium tracking-wide opacity-90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 md:mt-8">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-[#FBBF24] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            {/* Block 3: 活動設計 */}
            {/* ✅ 修正 8: 手機版內距 p-6 */}
            <div className="bg-[#F7F5F2] border-2 border-dashed border-[#1E1B4B] p-6 md:p-10 rounded-sm flex flex-col justify-center">
              <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 md:mb-4 flex items-center gap-2">
                <span className="text-xl md:text-2xl">⚡️</span>
                活動設計
              </h3>
              <p className="text-[#475569] text-sm leading-relaxed mb-4 text-justify">
                透過 <span className="font-bold text-[#1E1B4B]">故事引導</span>、<span className="font-bold text-[#1E1B4B]">角色扮演</span> 與 <span className="font-bold text-[#1E1B4B]">合作闖關</span>，將抽象的品格概念具體化。
              </p>
              <div className="h-1 w-12 bg-[#B45309] rounded-full"></div>
            </div>

            {/* Block 4: 家庭同行 */}
            {/* ✅ 修正 9: 手機版內距 p-6，改為 flex-col (手機) */}
            <div className="md:col-span-2 bg-white border border-[#D4C5B5] p-6 md:p-10 rounded-sm flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1E1B4B] mb-3 md:mb-4">
                  家庭同行任務
                </h3>
                <p className="text-[#475569] leading-loose mb-4 text-sm md:text-base text-justify">
                  品格教育不能只停留在教室。我們會設計簡單有趣的「親子任務」與「日常小儀式」，邀請父母在家中延續課堂的感動。
                </p>
                <div className="inline-block bg-[#F0FDF4] border border-[#166534] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-[#166534] tracking-wider uppercase">
                  Home Practice
                </div>
              </div>
              <div className="shrink-0 self-center md:self-auto">
                 <svg className="w-16 h-16 md:w-24 md:h-24 text-[#D4C5B5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                 </svg>
              </div>
            </div>

          </div>

          {/* --- Section 3: 底部資訊 --- */}
          {/* ✅ 修正 10: 頂部 padding 縮小 pt-8 */}
          <div className="border-t border-[#D4C5B5] pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
            <div>
              <h3 className="text-base md:text-lg font-bold text-[#1E1B4B] mb-1 md:mb-2">準備好加入了嗎？</h3>
              <p className="text-[#64748B] text-xs md:text-sm">
                用可理解、可練習、可稱讚的語言，陪伴孩子健康成長。
              </p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <Link href="/about/gatherings" className="group w-full md:w-auto">
                <button className="w-full md:w-auto flex justify-center items-center gap-3 px-6 py-3 border border-[#1E1B4B] text-[#1E1B4B] font-bold text-xs md:text-sm tracking-widest rounded-sm group-hover:bg-[#1E1B4B] group-hover:text-white transition-all">
                  課程諮詢
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}