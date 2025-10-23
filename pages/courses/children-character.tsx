// pages/courses/children-character.tsx

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ChildrenCharacterCourse() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Banner 區塊：確保不被 NavBar 擋住 */}
      <div className="relative pt-32 md:pt-48 pb-16 md:pb-24 bg-gradient-to-r from-[#fef6d7] via-[#e2f6ff] to-[#ffd6ea]">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            兒童品格班
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            品格教育扎根生命，結合故事、遊戲與團體互動，培養孩子正向價值與好習慣，陪伴他們健康成長。
          </p>
        </div>
      </div>

      {/* 主內容（參考其他網站的資訊模組編排） */}
      <main className="flex-grow bg-gradient-to-b from-rose-50 via-white to-sky-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <section className="relative max-w-6xl mx-auto">
            {/* 柔光外圈 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-rose-200/60 via-amber-100/60 to-sky-200/60 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-white/90 shadow-xl ring-1 ring-black/5">
              {/* 左側色帶 */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-rose-400 to-sky-400" />

              <div className="p-7 sm:p-10 md:p-14">
                {/* 兩欄：左經文式主題/右重點說明 */}
                <div className="grid gap-10 md:grid-cols-12 items-start">
                  {/* 左：主題文字（依照片語氣整理） */}
                  <div className="md:col-span-7">
                    <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/70 ring-1 ring-rose-200 px-6 py-8 md:px-8 md:py-10">
                      <h2 className="text-2xl md:text-[2.2rem] font-black leading-tight tracking-wide text-[#5a2a2a]">
                        培養基品格教育系列
                      </h2>
                      <ul className="mt-6 space-y-4 text-lg md:text-xl text-[#5b3a35] leading-relaxed">
                        <li>品格的培養是個內隱的學習</li>
                        <li>是長期模仿、觀察、內化的結果</li>
                        <li>是個潛移默化的歷程</li>
                        <li>為美好的人生建立品格的基礎</li>
                      </ul>
                    </div>
                  </div>

                  {/* 右：學習焦點卡與簡要綱要 */}
                  <div className="md:col-span-5 flex flex-col gap-6">
                    <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-black/5 p-6">
                      <p className="text-sm font-semibold text-sky-700">學習焦點</p>
                      <ul className="mt-3 space-y-3 text-gray-800 leading-relaxed">
                        <li className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-rose-400" />
                          核心品格：誠實、負責、感恩、尊重、同理
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-amber-400" />
                          活動設計：故事、角色扮演、合作闖關
                        </li>
                        <li className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-emerald-500" />
                          家庭同行：親子任務、日常小儀式建立
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-rose-50 ring-1 ring-black/5 p-6">
                      <p className="text-sm font-semibold text-amber-700">教學精神</p>
                      <p className="mt-2 text-gray-800">
                        用可理解、可練習、可稱讚的語言，協助孩子把「會」變成「習慣」，把「知道」活在每天。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部柔光條 */}
              <div aria-hidden className="h-3 w-full bg-gradient-to-r from-rose-200 via-amber-200 to-sky-200" />
            </div>
          </section>

          {/* 聯繫教會（沿用既有語氣，重新版面） */}
          <section className="relative max-w-5xl mx-auto mt-12">
            <div className="relative rounded-2xl bg-white/90 ring-1 ring-black/5 shadow-md">
              <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-rose-400 via-amber-400 to-sky-400" />
              <div className="px-5 py-6 md:px-8 md:py-7">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 h-11 w-11 rounded-full bg-gradient-to-br from-rose-200 to-sky-200 grid place-items-center ring-1 ring-black/5">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-rose-700"
                    >
                      <path d="M7 8a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v1a5 5 0 0 1-5 5H9l-3.2 2.4A1 1 0 0 1 4 16.6V14A6 6 0 0 1 7 8Z" />
                    </svg>
                  </div>
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
            <div
              aria-hidden
              className="mx-auto mt-3 h-1.5 w-44 rounded-full bg-gradient-to-r from-rose-200 via-amber-200 to-sky-200 blur-[1px]"
            />
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
