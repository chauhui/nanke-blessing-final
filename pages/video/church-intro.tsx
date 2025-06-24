'use client';

import { motion } from 'framer-motion'
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ChurchIntro() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Head>
        <title>教會簡介 | 南科福氣教會</title>
        <meta name="description" content="了解南科福氣教會的歷史與使命" />
      </Head>
      
      <NavBar />
      
      <main className="flex-grow">
        {/* 主標題區塊 */}
        <section className="relative pt-32 pb-12 md:pt-48 md:py-28 bg-gradient-to-r from-amber-50 via-orange-50 to-red-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
                教會簡介
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                <span className="hidden md:block">南科福氣教會成立於 2010 年，致力於分享福音、牧養群體、關懷社區，</span>
                <span className="hidden md:block">成為人人都能經歷神同在與恩典的屬靈家園。</span>
                <span className="md:hidden">南科福氣教會成立於 2010 年，致力於分享福音、牧養群體、關懷社區，成為人人都能經歷神同在與恩典的屬靈家園。</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* 教會介紹區塊 */}
        <section className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* YouTube 影片區塊 */}
            <div className="relative rounded-xl shadow-lg aspect-video">
              <iframe 
                src="https://www.youtube.com/embed/Lzjs1mX6qmI" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>

            {/* 介紹文字區塊 */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">教會宗旨</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                我們在基督的愛中成長，天天追求並經歷基督的豐富，成為耶穌基督道成肉身的見證人，以建造榮耀的教會。
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
