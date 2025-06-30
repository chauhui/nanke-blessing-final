// pages/member/meal.tsx

import { getSession } from 'next-auth/react'
import { NextPageContext } from 'next'

// ----------- server side protection -----------
export async function getServerSideProps(context: NextPageContext) {
  // 因為有 middleware 處理認證，這裡只需要檢查 session
  const session = await getSession({ req: context.req })
  
  // 如果沒有 session，middleware 會處理重定向
  // 這裡只返回必要的 props
  return { 
    props: {} 
  }
}

// ----------- client-rendered component -----------
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Calendar, MapPin, Users, Utensils } from 'lucide-react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function MealRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    window.open('https://forms.gle/cLvanRm7Em4FeFL89', '_blank')
    // 一秒後解除 loading 狀態，防止按鈕一直禁用
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>愛宴系統 - 南科福氣教會</title>
        <meta
          name="description"
          content="南科福氣教會愛宴系統，歡迎弟兄姊妹報名參與愛宴服事"
        />
      </Head>

      <NavBar />

      <main className="flex-grow bg-gradient-to-b from-pink-50 to-blue-50">
        {/* 頁首區塊 */}
        <div className="relative pt-32 md:pt-48 pb-16 md:pb-24 bg-gradient-to-r from-pink-500 to-orange-500 text-white">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">愛宴系統</h1>
            <p className="text-xl md:text-2xl opacity-90">
              一同分享愛與美食的時刻
            </p>
          </div>
        </div>

        {/* 主要內容 */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                  愛宴報名
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-pink-100 p-2 rounded-full">
                      <Calendar className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">時間</h3>
                      <p className="text-gray-600">每主日 12:00-13:30</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">地點</h3>
                      <p className="text-gray-600">南科育成中心 B1</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <Users className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">參與方式</h3>
                      <p className="text-gray-600">請填寫下方表單登記</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                    >
                      <Utensils className="w-5 h-5" />
                      <span>
                        {isSubmitting ? '開啟表單中...' : '立即登記'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
                <Image
                  src="/images/meal-banner.jpg"
                  alt="愛宴聚會"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="max-w-4xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              注意事項
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>請於每週四中午前完成登記，以利食材準備</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span>若有任何問題，請聯繫服事同工</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer 加在這裡，確保每個會員頁都有 */}
      <Footer />
    </div>
  )
}
