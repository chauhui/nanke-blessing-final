// pages/courses/teen-parenting.tsx

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function TeenParentingCourse() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* 頁首 Banner */}
      <div className="relative pt-32 md:pt-44 pb-12 md:pb-20 bg-gradient-to-r from-pink-200 via-orange-100 to-sky-100">
        <div className="absolute inset-0 bg-black/0"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-3 tracking-tight">如何教養青少年</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            幫助家長建立與青少年溝通的橋樑，從聖經角度、專業諮商與實務經驗，一同面對孩子成長過程的挑戰與祝福！
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gradient-to-b from-pink-50 via-white to-blue-50">
        <div className="container mx-auto px-4 py-12">
          {/* 課程內容卡片 */}
          <div className="max-w-4xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6">課程內容</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>青少年身心發展與溝通困境</li>
              <li>如何建立健康的親子界線</li>
              <li>處理衝突與情緒管理技巧</li>
              <li>信仰如何成為家庭支持力量</li>
              <li>真實家長與青少年經驗分享</li>
            </ul>
          </div>

          {/* 講師介紹卡片 */}
          <div className="max-w-4xl mx-auto bg-white/90 rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
            <img
              src="/images/teen-parenting.jpg"
              alt="如何教養青少年"
              className="w-full md:w-64 rounded-xl shadow-md object-cover"
              style={{ maxHeight: 260 }}
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">主講人</h3>
              <p className="text-gray-600 mb-1">李牧師 &nbsp; | &nbsp; 家庭教育專業團隊</p>
              <p className="text-gray-500 text-sm">
                擁有多年青少年事工與家庭輔導經驗，結合理論與實務協助家長找到適合自己孩子的教養策略。
              </p>
            </div>
          </div>

          {/* 課程資訊 */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-orange-100 via-blue-50 to-green-50 rounded-2xl shadow p-8 text-center">
            <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-4">課程資訊</h4>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
              <div>
                <div className="text-orange-500 font-bold">時間</div>
                <div className="text-gray-700">每月第二、四週六 10:00-12:00</div>
              </div>
              <div>
                <div className="text-sky-500 font-bold">地點</div>
                <div className="text-gray-700">南科福氣教會主堂</div>
              </div>
              <div>
                <div className="text-green-500 font-bold">對象</div>
                <div className="text-gray-700">國中～高中家長及帶領人</div>
              </div>
            </div>
            <a
              href="/member/event-registration"
              className="inline-block mt-2 px-8 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-semibold rounded-full shadow hover:opacity-90 transition"
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
