import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function IntimacyJourneyCourse() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* 大 Banner 區塊 */}
      <div className="relative pt-32 md:pt-44 pb-16 md:pb-24 bg-gradient-to-r from-pink-200 via-pink-100 to-cyan-100">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">親密之旅</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            重拾愛與信任，學習建立健康婚姻與親密關係，結合聖經原則、專業輔導與互動練習，一同走過親密關係的幸福旅程！
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gradient-to-b from-pink-50 to-cyan-50">
        <div className="container mx-auto px-4 py-12 md:py-16">
          {/* 課程內容卡片 */}
          <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-pink-500 mb-6">課程內容</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>認識親密關係的本質與挑戰</li>
              <li>愛的語言與情感溝通練習</li>
              <li>衝突處理與情緒調節技巧</li>
              <li>饒恕、信任與界線的建立</li>
              <li>信仰在婚姻與家庭中的實踐</li>
              <li>小組討論與真實經驗分享</li>
            </ul>
          </div>

          {/* 講師介紹卡片 */}
          <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
            <img
              src="/images/intimacy-journey.jpg"
              alt="親密之旅課程"
              className="w-full md:w-64 rounded-xl shadow-md object-cover"
              style={{ maxHeight: 260 }}
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">主講人</h3>
              <p className="text-gray-600 mb-1">張老師 &nbsp; | &nbsp; 婚姻與家庭輔導團隊</p>
              <p className="text-gray-500 text-sm">
                擁有婚姻諮商與信仰輔導資歷，專長伴侶溝通、情緒引導與危機處理，協助家庭走向合一與幸福。
              </p>
            </div>
          </div>

          {/* 課程資訊與報名卡片 */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-pink-100 via-white to-cyan-100 rounded-2xl shadow p-8 text-center">
            <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-4">課程資訊</h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
              <div>
                <div className="text-pink-500 font-bold">時間</div>
                <div className="text-gray-700">每月第三週六 14:00-16:30</div>
              </div>
              <div>
                <div className="text-cyan-600 font-bold">地點</div>
                <div className="text-gray-700">南科福氣教會副堂</div>
              </div>
              <div>
                <div className="text-pink-400 font-bold">對象</div>
                <div className="text-gray-700">已婚、預備婚姻或關心親密關係者</div>
              </div>
            </div>
            <a
              href="/member/event-registration"
              className="inline-block mt-2 px-8 py-3 bg-gradient-to-r from-pink-400 to-cyan-400 text-white font-semibold rounded-full shadow hover:opacity-90 transition"
            >
              線上報名
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
