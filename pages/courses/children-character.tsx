// pages/courses/children-character.tsx

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ChildrenCharacterCourse() {
  return (
    <>
      <NavBar />

      {/* Banner 區塊，重點是 pt-32/md:pt-48，保證標題不被NavBar擋住 */}
      <div className="relative pt-32 md:pt-48 pb-16 md:pb-24 bg-gradient-to-r from-[#fef6d7] via-[#e2f6ff] to-[#ffd6ea] flex flex-col items-center">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">兒童品格班</h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            品格教育扎根生命，結合遊戲、故事與團體活動，培養兒童正向價值、良好習慣與同理心，幫助孩子健康成長、與人和諧相處！
          </p>
        </div>
      </div>

      {/* 課程介紹 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#c78ddb] mb-6">課程內容</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>認識自我、尊重他人、建立自信</li>
            <li>情緒表達與溝通協作訓練</li>
            <li>誠實、負責、感恩等核心品格養成</li>
            <li>團隊合作與解決問題的遊戲活動</li>
            <li>聖經故事與品格啟發</li>
            <li>家長參與與親子共學交流</li>
          </ul>
        </div>

        {/* 講師介紹與圖片 */}
        <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src="/images/children-character.jpg"
            alt="兒童品格班"
            className="w-full md:w-64 rounded-xl shadow-md object-cover"
            style={{ maxHeight: 260 }}
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">主講人</h3>
            <p className="text-gray-600 mb-1">張老師 &nbsp; | &nbsp; 兒童品格教育團隊</p>
            <p className="text-gray-500 text-sm">
              專業幼教與品格教育師資，善於引導孩子透過故事和遊戲認識自我、學會尊重與合作，提升家庭親子關係。
            </p>
          </div>
        </div>

        {/* 課程資訊與報名按鈕 */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#ffe9f3] via-[#e6faff] to-[#f6f7d9] rounded-2xl shadow p-8 text-center">
          <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-4">課程資訊</h4>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            <div>
              <div className="text-[#c78ddb] font-bold">時間</div>
              <div className="text-gray-700">每週日 10:00-11:30</div>
            </div>
            <div>
              <div className="text-[#4e91e2] font-bold">地點</div>
              <div className="text-gray-700">南科福氣教會兒童教室</div>
            </div>
            <div>
              <div className="text-[#e87937] font-bold">對象</div>
              <div className="text-gray-700">國小一～六年級學童</div>
            </div>
          </div>
          <a
            href="/member/event-registration"
            className="inline-block mt-2 px-8 py-3 bg-gradient-to-r from-[#c78ddb] to-[#4e91e2] text-white font-semibold rounded-full shadow hover:opacity-90 transition"
          >
            線上報名
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}
