// pages/courses/child-parenting.tsx
'use client';

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ChildParentingCourse() {
  return (
    // [配色] 全站統一基底
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <NavBar />

      {/* ✅ 修正 1: 頂部 pt-28 (防剪裁)，底部 pb-12 */}
      <main className="flex-grow pt-28 md:pt-40 pb-12 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12">
          
          {/* --- Section 1: 標題區 (Header) --- */}
          {/* ✅ 修正 2: 改為標準的 "左標題 + 右敘述" 佈局，不再置中 */}
          <div className="border-b border-[#D4C5B5] pb-8 md:pb-10 mb-8 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   <div className="h-[1px] w-8 bg-[#B45309]"></div>
                   <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#B45309] uppercase">
                     Biblical Parenting
                   </span>
                </div>
                {/* ✅ 修正 3: 手機版標題 text-3xl */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-[#1E1B4B] leading-tight">
                  如何教養孩童
                </h1>
              </div>
              
              <div className="max-w-xl text-left md:text-right">
                {/* ✅ 修正 4: 將經文整合在此，風格更統一 */}
                <p className="text-[#475569] font-medium leading-relaxed text-sm md:text-base">
                  教養孩童，使他走當行的道，<br className="hidden md:block"/>
                  就是到老，他也不偏離。
                </p>
                <p className="text-[#B45309] text-xs font-bold tracking-widest mt-2 uppercase">
                  — 箴言 22:6
                </p>
              </div>
            </div>
          </div>

          {/* --- Section 2: 課程三大支柱 --- */}
          {/* ✅ 修正 5: 底部間距縮小 mb-12 */}
          <div className="mb-12 md:mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              
              {/* Card 01 */}
              {/* ✅ 修正 6: 手機版內距 p-6 */}
              <div className="group bg-white border-t-4 border-[#1E1B4B] p-6 md:p-8 hover:shadow-xl transition-all duration-500">
                <div className="mb-4 md:mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#1E1B4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[#1E1B4B] mb-2 md:mb-3 group-hover:text-[#B45309] transition-colors">
                  神話語為準則
                </h3>
                <p className="text-[#475569] leading-relaxed text-sm text-justify">
                  世界有一百種教養流行，但真理只有一個。我們帶領父母回到聖經，重新對齊教養的方向與標準。
                </p>
              </div>

              {/* Card 02 */}
              <div className="group bg-white border-t-4 border-[#B45309] p-6 md:p-8 hover:shadow-xl transition-all duration-500">
                <div className="mb-4 md:mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#B45309]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[#1E1B4B] mb-2 md:mb-3 group-hover:text-[#B45309] transition-colors">
                  智慧的陪伴
                </h3>
                <p className="text-[#475569] leading-relaxed text-sm text-justify">
                  不只看孩子的行為，更要讀懂孩子的心。學習在愛中設立界線，在管教中建立親密關係。
                </p>
              </div>

              {/* Card 03 */}
              <div className="group bg-white border-t-4 border-[#94A3B8] p-6 md:p-8 hover:shadow-xl transition-all duration-500">
                <div className="mb-4 md:mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-[#94A3B8] group-hover:text-[#1E1B4B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                </div>
                <h3 className="text-lg md:text-xl font-bold font-serif text-[#1E1B4B] mb-2 md:mb-3 group-hover:text-[#B45309] transition-colors">
                  祝福的起點
                </h3>
                <p className="text-[#475569] leading-relaxed text-sm text-justify">
                  把重擔交託給主，在教會群體中彼此扶持。讓家庭不再是戰場，而是承受恩典與祝福的起點。
                </p>
              </div>

            </div>
          </div>

          {/* --- Section 3: 底部呼召 (Wide Banner) --- */}
          {/* ✅ 修正 7: 手機版內距 p-8，文字大小調整 */}
          <div className="relative bg-[#1E1B4B] text-white rounded-sm overflow-hidden p-8 md:p-16 text-center">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#B45309]/20 rounded-full translate-x-1/3 translate-y-1/3"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-serif font-bold mb-4 md:mb-6">
                在恩典與真理中，<br/>陪孩子一起長大
              </h2>
              <p className="text-[#94A3B8] text-sm md:text-base mb-8 md:mb-10 leading-relaxed">
                歡迎所有關心下一代的父母、預備成為父母的夫妻。<br/>
                讓我們一起學習，讓神的話語成為我們家的房角石。
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/about/gatherings">
                  <button className="w-full sm:w-auto px-8 py-3 bg-[#FBBF24] text-[#1E1B4B] font-bold tracking-widest text-sm rounded-sm hover:bg-white transition-colors">
                    了解聚會資訊
                  </button>
                </Link>
                <div className="w-full sm:w-auto px-8 py-3 border border-[#94A3B8] text-[#94A3B8] text-sm tracking-widest rounded-sm">
                  洽詢電話：06-5834626
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