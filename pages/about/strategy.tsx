import NavBar from '@/components/NavBar'
import Strategy from '@/components/Strategy'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

export default function StrategyPage() {
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
        <title>教會策略 | 南科福氣教會</title>
        <meta name="description" content="了解南科福氣教會的策略方針和發展計劃" />
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
                教會策略
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                <span className="hidden md:block">我們透過禮拜真理、小組牧養和福音外展這三大策略來建立教會，</span>
                <span className="hidden md:block">使每位信徒靈命成長並擴展神的國度。</span>
                <span className="md:hidden">我們透過禮拜真理、小組牧養和福音外展這三大策略來建立教會，使每位信徒靈命成長並擴展神的國度。</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* 策略內容 */}
        <Strategy />
      </main>
      <Footer />
    </div>
  )
}