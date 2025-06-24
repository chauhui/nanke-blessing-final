import NavBar from '@/components/NavBar';
import AboutSubNav from '@/components/AboutSubNav';
import Gatherings from '@/components/Gatherings';
import Head from 'next/head';
import { motion } from 'framer-motion';

import Footer from '@/components/Footer';

export default function GatheringsPage() {
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
        <title>教會的各種成全聚會 | 南科福氣教會</title>
        <meta name="description" content="了解南科福氣教會各種成全聚會的時間與內容" />
      </Head>
      <NavBar />
      <main className="flex-grow">
        {/* 主標題區塊 */}
        <section className="relative pt-32 pb-12 md:pt-48 md:py-28 bg-gradient-to-br from-rose-50 via-amber-50 to-cyan-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
                各種成全聚會
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                <span className="hidden md:block">教會提供各種聚會以滿足不同年齡層和需求的會眾，</span>
                <span className="hidden md:block">幫助大家在信仰上一同成長。</span>
                <span className="md:hidden">教會提供各種聚會以滿足不同年齡層和需求的會眾，幫助大家在信仰上一同成長。</span>
              </p>
            </motion.div>
          </div>
        </section>
        {/* 聚會內容 */}
        <Gatherings />
      </main>
      <Footer />
    </div>
  );
} 