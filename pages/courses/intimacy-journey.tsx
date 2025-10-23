// pages/courses/intimacy-journey.tsx

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function IntimacyJourneyCourse() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Hero / Banner */}
      <div className="relative pt-32 md:pt-44 pb-16 md:pb-24 bg-gradient-to-r from-rose-200 via-pink-100 to-sky-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            親密之旅
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            情感智慧與自我成長培訓課程｜把理論化為日常行動，修復與建立更有連結的關係。
          </p>
          <p className="mt-2 text-sm text-gray-500">
            課程設計：臨床心理學家 黃維仁 博士
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gradient-to-b from-rose-50 via-white to-sky-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* 介紹卡（問句＋三向度） */}
          <section className="relative max-w-6xl mx-auto">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-r from-rose-200/60 via-amber-100/60 to-sky-200/60 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-white/90 shadow-xl ring-1 ring-black/5">
              {/* 左側色帶 */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-rose-400 to-sky-400" />

              <div className="p-7 sm:p-10 md:p-14">
                <div className="grid gap-10 md:grid-cols-12">
                  {/* 左：引導問句 */}
                  <div className="md:col-span-7">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                      課程成長小組
                    </h2>
                    <ul className="space-y-3 text-gray-800 leading-relaxed">
                      <li>期待人際與親密關係更有溫度、也更有智慧？</li>
                      <li>常因衝突而受傷，想看見自己的情緒按鈕？</li>
                      <li>想搞懂家族互動模式，改善家庭文化與氣氛？</li>
                      <li>需要一套安全、科學的自我成長地圖？</li>
                    </ul>

                    {/* 三大主軸 */}
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100/70 p-5 ring-1 ring-rose-200">
                        <p className="text-sm font-semibold text-rose-600">主軸一</p>
                        <p className="mt-1 font-bold text-gray-900">與自己親</p>
                        <p className="mt-1 text-sm text-gray-700">覺察情緒、辨識需要，發展健全的真我。</p>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100/70 p-5 ring-1 ring-sky-200">
                        <p className="text-sm font-semibold text-sky-600">主軸二</p>
                        <p className="mt-1 font-bold text-gray-900">與別人親</p>
                        <p className="mt-1 text-sm text-gray-700">刻意經營友情與伴侶關係，建立連結與信任。</p>
                      </div>
                      <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/70 p-5 ring-1 ring-emerald-200">
                        <p className="text-sm font-semibold text-emerald-600">主軸三</p>
                        <p className="mt-1 font-bold text-gray-900">成熟互動</p>
                        <p className="mt-1 text-sm text-gray-700">有效處理差異與衝突，增加讓人感受到愛的能力。</p>
                      </div>
                    </div>
                  </div>

                  {/* 右：圓形重點圖（替代海報餅圖） */}
                  <div className="md:col-span-5">
                    <div className="relative mx-auto max-w-sm">
                      <div className="aspect-square rounded-full bg-gradient-to-br from-rose-100 via-white to-sky-100 ring-1 ring-black/5 grid place-items-center shadow">
                        <div className="text-center px-6">
                          <div className="inline-flex items-center justify-center rounded-full px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-rose-500 to-amber-500 shadow">
                            關係核心
                          </div>
                          <h3 className="mt-3 text-4xl font-black tracking-wider text-gray-900">親</h3>
                          <p className="mt-2 text-sm text-gray-600">刻意經營友情｜發展健全真我｜處理差異與衝突</p>
                        </div>
                      </div>
                      <div
                        aria-hidden
                        className="absolute -inset-2 rounded-full blur-xl bg-gradient-to-tr from-rose-200/60 via-amber-200/60 to-sky-200/60 -z-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div aria-hidden className="h-3 w-full bg-gradient-to-r from-rose-200 via-amber-200 to-sky-200" />
            </div>
          </section>

          {/* 資訊與聯絡 */}
          <section className="relative max-w-6xl mx-auto mt-12">
            <div className="grid gap-8 md:grid-cols-12">
              {/* 左：小組資訊卡 */}
              <div className="md:col-span-7">
                <div className="rounded-2xl bg-white/90 ring-1 ring-black/5 shadow p-6 md:p-8">
                  <h4 className="text-xl font-bold text-gray-900">成長小組資訊</h4>
                  <div className="mt-4 grid gap-4">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-800">
                      <div>
                        <span className="font-semibold">小組長：</span>黃敏忠、王麗容
                      </div>
                      <div>
                        <span className="font-semibold">報名與諮詢：</span>
                        <a href="tel:0929327486" className="underline decoration-dotted hover:opacity-80">
                          王麗容 0929-327-486
                        </a>
                      </div>
                      <div>
                        <span className="font-semibold">費用：</span>教材・學員手冊 240 元
                      </div>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">小組時間（週六 09:00–12:30，共 7 次）</p>
                      <ul className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-800">
                        <li>2025/11/08</li>
                        <li>2025/11/15</li>
                        <li>2025/11/29</li>
                        <li>2025/12/20</li>
                        <li>2025/12/27</li>
                        <li>2026/01/03</li>
                        <li>2026/01/10</li>
                      </ul>
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">進行方式</p>
                      <p className="text-gray-800">
                        實體小組（台南市善化區小新里小新營 56-65 號）
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 右：提醒＋行動與外部連結 */}
              <div className="md:col-span-5 flex flex-col gap-6">
                <div className="rounded-2xl p-[1.5px] bg-gradient-to-r from-rose-300 via-amber-300 to-sky-300 shadow">
                  <div className="rounded-2xl bg-white/80 backdrop-blur px-6 py-5 ring-1 ring-black/5">
                    <p className="font-semibold text-gray-900">
                      招生名額：每梯次 12 位（重視參與與互動，名額有限）
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      建議伴侶一同參加，兩人一起學習，效果最佳。
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-black/5 p-6">
                  <p className="text-sm font-semibold text-sky-700">想先了解架構？</p>
                  <p className="mt-1 text-gray-800">
                    可先閱讀課程大綱，並與小組長聯繫報名事宜。
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <a
                      href="https://jtiint.org/course/outline"
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-emerald-500 shadow hover:opacity-90"
                    >
                      查看課程大綱
                    </a>
                    <a
                      href="tel:0929327486"
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-300 bg-white/70 hover:bg-white"
                    >
                      來電洽詢（0929-327-486）
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
