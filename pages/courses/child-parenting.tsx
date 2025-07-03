import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ChildParentingCourse() {
  return (
    <>
      <NavBar />

      {/* Banner 區塊 */}
      <div className="relative pt-32 md:pt-48 pb-12 bg-gradient-to-r from-[#ffdfad] via-[#e2ffe2] to-[#c9d7fc] flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">如何教養兒童</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl text-center">
          以愛與智慧建立穩固的親子關係，結合信仰原則、實務經驗和互動遊戲，幫助父母陪伴孩子快樂成長！
        </p>
      </div>

      {/* 課程介紹 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#7dc12d] mb-6">課程內容</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>兒童身心發展歷程與敏感期</li>
            <li>有效的親子溝通與傾聽技巧</li>
            <li>正向教養與品格培育方法</li>
            <li>如何建立健康作息和好習慣</li>
            <li>信仰與生活：聖經價值融入家庭</li>
            <li>家長實戰經驗分享與Q&amp;A</li>
          </ul>
        </div>

        {/* 講師介紹與圖片 */}
        <div className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
          <img
            src="/images/child-parenting.jpg"
            alt="如何教養兒童"
            className="w-full md:w-64 rounded-xl shadow-md object-cover"
            style={{ maxHeight: 260 }}
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">主講人</h3>
            <p className="text-gray-600 mb-1">王老師 &nbsp; | &nbsp; 親職教育講師團隊</p>
            <p className="text-gray-500 text-sm">
              擁有幼教與親職輔導多年經驗，專長親子溝通、情緒引導與信仰教育，致力協助父母提升教養信心與能力。
            </p>
          </div>
        </div>

        {/* 課程資訊與報名按鈕 */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-[#c7ecd0] via-[#fff9c2] to-[#d0e2ff] rounded-2xl shadow p-8 text-center">
          <h4 className="text-lg md:text-xl font-bold text-gray-700 mb-4">課程資訊</h4>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-6">
            <div>
              <div className="text-[#7dc12d] font-bold">時間</div>
              <div className="text-gray-700">每月第一、三週六 10:00-12:00</div>
            </div>
            <div>
              <div className="text-[#53a7e3] font-bold">地點</div>
              <div className="text-gray-700">南科福氣教會副堂</div>
            </div>
            <div>
              <div className="text-[#e87937] font-bold">對象</div>
              <div className="text-gray-700">國小～國中家長</div>
            </div>
          </div>
          <a
            href="/member/event-registration"
            className="inline-block mt-2 px-8 py-3 bg-gradient-to-r from-[#7dc12d] to-[#53a7e3] text-white font-semibold rounded-full shadow hover:opacity-90 transition"
          >
            線上報名
          </a>
        </div>
      </main>

      <Footer />
    </>
  )
}
