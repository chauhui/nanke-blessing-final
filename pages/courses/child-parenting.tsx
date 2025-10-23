// pages/courses/child-parenting.tsx

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ChildParentingCourse() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Banner 區塊 */}
      <div className="relative pt-32 md:pt-48 pb-12 bg-gradient-to-r from-[#ffdfad] via-[#e2ffe2] to-[#c9d7fc] flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
          如何教養孩童
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center">
          以愛與智慧建立穩固的親子關係，結合信仰原則、實務經驗和互動活動，陪伴孩子快樂成長。
        </p>
      </div>

      {/* 重新設計之主區塊（參考各大教會/非營利網站的資訊模組排版） */}
      <main className="flex-grow bg-gradient-to-b from-rose-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <section className="relative max-w-6xl mx-auto">
            {/* 外圈柔光 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-rose-200/60 via-amber-100/60 to-sky-200/60 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-[1.75rem] bg-white/90 shadow-xl ring-1 ring-black/5">
              {/* 左側色帶與裝飾圓片 */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-rose-400 to-sky-400" />
              <div className="absolute -left-3 top-10 h-6 w-6 rounded-r-2xl bg-rose-300/70" />
              <div className="absolute -left-3 top-24 h-6 w-6 rounded-r-2xl bg-sky-300/70" />

              <div className="p-7 sm:p-10 md:p-14">
                {/* 標題列 */}
                <div className="mb-8">
                  <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900">
                    教養願景與核心提醒
                  </h2>
                  <p className="mt-2 text-gray-600">
                    用更直覺的閱讀節奏，把經文主旨與落地行動放在同一視野中。
                  </p>
                </div>

                {/* 兩欄排版：左經文卡 / 右重點與補充區 */}
                <div className="grid gap-8 md:grid-cols-12">
                  {/* 左：經文卡（重視排印與可讀性） */}
                  <div className="md:col-span-7">
                    <div className="relative rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/70 ring-1 ring-rose-200 px-8 py-10 md:px-10 md:py-12">
                      {/* 引號裝飾 */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="absolute -top-4 -left-3 h-10 w-10 text-rose-300"
                        fill="currentColor"
                      >
                        <path d="M7.17 6.17A5.5 5.5 0 0 0 2 11.5 5.5 5.5 0 0 0 7.5 17c.55 0 1.08-.08 1.58-.24A4.5 4.5 0 0 1 5 13h2.5A4.5 4.5 0 0 0 12 8.5C12 6.02 9.98 4 7.5 4c-.12 0-.23 0-.33.02zM18.84 6.17A5.5 5.5 0 0 0 13.67 11.5 5.5 5.5 0 0 0 19.17 17c.55 0 1.08-.08 1.58-.24A4.5 4.5 0 0 1 16.67 13h2.5A4.5 4.5 0 0 0 23.17 8.5C23.17 6.02 21.15 4 18.67 4c-.12 0-.23 0-.33.02z" />
                      </svg>

                      <div className="text-center">
                        <h3 className="text-3xl md:text-[2.3rem] leading-tight font-black tracking-wide text-[#4a2f2b]">
                          教養孩童 使他走當行的道
                          <br className="hidden md:block" />
                          就是到老 他也不偏離
                        </h3>
                        <p className="mt-4 text-lg md:text-xl font-semibold text-[#5b3a35]">
                          箴言 22:6
                        </p>
                      </div>

                      {/* 細分導讀 */}
                      <div className="mt-8 grid gap-4">
                        <div className="rounded-xl bg-white/60 backdrop-blur px-5 py-3 ring-1 ring-black/5">
                          <p className="text-gray-800">
                            以經文為根基，釐清「當行之道」——價值次序與界線建立。
                          </p>
                        </div>
                        <div className="rounded-xl bg-white/60 backdrop-blur px-5 py-3 ring-1 ring-black/5">
                          <p className="text-gray-800">
                            以同行為核心，在日常裡練習看見、陪伴與引導。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 右：落地行動與重點泡泡 */}
                  <div className="md:col-span-5 flex flex-col gap-6">
                    <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-black/5 p-6">
                      <p className="text-sm font-semibold text-sky-600 mb-3">三個落地行動</p>
                      <ul className="space-y-3 text-gray-800 leading-relaxed">
                        <li className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-rose-400" />
                          利用聖經的教導引導父母，建立一致的教養語言
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-sky-400" />
                          有智慧地帶領孩子：覺察情緒、設定界線、合作解方
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                          使父母的教養更輕省：把握關鍵少而精的日常儀式
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-rose-300 via-amber-300 to-sky-300">
                      <div className="rounded-2xl bg-white/80 backdrop-blur px-5 py-4 ring-1 ring-black/5">
                        <p className="font-semibold text-gray-900">
                          想更了解？歡迎聯繫教會，我們樂意與您一同規劃合宜的教養步驟。
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          主日可至服務台洽詢，或透過教會聯絡方式與同工對談。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部柔光條 */}
              <div aria-hidden="true" className="h-3 w-full bg-gradient-to-r from-rose-200 via-amber-200 to-sky-200" />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
