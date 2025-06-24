'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { motion } from 'framer-motion'

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function VisionMission() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Head>
        <title>異象與使命 - 南科福氣教會</title>
        <meta name="description" content="了解南科福氣教會的異象與使命，認識我們的核心價值與目標" />
      </Head>
      <NavBar />
      <main className="flex-grow">
        {/* 主標題區塊 */}
        <section className="relative pt-32 pb-12 md:pt-48 md:py-28 bg-gradient-to-r from-pink-100 via-yellow-50 to-blue-50">
          <div className="container mx-auto px-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 md:mb-6">
                異象與使命
              </h1>
              <div className="w-20 h-1.5 bg-gradient-to-r from-pink-500 to-orange-400 mx-auto rounded-full"></div>
              <p className="mt-4 text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
                認識南科福氣教會的核心價值與使命宣言
              </p>
            </motion.div>
          </div>
        </section>

        {/* 異象與使命內容區塊 */}
        <section className="py-10 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div 
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 max-w-6xl mx-auto"
            >
              {/* 異象卡片 */}
              <motion.div 
                variants={fadeInUp}
                className="relative group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-orange-400 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative p-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">01</span>
                  </div>
                  <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400">
                      我們的異象
                    </span>
                  </h2>
                  <h3 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-6 text-gray-700">基督與教會</h3>
                  
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                    <div className="p-3 md:p-4 bg-gray-50 rounded-lg border-l-4 border-pink-400">
                      <div className="text-gray-700">
                        <div className="space-y-1 pl-4">
                          <div className="font-bold text-pink-600 -ml-4">『基督』－</div>
                          <div className="ml-4">
                            基督是一切，又在一切之內
                            <span className="hidden md:inline text-sm text-gray-500 ml-2">(Christ is all & in all)</span>
                          </div>
                          <div className="md:hidden text-sm text-gray-500 ml-4">
                            (Christ is all & in all)
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 md:p-4 bg-gray-50 rounded-lg border-l-4 border-orange-400">
                      <div className="space-y-1 pl-4">
                        <div className="font-bold text-orange-600 -ml-4">『教會』－</div>
                        <div className="ml-4">是基督的身體，是充滿神並彰顯神榮耀的器皿</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 md:pt-6 border-t border-gray-100">
                    <p className="text-sm md:text-base text-center text-gray-600 italic">
                      "祂是教會的頭，教會是祂的身體，是那充滿萬有者所充滿的"
                      <span className="block text-sm mt-2 text-gray-500">以弗所書 1:23</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 使命卡片 */}
              <motion.div 
                variants={fadeInUp}
                className="relative group bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-400 opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <div className="relative p-8">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg">
                    <span className="text-3xl font-bold text-white">02</span>
                  </div>
                  <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                      我們的使命
                    </span>
                  </h2>
                  <h3 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-6 text-gray-700">道成肉身的見證</h3>
                  
                  <div className="p-4 md:p-6 bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl mb-4 md:mb-6">
                    <p className="text-center text-gray-700 text-base md:text-lg leading-relaxed">
                      無論個人、家庭、職場與教會，<br />
                      盼望都成為耶穌基督『道成肉身』的見證人
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 md:pt-6 border-t border-gray-100">
                    <p className="text-sm md:text-base text-center text-gray-600 italic">
                      "但聖靈降臨在你們身上，你們就必得著能力，並要在耶路撒冷、猶太全地，和撒馬利亞，直到地極，作我的見證。"
                      <span className="block text-sm mt-2 text-gray-500">使徒行傳 1:8</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}