
export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800 min-h-screen py-12 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        <section className="text-center">
          <h1 className="text-4xl font-bold text-teal-600 mb-2">關於我們</h1>
          <p className="text-lg text-gray-600">成為祝福台灣與列國的教會</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">教會願景</h2>
          <p className="bg-teal-50 border-l-4 border-teal-400 p-4 rounded">
            我們渴望建立一間榮耀神、服事人、使萬民作主門徒的教會。
            藉由科技園區的據點，連結家庭、產業與信仰。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">教會簡介</h2>
          <p className="mb-3">
            南科福氣教會創立於 20XX 年，位於台南科學園區育成中心，是一間特別關懷科技人與家庭的基督教會。
            透過主日信息、小組生活、社區行動，我們連結職場與信仰、關懷家庭與下一代。
          </p>
          <p>
            我們是一個跨世代的信仰群體，致力於活出真理、活出愛，裝備信徒進入世界各領域做光做鹽。
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">團隊成員</h2>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <div className="border rounded p-4 shadow-sm bg-gray-50">
              <h3 className="text-lg font-bold text-teal-700">主任牧師：王大衛</h3>
              <p className="text-sm text-gray-600">主責講道與異象帶領</p>
            </div>
            <div className="border rounded p-4 shadow-sm bg-gray-50">
              <h3 className="text-lg font-bold text-teal-700">副牧師：李以諾</h3>
              <p className="text-sm text-gray-600">關懷與教育事工負責</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">聚會時間與地點</h2>
          <p className="mb-1">主日崇拜：每週日上午 10:00</p>
          <p className="mb-1">地點：台南科學園區育成中心國際會議廳</p>
          <p className="text-sm text-gray-500">（可加 Google Map 或內嵌地圖）</p>
        </section>
      </div>
    </main>
  );
}
