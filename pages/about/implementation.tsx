import NavBar from '@/components/NavBar'
import Implementation from '@/components/Implementation'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

export default function ImplementationPage() {
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
        <title>實行之路 | 南科福氣教會</title>
        <meta name="description" content="了解南科福氣教會的實行之路與實踐方式" />
      </Head>
      
      <NavBar />
      
      <main className="flex-grow">
        {/* 主標題區塊 */}
        <section className="relative pt-32 pb-12 md:pt-48 md:py-28 bg-gradient-to-r from-teal-50 via-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
                實行之路
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-teal-500 to-blue-500 mx-auto rounded-full"></div>
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                探索南科福氣教會的實踐方式與信仰生活
              </p>
            </motion.div>
          </div>
        </section>

        {/* 圖表區塊 */}
        <section className="py-12 md:py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <img 
                  src="/images/implementation-chart.jpg" 
                  alt="實行之路圖表：基督和教會的見證為目標，聖經為基礎，生命、事奉、福音和神人生活為實行之路" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 實行之路內容 */}
        <Implementation />
      </main>
      <Footer />
    </div>
  )
}