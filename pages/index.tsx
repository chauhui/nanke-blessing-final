import Head from 'next/head';
import NavBar from '@/components/NavBar';
import HeroCarousel from '@/components/HeroCarousel';
import { AboutPreview } from '@/components/AboutPreview';
import MinistriesPreview from '@/components/MinistriesPreview';
import Footer from '@/components/Footer';
import DailyDevotion from '@/components/DailyDevotion';
import SocialFloat from '@/components/SocialFloat';

import { useEffect, useState } from 'react';

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const consent = localStorage.getItem('cookie_consent');
      setShowCookieBanner(consent !== 'true');
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookie_consent', 'true');
    setShowCookieBanner(false);
  };

  return (
    <>
      {/* --- OG 預覽圖 & SEO meta --- */}
      <Head>
        <title>南科福氣教會 Nanke Blessed & Blessing Church</title>
        <meta property="og:title" content="南科福氣教會 Nanke Blessed & Blessing Church" />
        <meta property="og:description" content="歡迎來到南科福氣教會，我們在台南為主發光！" />
        <meta property="og:image" content="https://nanke-blessing.vercel.app/images/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nanke-blessing.vercel.app/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://nanke-blessing.vercel.app/images/og-image.jpg" />
        <meta name="description" content="南科福氣教會 Nanke Blessed & Blessing Church，台南基督教會。歡迎您加入！" />
      </Head>
      <div className="relative">
        <NavBar />

        {/* Cookie Consent Banner */}
        {showCookieBanner && (
          <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 bg-opacity-95 text-white px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg animate-fade-in">
            <div className="mb-2 md:mb-0 text-center md:text-left">
              本網站使用 cookie 儲存登入狀態與個人化設定。請點選「同意」以確保功能正常運作。
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition mt-2 md:mt-0"
              onClick={handleAcceptCookies}
            >
              同意
            </button>
          </div>
        )}

        <main className="relative bg-gray-100">
          <div className="pt-16 md:pt-28">
            <div className="bg-gradient-to-r from-pink-500 via-yellow-400 to-orange-500">
              <HeroCarousel />
            </div>
          </div>

          <MinistriesPreview />

          {/* 行事曆區塊 - 已加入每週第一天為週日設定 */}
          <section className="relative py-10 overflow-hidden w-full" style={{ background: 'linear-gradient(120deg, #f7d6f7 0%, #ffe4b0 40%, #aee8fd 100%)' }}>
            <div className="w-[90%] md:w-[80%] mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">教會行事曆</h2>
              </div>
              <div className="w-full overflow-x-auto rounded-lg shadow">
                <iframe
                  src="https://calendar.google.com/calendar/embed?src=shchurch5%40gmail.com&src=zh.taiwan%23holiday%40group.v.calendar.google.com&ctz=Asia%2FTaipei&wkst=1"
                  style={{ border: 0 }}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  title="教會行事曆"
                  className="w-full min-w-[320px] h-[80vw] md:h-[600px]"
                ></iframe>
              </div>
            </div>
          </section>

          {/* 生命見證區塊（主題漸層背景，卡片柔色、陰影、細邊框，內容內縮） */}
          <section
            className="relative py-8 md:py-16"
            style={{
              background: "linear-gradient(120deg, #f7e9fa 0%, #e3f7fa 100%)"
            }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-6 md:mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 md:mb-4">
                  生命見證
                </h2>
                <div className="w-20 h-1.5 mx-auto bg-gradient-to-r from-pink-500 to-orange-400 rounded-full"></div>
                <p className="mt-2 md:mt-4 text-gray-600 max-w-2xl mx-auto">
                  聽聽弟兄姊妹們分享他們的生命故事
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 見證1 */}
                <div className="relative group rounded-2xl shadow-lg overflow-hidden bg-pink-50 border border-pink-100 px-6 py-8 w-full">
                  <div className="mb-4 flex items-center space-x-2 w-[92%] mx-auto">
                    <span className="inline-block bg-pink-200 text-pink-700 text-xs font-bold px-2 py-1 rounded">
                      夫妻
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-pink-700 tracking-tight">
                      榮杰與菊珍
                    </h3>
                  </div>
                  <div className="youtube-container mb-6 rounded-xl overflow-hidden shadow w-[92%] mx-auto">
                    <div className="aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/KJ_XkJoTW0A"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                  <div className="w-[92%] mx-auto">
                    <p className="text-gray-700 text-base leading-relaxed">
                      分享了夫妻間過往的摩擦、溝通困難，以及在信仰過程中如何學會理解、包容與彼此支持。
                    </p>
                  </div>
                </div>

                {/* 見證2 */}
                <div className="relative group rounded-2xl shadow-lg overflow-hidden bg-blue-50 border border-blue-100 px-6 py-8 w-full">
                  <div className="mb-4 flex items-center space-x-2 w-[92%] mx-auto">
                    <span className="inline-block bg-blue-200 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                      親子
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-blue-700 tracking-tight">
                      淑貞與菀芮
                    </h3>
                  </div>
                  <div className="youtube-container mb-6 rounded-xl overflow-hidden shadow w-[92%] mx-auto">
                    <div className="aspect-video">
                      <iframe
                        src="https://www.youtube.com/embed/uMW2kAhZN9k"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg w-full h-full"
                      ></iframe>
                    </div>
                  </div>
                  <div className="w-[92%] mx-auto">
                    <p className="text-gray-700 text-base leading-relaxed">
                      分享在教養兒童過程中所經歷的挑戰與掙扎，並透過信仰的力量學會彼此理解與支持。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
