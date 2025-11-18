// pages/courses/child-parenting.tsx
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ChildParentingCourse() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fff7f3]">
      <NavBar />

      <main className="flex-1">
        {/* Hero 區：經文＋主題 */}
        <section className="pt-28 md:pt-36 pb-16 bg-gradient-to-br from-[#ffe4ec] via-[#ffe9c9] to-[#e2f6ff]">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.5fr,1fr] items-center">
              {/* 左側：文字 */}
              <div className="max-w-3xl">
                <p className="inline-flex items-center rounded-full bg-white/70 px-5 py-1.5 text-sm md:text-base font-medium text-rose-500 shadow-sm mb-4">
                  基督徒親職 · 神話語為根
                </p>
                <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#5c2b22] mb-4">
                  如何教養孩童
                </h1>
                <div className="bg-white/80 rounded-2xl p-5 md:p-6 shadow-md border border-white/60 mb-6">
                  <p className="text-base md:text-lg font-semibold text-[#9a3b34] mb-3">
                    「教養孩童，使他走當行的道，就是到老，他也不偏離。」— 箴言 22:6
                  </p>
                  <p className="text-base md:text-lg text-slate-700">
                    一起回到聖經，思考如何在日常生活中，用信仰陪伴孩子同行。
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-full bg-[#ffb7b2] text-sm md:text-base font-semibold text-[#5c2b22] px-4 py-1.5 shadow-sm">
                    神話語成為教養準則
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#ffd88a] text-sm md:text-base font-semibold text-[#5c2b22] px-4 py-1.5 shadow-sm">
                    陪孩子認識並跟隨主
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#c8f1a7] text-sm md:text-base font-semibold text-[#285c3d] px-4 py-1.5 shadow-sm">
                    讓家庭成為祝福起點
                  </span>
                </div>
              </div>

              {/* 右側：色塊＋簡單插畫感 */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl bg-white/80 shadow-xl border border-white/70 p-5 md:p-6">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-[#ffcfdf] to-[#fefdca] flex items-center justify-center text-4xl">
                      <span role="img" aria-label="kids">
                        👧👦
                      </span>
                    </div>
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-[#c9f0ff] to-[#fbd4ff] flex items-center justify-center text-4xl">
                      <span role="img" aria-label="family">
                        👨‍👩‍👧‍👦
                      </span>
                    </div>
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-[#d4f8c4] to-[#ffe0b2] flex items-center justify-center text-3xl">
                      <span role="img" aria-label="bible">
                        📖
                      </span>
                    </div>
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-[#ffe3e3] to-[#e3f2ff] flex items-center justify-center text-3xl">
                      <span role="img" aria-label="heart">
                        💗
                      </span>
                    </div>
                  </div>
                  <p className="text-sm md:text-base text-slate-700 text-center leading-relaxed">
                    用簡單的步伐，在家中一起學習愛、界線與信仰。
                  </p>
                </div>

                <div className="hidden md:block absolute -bottom-6 -left-6">
                  <div className="w-16 h-16 rounded-full bg-[#fdf1c9] border-4 border-white shadow-md flex items-center justify-center text-3xl">
                    😊
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 三大重點（圖片上的三句話） */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-[#5c2b22] mb-3">
                課程焦點
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                三個簡單方向，幫助父母在主裡重新整理教養步調。
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="h-full rounded-2xl bg-white shadow-sm border border-[#ffe0c2] px-7 py-7 flex flex-col">
                <p className="text-sm md:text-base font-semibold tracking-wide text-rose-400 mb-3">
                  FOCUS 01
                </p>
                <h3 className="text-lg md:text-xl font-bold text-[#5c2b22] mb-3">
                  用神話語引導父母
                </h3>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  從經文出發，重新對齊教養方向與標準。
                </p>
              </div>

              <div className="h-full rounded-2xl bg-white shadow-sm border border-[#ffe0c2] px-7 py-7 flex flex-col">
                <p className="text-sm md:text-base font-semibold tracking-wide text-amber-500 mb-3">
                  FOCUS 02
                </p>
                <h3 className="text-lg md:text-xl font-bold text-[#5c2b22] mb-3">
                  有智慧地帶領孩子
                </h3>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  不只看行為，也學習讀懂孩子心裡真正的需要。
                </p>
              </div>

              <div className="h-full rounded-2xl bg-white shadow-sm border border-[#ffe0c2] px-7 py-7 flex flex-col">
                <p className="text-sm md:text-base font-semibold tracking-wide text-emerald-500 mb-3">
                  FOCUS 03
                </p>
                <h3 className="text-lg md:text-xl font-bold text-[#285c3d] mb-3">
                  讓父母教養更輕省
                </h3>
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  把重擔交託給主，在群體中彼此扶持，一起走長遠的路。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 課程方向與報名方式 */}
        <section className="pb-16">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="grid gap-8 lg:grid-cols-2 items-stretch">
              <div className="rounded-3xl bg-[#5c2b22] text-white p-7 md:p-9 shadow-lg flex flex-col justify-between">
                <div>
                  <p className="text-base md:text-lg tracking-[0.12em] text-amber-200 mb-4">
                    課程方向
                  </p>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
                    在恩典與真理中陪孩子長大
                  </h3>
                  <p className="text-base md:text-lg leading-relaxed text-amber-50/90 mb-4">
                    透過信息分享與彼此交流，幫助父母在信仰裡調整眼光、說話方式與陪伴節奏。
                  </p>
                  <p className="text-base md:text-lg text-amber-100/90">
                    具體時間與形式，將依教會與參與家庭實際狀況安排。
                  </p>
                </div>
              </div>

              <div className="rounded-3xl bg-white shadow-md border border-[#ffe0c2] p-7 md:p-9 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold text-[#5c2b22] mb-4">
                  報名與詢問
                </h3>
                <div className="space-y-4 text-base md:text-lg text-slate-700">
                  <p>
                    歡迎所有關心下一代的父母、預備成為父母的夫妻，一起來尋找在主裡教養的方向。
                  </p>
                  <p>
                    報名方式：主日可至服務台洽詢，或透過教會聯絡方式與我們聯繫。
                  </p>
                  <p>
                    期待與您一同看見，神如何在家庭中動工，成為孩子一生的祝福。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
