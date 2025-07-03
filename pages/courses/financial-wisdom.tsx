import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function FinancialWisdomCourse() {
  return (
    <>
      <NavBar />

      {/* Banner 區塊 */}
      <div className="w-full pt-32 md:pt-40 bg-gradient-to-r from-[#fff4c6] via-[#d3e5ff] to-[#c6ffd9] py-16 md:py-24 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">理財有道</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center">
          學習聖經財務觀與實用理財技巧，管理金錢、培養慷慨與正確價值觀，讓財務成為祝福人生與家庭的管道。
        </p>
      </div>

      {/* 課程介紹 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#e3b124] mb-6">課程內容</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>聖經中的理財智慧與價值觀</li>
            <li>預算規劃與消費管理的實務</li>
            <li>債務、儲蓄、投資的基礎概念</li>
            <li>如何在家庭中培養慷慨和知足的品格</li>
            <li>夫妻理財溝通與家庭財務協調</li>
            <li>理財見證分享與Q&amp;A交流</li>
          </ul>
        </div>

        {/* 講師介紹與圖片 */}
        <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src="/images/financial-wisdom.jpg"
            alt="理財有道"
            className="w-full md:w-64 rounded-xl shadow-md object-cover"
            style={{ maxHeight: 260 }}
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">主講人</h3>
            <p className="text-gray-600 mb-1">林老師 &nbsp; | &nbsp; 理財顧問／基督徒家庭教育講師</p>
            <p className="text-gray-500 text-sm">
              豐富財經專業背景，結合聖經理財理念，協助個人與家庭建立健康財務與慷慨分享的生活態度。
            </p>
          </div>
        </div>

        {/* 課程資訊與報名按鈕 */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#fff9c2] via-[#e1eaff] to-[#c7ecd0] rounded-2xl shadow p-8 text-center">
          <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-4">課程資訊</h4>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            <div>
              <div className="text-[#e3b124] font-bold">時間</div>
              <div className="text-gray-700">每月第三週六 10:00-12:00</div>
            </div>
            <div>
              <div className="text-[#4e91e2] font-bold">地點</div>
              <div className="text-gray-700">南科福氣教會副堂</div>
            </div>
            <div>
              <div className="text-[#7dc12d] font-bold">對象</div>
              <div className="text-gray-700">有興趣之家長與會友</div>
            </div>
          </div>
          <a
            href="/member/event-registration"
            className="inline-block mt-2 px-8 py-3 bg-gradient-to-r from-[#e3b124] to-[#4e91e2] text-white font-semibold rounded-full shadow hover:opacity-90 transition"
          >
            線上報名
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}
