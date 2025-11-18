// pages/courses/financial-wisdom.tsx
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function FinancialWisdomCourse() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a2535]">
      <NavBar />

      {/* Hero / Title Bar（深藍） */}
      <header className="pt-28 md:pt-40 pb-8 md:pb-10 bg-[#0a2535]">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">理財有道</h1>
          <p className="mt-3 md:mt-4 text-white/85 text-base md:text-lg">
            從聖經看金錢與管理，讓財務成為祝福家庭、職場與教會的管道。
          </p>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-b from-[#0a2535] via-[#0a2535] to-[#0a2535]">
        {/* 主內容區：DM 版面 */}
        <section className="container mx-auto px-4 py-10 md:py-14">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 左：問題引導 + 說明（仿 DM 左半） */}
            <div className="lg:col-span-7">
              {/* 問題引導卡 */}
              <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 px-6 md:px-8 py-6 md:py-7 backdrop-blur">
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-100/90 text-rose-700 px-4 py-1.5 text-sm font-semibold">
                  你有以下財務的問題嗎？
                </div>

                <ul className="mt-5 space-y-3 text-[15px] md:text-[16px] leading-relaxed text-white/90">
                  <li>💬 「明明工作好多年，卻總是無法存下任何積蓄？」</li>
                  <li>💬 「每個月總有繳不完的帳單（房貸、車貸、學貸、信貸）」</li>
                  <li>💬 「該如何終止這樣的惡性循環？」</li>
                  <li>💬 「已經負債累累了，該如何有智慧的償還？」</li>
                  <li>💬 「要如何準備應急基金、結婚基金、教育基金、退休基金？」</li>
                </ul>
              </div>

              {/* 中段宣告（黃色強調） */}
              <div className="mt-8 rounded-2xl bg-amber-300/90 px-6 md:px-8 py-6 shadow-lg">
                <p className="text-[#0a2535] font-bold text-lg md:text-xl tracking-wide">
                  很多人不知道，聖經提到金錢與財務的經文多達數千次；<br className="hidden md:block" />
                  在聖經裡有你需要的原則與幫助。
                </p>
              </div>

              {/* 課程主題 / 目標 / 特色 / 費用（仿 DM 區塊） */}
              <div className="mt-10 grid gap-8">
                {/* 課程主題 */}
                <section className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
                  <h2 className="text-amber-300 text-xl md:text-2xl font-extrabold">課程主題</h2>
                  <div className="mt-4 text-white/90 leading-[1.9]">
                    <p>
                      認識：神的角色／我們的角色、債務、誠實、誠實・奉獻、工作、投資、觀念、永生。
                    </p>
                  </div>
                </section>

                {/* 課程目標 */}
                <section className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
                  <h2 className="text-amber-300 text-xl md:text-2xl font-extrabold">課程目標</h2>
                  <div className="mt-4 text-white/90">
                    <p>財務得自由，建立知足、慷慨、忠心與誠實的管家生命。</p>
                  </div>
                </section>

                {/* 課程特色 */}
                <section className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-7">
                  <h2 className="text-amber-300 text-xl md:text-2xl font-extrabold">課程特色</h2>
                  <ul className="mt-4 space-y-2 text-white/90 leading-relaxed list-decimal list-inside">
                    <li>連續八週之小組研討，彼此互動與陪伴。</li>
                    <li>逐週實作作業，建立可執行的預算與償債計畫。</li>
                    <li>聖經原則 × 真實見證 × 小型教練回饋。</li>
                    <li>課程中將協助整理個人財務觀與財務帳本。</li>
                  </ul>
                </section>

                {/* 課程費用（可依 DM 顏色） */}
                <section className="rounded-2xl bg-amber-300/95 text-[#0a2535] p-6 md:p-7 shadow-md">
                  <h2 className="text-xl md:text-2xl font-extrabold">課程費用</h2>
                  <p className="mt-3 font-semibold">1500 元</p>
                  <p className="mt-1 text-[15px] opacity-90">
                    內含：理財有道小組員手冊一本、理財贏家一本。
                  </p>
                </section>
              </div>
            </div>

            {/* 右：書籍 + 上課資訊（仿 DM 右半） */}
            <div className="lg:col-span-5">
              {/* 書籍視覺 */}
              <div className="relative max-w-sm mx-auto">
                <img
                  src="/images/bfs-handbook.png"
                  alt="小組員手冊：Biblical Financial Study"
                  className="w-72 md:w-80 rounded-2xl shadow-2xl rotate-[-6deg] translate-x-3 translate-y-2"
                />
                <img
                  src="/images/your-money-counts.png"
                  alt="理財贏家：Your Money Counts"
                  className="absolute -bottom-10 -right-6 w-56 md:w-64 rounded-2xl shadow-2xl rotate-[8deg]"
                />
              </div>

              {/* 上課資訊卡（移除報名按鈕） */}
              <div className="mt-14 rounded-3xl bg-white/95 text-[#0a2535] shadow-xl ring-1 ring-black/5 overflow-hidden">
                <div className="bg-amber-300/95 px-6 py-4">
                  <h3 className="text-xl md:text-2xl font-extrabold">上課資訊</h3>
                </div>
                <div className="p-6 md:p-7 space-y-6">
                  <div>
                    <div className="text-sm font-semibold text-[#0a2535]/80">上課方式</div>
                    <div className="mt-1 font-bold">採 8–12 人精緻小班制（小組研討）</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0a2535]/80">上課日期時間</div>
                    <div className="mt-1 font-bold">開課與時段依教會公告為準（請見行事曆）</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0a2535]/80">上課地點</div>
                    <div className="mt-1 font-bold">教會指定教室（報名後通知）</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0a2535]/80">聯絡資訊</div>
                    <div className="mt-1 text-[15px]">
                      主日可至服務台洽詢，或透過教會聯絡方式與我們聯繫。
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部 DM 風格標語 */}
              <div className="mt-6 text-center">
                <span className="inline-block rounded-full bg-white/10 ring-1 ring-white/10 text-white/85 px-4 py-2 text-sm">
                  歡迎報名，一起做財務的主人
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
