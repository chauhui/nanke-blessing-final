import NavBar from '@/components/NavBar'
import SmallGroup from '@/components/SmallGroup'
import Head from 'next/head'
import { motion } from 'framer-motion'

import Footer from '@/components/Footer';

export default function Groups() {
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Head>
        <title>我們的小組 | 南科福氣教會</title>
        <meta name="description" content="了解南科福氣教會的小組服事與小組生活" />
      </Head>
      <NavBar />
      <main className="flex-grow">
        {/* 主標題區塊 */}
        <section className="relative pt-32 pb-12 md:pt-48 md:py-28 bg-gradient-to-r from-blue-50 via-cyan-50 to-teal-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
                我們的小組
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                <span className="hidden md:block">小組是信仰生活的核心，在這裡我們彼此連結、成長與服事，</span>
                <span className="hidden md:block">一起經歷神的愛與恩典。</span>
                <span className="md:hidden">小組是信仰生活的核心，在這裡我們彼此連結、成長與服事，一起經歷神的愛與恩典。</span>
              </p>
            </motion.div>
          </div>
        </section>
        {/* 小組內容 */}
        <SmallGroup />
      </main>
      <Footer />
    </div>
  )
}