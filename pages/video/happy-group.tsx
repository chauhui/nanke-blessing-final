'use client';

import { motion } from 'framer-motion'
import Head from 'next/head'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function HappyGroup() {
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
        <title>幸福小組花絮 | 南科福氣教會</title>
        <meta name="description" content="南科福氣教會幸福小組活動花絮" />
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
                幸福小組花絮
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                <span className="hidden md:block">南科福氣教會幸福小組活動花絮</span>
                <span className="md:hidden">南科福氣教會幸福小組活動花絮</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* 影片區塊 */}
        <section className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* 影片 1 */}
            <div className="relative rounded-xl shadow-lg aspect-video">
              <iframe 
                src="https://www.youtube.com/embed/MsldP9y4Xkg" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>

            {/* 影片 2 */}
            <div className="relative rounded-xl shadow-lg aspect-video">
              <iframe 
                src="https://www.youtube.com/embed/nLjTCSNDnGA" 
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen 
                className="w-full h-full rounded-xl"
              ></iframe>
            </div>
          </motion.div>


        </section>
      </main>
      <Footer />
    </div>
  )
}
