// pages/courses/financial-wisdom.tsx

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function FinancialWisdomCourse() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero / Banner */}
      <div className="relative pt-32 md:pt-44 pb-14 md:pb-20 bg-gradient-to-r from-[#fff4c6] via-[#d3e5ff] to-[#c6ffd9]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            理財有道
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            從聖經看金錢與管理：把「財務」變成祝福家庭、職場與教會的管道。
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gradient-to-b from-amber-50 via-white to-sky-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* 主視覺：標語＋書籍 */}
          <section className="relative max-w-6xl mx-auto">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-amber-200/60 via-emerald-100/60 to-sky-200/60 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-white/90 shadow-xl ring-1 ring-black/5">
              {/* 左側色帶 */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-amber-400 to-sky-400" />

              <div className="p-7 sm:p-10 md:p-14">
                <div className="grid gap-10 md:grid-cols-12 items-start">
                  {/* 左：標語與說明 */}
                  <div className="md:col-span-7">
                    <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 ring-1 ring-amber-200 px-6 py-8 md:px-8 md:py-10">
                      <h2 className="text-3xl md:text-[2.3rem] font-black leading-tight tracking-wide text-[#5a2a2a]">
                        錢，是工具，不是主宰
                      </h2>
                      <p className="mt-6 text-gray-800 leading-relaxed text-lg">
                        本課程帶你從聖經的智慧出發，重新認識金錢的角色，學會知足與自律，做金錢的好管家，
                        而非它的奴僕。明白我們真正的身份是神所託付的管家、地上的忠心，將帶來天上的祝福與價值。
                      </p>
                    </div>

                    {/* 三大收穫 */}
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/60 p-5 ring-1 ring-amber-200">
                        <p className="text-sm font-semibold text-amber-700">價值觀</p>
                        <p className="mt-1 font-bold text-gray-900">金錢觀更新</p>
                        <p className="mt-1 text-sm text-gray-700">建立知足、慷慨與忠心的管家思維。</p>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/60 p-5 ring-1 ring-sky-200">
                        <p className="text-sm font-semibold text-sky-700">實務力</p>
                        <p className="mt-1 font-bold text-gray-900">預算 × 債務 × 儲蓄</p>
                        <p className="mt-1 text-sm text-gray-700">學會計畫、清債、存款與初階投資。</p>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-5 ring-1 ring-emerald-200">
                        <p className="text-sm font-semibold text-emerald-700">關係力</p>
                        <p className="mt-1 font-bold text-gray-900">家庭財務合一</p>
                        <p className="mt-1 text-sm text-gray-700">夫妻溝通協調，讓金錢不再成為衝突源。</p>
                      </div>
                    </div>
                  </div>

                  {/* 右：書籍視覺 */}
                  <div className="md:col-span-5">
                    <div className="relative mx-auto max-w-sm">
                      <img
                        src="/images/bfs-handbook.png"
                        alt="小組員手冊：Biblical Financial Study"
                        className="w-72 md:w-80 rounded-2xl shadow-2xl rotate-[-6deg] translate-x-3 translate-y-2"
                      />
                      <img
                        src="/images/your-money-counts.png"
                        alt="理財贏家：Your Money Counts"
                        className="absolute -bottom-8 -right-6 w-52 md:w-60 rounded-2xl shadow-2xl rotate-[8deg]"
                      />
                      <div
                        aria-hidden
                        className="absolute -inset-6 rounded-[2rem] blur-2xl bg-gradient-to-tr from-amber-200/50 via-rose-200/50 to-sky-200/50 -z-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div aria-hidden className="h-3 w-full bg-gradient-to-r from-amber-200 via-emerald-200 to-sky-200" />
            </div>
          </section>

          {/* 聯繫教會（全新設計：緊湊資訊卡） */}
          <section className="relative max-w-5xl mx-auto mt-12">
            <div className="relative rounded-2xl bg-white/90 ring-1 ring-black/5 shadow-md">
              {/* 細彩帶 */}
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400" />
              <div className="px-5 py-6 md:px-8 md:py-7">
                <div className="flex items-start gap-4">
                  {/* 小圖標圓片 */}
                  <div className="shrink-0 h-11 w-11 rounded-full bg-gradient-to-br from-amber-200 to-sky-200 grid place-items-center ring-1 ring-black/5">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-amber-800"
                    >
                      <path d="M7 8a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5H9l-3.2 2.4A1 1 0 0 1 4 16.6V14A6 6 0 0 1 7 8Z" />
                    </svg>
                  </div>

                  {/* 文案 */}
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">
                      歡迎聯繫教會了解更多資訊
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      可於主日後至服務台洽詢，或透過教會聯絡方式與我們對談。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 底部淡彩陰影 */}
            <div
              aria-hidden
              className="mx-auto mt-3 h-1.5 w-44 rounded-full bg-gradient-to-r from-amber-200 via-rose-200 to-sky-200 blur-[1px]"
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
