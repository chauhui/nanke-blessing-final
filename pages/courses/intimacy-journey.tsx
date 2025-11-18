// pages/courses/intimacy-journey.tsx
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function IntimacyJourneyCourse() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />

      {/* ============== HERO（置中＋等距＋高度縮短＋導覽列內部間隙） ============== */}
      <header className="relative isolate overflow-hidden">
        {/* 藍色背景只覆蓋 header 區域 */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f1f3a] via-[#132a4e] to-[#15406e]" />

        <div className="container mx-auto px-4">
          {/* 這個 spacer 讓「可見的藍色」從 Navbar 下緣才開始，避免被蓋到而看起來不等距 */}
          <div aria-hidden className="h-16 md:h-20" />

          {/* place-items-center 保證置中；上下 padding 對稱；藍底高度縮短 */}
          <div className="grid min-h-[300px] md:min-h-[340px] lg:min-h-[360px] place-items-center py-12 md:py-14">
            <div className="grid w-full gap-8 lg:grid-cols-12 items-center">
              {/* 左：標題敘述 */}
              <div className="lg:col-span-7 text-white">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/15 px-3 py-1 text-xs text-white/90">
                  情感智慧 × 自我成長
                </div>
                <h1 className="mt-3 text-[34px] md:text-[44px] leading-tight font-extrabold tracking-tight">
                  親密之旅
                </h1>
                <p className="mt-3 text-white/85 text-[15px] md:text-base leading-relaxed">
                  把臨床心理學化作日常行動，修復關係、擴大連結、建立安全與信任。
                </p>
                <p className="mt-2 text-xs md:text-sm text-white/70">
                  課程設計：臨床心理學家 黃維仁 博士
                </p>
              </div>

              {/* 右：資訊卡（與標題同層，避免單邊撐高） */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl bg-white/10 backdrop-blur ring-1 ring-white/20 p-5 md:p-6 text-white shadow-2xl">
                  <div className="grid grid-cols-2 gap-3 text-[13px] md:text-sm">
                    <div>
                      <p className="text-white/60">上課方式</p>
                      <p className="mt-1 font-semibold">8–12 人小班制｜小組研討＋演練</p>
                    </div>
                    <div>
                      <p className="text-white/60">上課日期時間</p>
                      <p className="mt-1 font-semibold">報名後通知（依梯次安排）</p>
                    </div>
                    <div>
                      <p className="text-white/60">上課地點</p>
                      <p className="mt-1 font-semibold">報名後通知（簡訊／LINE）</p>
                    </div>
                    <div>
                      <p className="text-white/60">聯絡洽詢</p>
                      <p className="mt-1 font-semibold">
                        <a href="tel:0929327486" className="underline decoration-dotted">
                          0929-327-486 王麗容
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 h-px bg-white/15" />
                  <p className="mt-4 text-[11px] md:text-xs text-white/70">
                    名額限 12 位；建議伴侶一同參與以獲最佳學習成效。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 與下方白底清楚分界（不佔高度） */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/25" />
      </header>

      {/* =================== Main =================== */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-10 md:py-12">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Sticky 側欄 */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24 space-y-6">
                <div className="rounded-3xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-sm font-semibold text-slate-700">課程宗旨</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-800">
                    結合理論與實作，聚焦
                    <span className="font-semibold">「與自己親、與別人親、成熟互動」</span>
                    ，加深安全依附與情感連結，打造可持續的親密關係。
                  </p>
                </div>

                <div className="rounded-3xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-sm font-semibold text-slate-700">適用對象</h3>
                  <ul className="mt-2 space-y-1.5 text-[15px] text-slate-800">
                    <li>• 伴侶／婚姻關係希望升級者</li>
                    <li>• 渴望提升情緒覺察與溝通能力者</li>
                    <li>• 親子與職場關係需要修復者</li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-gray-200 shadow-sm p-6">
                  <h3 className="text-sm font-semibold text-slate-700">費用</h3>
                  <p className="mt-2 text-slate-800">
                    教材・學員手冊 <span className="font-semibold">240 元</span>（首次上課繳交）
                  </p>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-sky-50 to-emerald-50 ring-1 ring-gray-200 p-6">
                  <p className="text-sm font-semibold text-sky-700">想先了解完整架構？</p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      href="https://jtiint.org/course/outline"
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-emerald-500 shadow hover:opacity-90"
                    >
                      查看課程大綱
                    </a>
                    <a
                      href="tel:0929327486"
                      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-300 bg-white hover:bg-white/90"
                    >
                      來電洽詢（0929-327-486）
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* 主內容 */}
            <div className="lg:col-span-8 space-y-10">
              <section>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#132a4e]">你是否也在找答案？</h2>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  {[
                    '衝突循環總是重演，彼此愈說愈受傷？',
                    '明明在乎，卻很難說出需要與界線？',
                    '想增進親密與安全感，卻不知從何開始？',
                    '想把理論變成行動，有系統地練與改？',
                  ].map((t, i) => (
                    <div key={i} className="rounded-2xl border border-gray-200 p-4 md:p-5 bg-white shadow-sm">
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                          {i + 1}
                        </span>
                        <p className="text-slate-800">{t}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="overflow-hidden rounded-3xl ring-1 ring-gray-200 shadow">
                <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-sky-50 p-6 md:p-8">
                  <h3 className="text-lg md:text-xl font-extrabold text-[#132a4e]">三大核心能力</h3>
                  <div className="mt-5 grid md:grid-cols-3 gap-4">
                    <Pillar color="rose" title="與自己親" points={['覺察情緒與身體訊號', '辨識需要與價值', '自我安撫與調節']} />
                    <Pillar color="sky" title="與別人親" points={['表達脆弱與需求', '建立信任與連結', '形成安全依附']} />
                    <Pillar color="emerald" title="成熟互動" points={['分化與界線', '衝突協商與修復', '雙贏對話']} />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg md:text-xl font-extrabold text-[#132a4e]">學習方法（小組教練式）</h3>
                <ol className="mt-5 space-y-4">
                  {[
                    '短講 × 示範：以臨床框架快速建立共同語言',
                    '分組演練：把理論變成具體句型與身體動作',
                    '教練回饋：即時調整，避免錯誤練習固化',
                    '家中作業：每週微行動，持續建立新連結',
                  ].map((step, idx) => (
                    <li key={idx} className="relative pl-9">
                      <span className="absolute left-0 top-0 inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-slate-800">{step}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="rounded-3xl border border-gray-200 shadow">
                <div className="px-5 md:px-6 py-4 bg-slate-50/70 rounded-t-3xl">
                  <h3 className="text-lg font-extrabold text-[#132a4e]">常見問題</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  <Details q="沒有伴侶可以參加嗎？">可以。單身、交往、已婚皆適合；若能與重要他人一同參與，成效更佳。</Details>
                  <Details q="需要額外購買教材嗎？">不需要，教材與學員手冊已包含在費用內（240 元）。</Details>
                  <Details q="缺席一次怎麼辦？">可與小組長討論補課：重點回顧、指定閱讀或短時段補練習。</Details>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

/* ------------- helpers ------------- */
function Pillar({
  color,
  title,
  points,
}: {
  color: 'rose' | 'sky' | 'emerald'
  title: string
  points: string[]
}) {
  const tone =
    color === 'rose'
      ? { badge: 'bg-rose-600', ring: 'ring-rose-200', bg: 'bg-rose-50' }
      : color === 'sky'
      ? { badge: 'bg-sky-600', ring: 'ring-sky-200', bg: 'bg-sky-50' }
      : { badge: 'bg-emerald-600', ring: 'ring-emerald-200', bg: 'bg-emerald-50' }

  return (
    <div className={`rounded-2xl p-4 ring-1 ${tone.ring} ${tone.bg}`}>
      <div className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${tone.badge} text-white text-xs font-bold`}>✓</div>
      <p className="mt-2 font-bold text-slate-900">{title}</p>
      <ul className="mt-1.5 space-y-1 text-sm text-slate-700">
        {points.map((p, i) => (
          <li key={i}>• {p}</li>
        ))}
      </ul>
    </div>
  )
}

function Details({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="p-5">
      <summary className="cursor-pointer font-medium text-slate-900">{q}</summary>
      <p className="mt-2 text-[15px] text-slate-700">{children}</p>
    </details>
  )
}
