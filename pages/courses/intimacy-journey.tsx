// pages/courses/intimacy-journey.tsx
'use client';

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function IntimacyJourneyCourse() {
  return (
    // [配色] 全站統一米灰底色
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <NavBar />

      {/* ✅ 修正 1: 頂部間距 pt-28 (防剪裁)，底部間距 pb-12 (手機版緊緻) */}
      <main className="flex-1 pt-28 md:pt-40 pb-12 md:pb-24">
        
        {/* --- Header: 雜誌風標題 --- */}
        {/* ✅ 修正 2: 底部間距縮小 mb-8 */}
        <div className="container mx-auto px-6 lg:px-12 mb-8 md:mb-16">
          <div className="border-b border-[#D4C5B5] pb-8 md:pb-12">
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start lg:items-end justify-between">
              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   <div className="h-[1px] w-8 bg-[#B45309]"></div>
                   <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#B45309] uppercase">
                     Relationship Course
                   </span>
                </div>
                {/* ✅ 修正 3: 手機版標題 text-3xl */}
                <h1 className="text-3xl md:text-6xl font-serif font-bold text-[#1E1B4B] mb-4 md:mb-6 leading-tight">
                  親密之旅
                </h1>
                {/* ✅ 修正 4: 手機版內文 text-base */}
                <p className="text-base md:text-xl text-[#475569] leading-relaxed max-w-2xl">
                  情感智慧 <span className="text-[#B45309]">×</span> 自我成長 <span className="text-[#B45309]">×</span> 親密關係
                  <br/>
                  <span className="text-sm md:text-base mt-2 block opacity-80">
                    把臨床心理學化作日常行動，修復關係、擴大連結、建立安全與信任。
                  </span>
                </p>
              </div>

              {/* 右側：重點資訊小卡 */}
              {/* ✅ 修正 5: 手機版內距 p-5 */}
              <div className="bg-[#1E1B4B] text-white p-5 md:p-6 rounded-sm shadow-xl w-full lg:w-auto lg:min-w-[280px]">
                <p className="text-xs font-bold tracking-widest text-[#94A3B8] uppercase mb-3 md:mb-4 border-b border-white/20 pb-2">
                  Course Info
                </p>
                <div className="space-y-2 md:space-y-3 text-sm">
                  <div className="flex justify-between lg:block">
                    <span className="text-[#94A3B8] text-xs mr-4 lg:mr-0 lg:block">課程設計</span>
                    <span className="font-medium">黃維仁 博士</span>
                  </div>
                  <div className="flex justify-between lg:block">
                    <span className="text-[#94A3B8] text-xs mr-4 lg:mr-0 lg:block">上課方式</span>
                    <span className="font-medium">小班制研討 ＋ 演練</span>
                  </div>
                  <div className="flex justify-between lg:block">
                    <span className="text-[#94A3B8] text-xs mr-4 lg:mr-0 lg:block">適合對象</span>
                    <span className="font-medium">伴侶、夫妻、個人成長</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Content: 雙欄佈局 --- */}
        <div className="container mx-auto px-6 lg:px-12">
          {/* ✅ 修正 6: 手機版 Grid gap 縮小 */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* 左側：Sticky 側欄選單 */}
            <aside className="lg:col-span-4 order-2 lg:order-1">
              <div className="lg:sticky lg:top-32 space-y-6 md:space-y-8">
                
                {/* 課程宗旨 */}
                {/* ✅ 修正 7: 手機版內距 p-6 */}
                <div className="bg-white border border-[#D4C5B5] p-6 md:p-8 rounded-sm">
                  <h3 className="text-lg font-serif font-bold text-[#1E1B4B] mb-3 md:mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#1E1B4B] rounded-full"></span>
                    課程宗旨
                  </h3>
                  <p className="text-[#475569] leading-loose text-sm text-justify">
                    結合理論與實作，聚焦「與自己親、與別人親、成熟互動」，加深安全依附與情感連結，打造可持續的親密關係。
                  </p>
                </div>

                {/* 適用對象 */}
                <div className="bg-white border border-[#D4C5B5] p-6 md:p-8 rounded-sm">
                  <h3 className="text-lg font-serif font-bold text-[#1E1B4B] mb-3 md:mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#B45309] rounded-full"></span>
                    適用對象
                  </h3>
                  <ul className="space-y-2 md:space-y-3 text-sm text-[#475569]">
                    <li className="flex gap-3">
                      <span className="text-[#B45309]">✓</span> 伴侶／婚姻關係希望升級者
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#B45309]">✓</span> 渴望提升情緒覺察與溝通能力者
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#B45309]">✓</span> 親子與職場關係需要修復者
                    </li>
                  </ul>
                </div>

                {/* 費用與報名 */}
                <div className="bg-[#E5E5E5] border border-[#D4D4D8] p-6 md:p-8 rounded-sm">
                  <h3 className="text-lg font-serif font-bold text-[#1E1B4B] mb-3 md:mb-4">
                    報名資訊
                  </h3>
                  <p className="text-[#475569] text-sm mb-4 md:mb-6">
                    教材・學員手冊 <span className="font-bold text-[#1E1B4B]">240 元</span><br/>(首次上課繳交)
                  </p>
                  <div className="flex flex-col gap-3">
                    <a href="https://jtiint.org/course/outline" target="_blank" className="text-center py-3 border border-[#1E1B4B] text-[#1E1B4B] text-xs font-bold tracking-widest uppercase hover:bg-[#1E1B4B] hover:text-white transition-colors rounded-sm">
                      查看課程大綱
                    </a>
                    {/* ✅ 修改重點：按鈕改成「聯絡我們」，連結改為 Line */}
                    <a 
                      href="https://lin.ee/nQ7s6dC" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-center py-3 bg-[#B45309] text-white text-xs font-bold tracking-widest uppercase hover:bg-[#92400e] transition-colors rounded-sm"
                    >
                      聯絡我們
                    </a>
                  </div>
                </div>

              </div>
            </aside>

            {/* 右側：主要內容 */}
            <div className="lg:col-span-8 order-1 lg:order-2 space-y-10 md:space-y-16">
              
              {/* 痛點分析 */}
              <section>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1E1B4B] mb-6 md:mb-8">
                  你是否也在找答案？
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {[
                    '衝突循環總是重演，彼此愈說愈受傷？',
                    '明明在乎，卻很難說出需要與界線？',
                    '想增進親密與安全感，卻不知從何開始？',
                    '想把理論變成行動，有系統地練與改？',
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 p-5 md:p-6 bg-white border border-[#E2E8F0] rounded-sm hover:border-[#B45309] transition-colors group">
                      <span className="text-3xl md:text-4xl font-serif font-bold text-[#E2E8F0] group-hover:text-[#B45309]/20 transition-colors">
                        0{i + 1}
                      </span>
                      <p className="text-[#475569] text-sm md:text-base font-medium leading-relaxed pt-1.5 md:pt-2">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 核心能力 */}
              <section>
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                   <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1E1B4B]">三大核心能力</h2>
                   <div className="h-[1px] flex-1 bg-[#D4C5B5]"></div>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <Pillar 
                    title="與自己親 (Self Connection)" 
                    desc="覺察情緒與身體訊號 · 辨識需要與價值 · 自我安撫與調節"
                  />
                  <Pillar 
                    title="與別人親 (Social Connection)" 
                    desc="表達脆弱與需求 · 建立信任與連結 · 形成安全依附"
                  />
                  <Pillar 
                    title="成熟互動 (Mature Interaction)" 
                    desc="分化與界線 · 衝突協商與修復 · 雙贏對話"
                  />
                </div>
              </section>

              {/* 學習方法 */}
              {/* ✅ 修正 8: 手機版內距 p-6 */}
              <section className="bg-[#1E1B4B] text-white p-6 md:p-12 rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <h3 className="text-lg md:text-xl font-serif font-bold mb-6 md:mb-8 relative z-10">
                  學習方法：小組教練式
                </h3>
                <ol className="space-y-4 md:space-y-6 relative z-10">
                  {[
                    '短講 × 示範：以臨床框架快速建立共同語言',
                    '分組演練：把理論變成具體句型與身體動作',
                    '教練回饋：即時調整，避免錯誤練習固化',
                    '家中作業：每週微行動，持續建立新連結',
                  ].map((step, idx) => (
                    <li key={idx} className="flex gap-3 md:gap-4 items-start">
                      <span className="shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full border border-[#B45309] text-[#B45309] flex items-center justify-center text-[10px] md:text-xs font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-[#CBD5E1] text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* 常見問題 FAQ */}
              <section>
                <h3 className="text-xl font-serif font-bold text-[#1E1B4B] mb-4 md:mb-6">常見問題</h3>
                <div className="border-t border-[#D4C5B5]">
                  <FAQItem q="沒有伴侶可以參加嗎？" a="可以。單身、交往、已婚皆適合；若能與重要他人一同參與，成效更佳。" />
                  <FAQItem q="需要額外購買教材嗎？" a="不需要，教材與學員手冊已包含在費用內（240 元）。" />
                  <FAQItem q="缺席一次怎麼辦？" a="可與小組長討論補課：重點回顧、指定閱讀或短時段補練習。" />
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

/* --- Components --- */

function Pillar({ title, desc }: { title: string, desc: string }) {
  return (
    // ✅ 修正 9: 手機版內距 p-5
    <div className="group bg-white border border-[#D4C5B5] p-5 md:p-6 rounded-sm hover:shadow-lg hover:border-[#1E1B4B] transition-all duration-300">
      <h4 className="text-base md:text-lg font-bold text-[#1E1B4B] mb-1.5 md:mb-2 group-hover:text-[#B45309] transition-colors">
        {title}
      </h4>
      <p className="text-[#64748B] text-sm leading-relaxed">
        {desc}
      </p>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-[#D4C5B5]">
      <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-4 md:py-5 text-[#1E1B4B] hover:text-[#B45309] transition-colors text-sm md:text-base">
        <span>{q}</span>
        <span className="transition group-open:rotate-180">
          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
        </span>
      </summary>
      <p className="text-[#475569] text-sm leading-loose mt-0 mb-4 md:mb-6 pl-4 border-l-2 border-[#B45309]">
        {a}
      </p>
    </details>
  )
}