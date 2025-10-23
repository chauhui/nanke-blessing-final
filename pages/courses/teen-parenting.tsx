// pages/courses/teen-parenting.tsx

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function TeenParentingCourse() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* 頁首 Banner */}
      <div className="relative pt-32 md:pt-44 pb-14 md:pb-20 bg-gradient-to-r from-pink-200 via-orange-100 to-sky-100">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">
            如何教養青少年
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            幫助家長建立與青少年溝通的橋樑，從聖經角度、專業諮商與實務經驗，一同面對孩子成長過程的挑戰與祝福！
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gradient-to-b from-pink-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* ——「課程內容」主區塊（維持原風格與左右編排） —— */}
          <section className="relative max-w-5xl mx-auto">
            {/* 背景裝飾 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-rose-200/60 via-fuchsia-100/60 to-sky-200/60 blur-xl"
            />
            <div className="relative rounded-[1.75rem] bg-white/90 shadow-xl ring-1 ring-black/5 overflow-hidden">
              {/* 左側色帶與圓角扣 */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-rose-400 to-sky-400" />
              <div className="absolute -left-3 top-10 h-6 w-6 rounded-r-2xl bg-rose-300/70" />
              <div className="absolute -left-3 top-24 h-6 w-6 rounded-r-2xl bg-sky-300/70" />

              <div className="p-7 sm:p-10 md:p-14">
                {/* 標題 */}
                <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
                  青春期關係如何轉變？
                </h2>

                {/* 左：焦點卡；右：說明文字 */}
                <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
                  {/* 焦點提示卡（左） */}
                  <div className="md:col-span-5">
                    <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-sky-50 p-6 ring-1 ring-black/5">
                      <p className="text-sm font-semibold text-rose-500 mb-2">課程焦點</p>
                      <ul className="space-y-3 text-gray-700 leading-relaxed">
                        <li className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" />
                          運用聖經的智慧，理解孩子的內在需要
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                          學習正確的溝通與引導方式
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                          建立信任、同行成長的親子關係
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* 說明文字（右） */}
                  <div className="md:col-span-7">
                    <div className="prose prose-lg max-w-none">
                      <p className="leading-relaxed text-gray-800">
                        課程中運用聖經的智慧，幫助父母了解孩子的內在需要，
                        學習正確的溝通與引導方式，建立信任、同行成長。
                        讓您不只是「教」，更能「陪」，孩子走過關鍵轉變期。
                      </p>
                    </div>

                    {/* —— 重新設計的資訊膠囊（取代原按鈕） —— */}
                    <div className="mt-8">
                      {/* 外層漸層描邊 */}
                      <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-rose-300 via-amber-300 to-sky-300 shadow-sm">
                        {/* 內層玻璃卡 */}
                        <div className="rounded-2xl bg-white/80 backdrop-blur px-5 py-4 ring-1 ring-black/5">
                          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                            {/* 圖標圓片 */}
                            <div className="shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 ring-1 ring-black/5 grid place-items-center">
                              {/* chat/phone icon */}
                              <svg
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 text-rose-600"
                              >
                                <path d="M7 8a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5H9l-3.2 2.4A1 1 0 0 1 4 16.6V14A6 6 0 0 1 7 8Zm3.5 8.5a1 1 0 0 1 1.12-.22 9.8 9.8 0 0 0 3.88.78c.7 0 1.37-.07 2-.22a1 1 0 0 1 1.2.71l.61 2.16a1 1 0 0 1-.67 1.22A12.8 12.8 0 0 1 12 22c-2.05 0-3.98-.47-5.66-1.32a1 1 0 0 1-.54-1.14l.49-2.2a1 1 0 0 1 1.44-.67 10.9 10.9 0 0 0 2.77 1.03 1 1 0 0 0 1-.2Z" />
                              </svg>
                            </div>

                            {/* 文字內容 */}
                            <div className="text-center sm:text-left">
                              <p className="font-semibold text-gray-900 tracking-wide">
                                歡迎聯繫教會了解更多資訊
                              </p>
                              <p className="text-sm text-gray-600">
                                可於主日後至服務台洽詢，或透過教會聯絡方式與我們對談。
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* 裝飾下陰影 */}
                      <div aria-hidden className="mx-auto mt-2 h-1 w-40 rounded-full bg-gradient-to-r from-rose-200 via-amber-200 to-sky-200 blur-[2px]" />
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
