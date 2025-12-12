// pages/privacy.tsx
'use client';

import React from 'react';
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    // [配色] 全站統一：米灰底色 + 深靛藍文字
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <Head>
        <title>隱私權政策 - 南科福氣教會</title>
        <meta name="description" content="南科福氣教會隱私權政策，說明我們如何保護和處理您的個人資料" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      {/* ✅ 修正 1: 頂部 pt-28 (防剪裁)，底部 pb-12 */}
      <main className="flex-grow pt-28 md:pt-40 pb-12 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          
          {/* --- Section 1: 標題區 (統一風格) --- */}
          {/* ✅ 修正 2: 結構改為標準的 flex-row，不再置中 */}
          <div className="border-b border-[#D4C5B5] pb-6 md:pb-10 mb-8 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                {/* 小標籤 */}
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   <div className="h-[1px] w-8 bg-[#B45309]"></div>
                   <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#B45309] uppercase">
                     Privacy Policy
                   </span>
                </div>
                {/* 標題：手機版 text-3xl */}
                <h1 className="text-3xl md:text-6xl font-serif font-bold text-[#1E1B4B] leading-tight">
                  隱私權政策
                </h1>
              </div>
              
              {/* 敘述：手機版靠右，電腦版靠左 */}
              <p className="max-w-md text-[#475569] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                南科福氣教會個人資料保護政策。<br/>
                說明我們如何蒐集、處理及保護您的資料。
              </p>
            </div>
          </div>

          {/* --- Section 2: 條款內容卡片 --- */}
          {/* ✅ 修正 3: 手機版內距 p-6，背景改為白底卡片風格 */}
          <div className="bg-white rounded-sm shadow-sm border border-[#D4C5B5] p-6 md:p-12">
            <div className="prose max-w-none text-[#475569] text-sm md:text-base leading-loose">
              <p className="mb-8">
                南科福氣教會（以下簡稱「本教會」）非常重視您的個人資料保護。本政策說明本教會如何蒐集、處理及保護您的個人資料。請您詳閱下列內容。
              </p>

              <div className="space-y-8">
                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">01.</span> 個人資料蒐集目的與範圍
                  </h3>
                  <p className="text-justify">
                    本教會於活動報名、線上奉獻、聯絡表單等功能時，可能蒐集您的姓名、聯絡電話、電子郵件、性別、出生年月日、IP 位址等資料，作為教會聯繫、會員管理、活動推廣及統計分析等特定目的之用。
                  </p>
                </section>

                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">02.</span> 個人資料利用
                  </h3>
                  <p className="text-justify">
                    所蒐集之個人資料僅限於本教會及所屬事工部門，於上述目的範圍內使用。除法令或政府機關要求外，不會將您的個人資料提供給第三方，亦不會用於未經授權之其他用途。
                  </p>
                </section>

                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">03.</span> 資料保護措施
                  </h3>
                  <p className="text-justify">
                    本教會採用資訊安全措施保護您的個人資料，包括但不限於：資料存取權限限制、加密傳輸、定期備份等，以避免資料外洩、竄改或遺失。
                  </p>
                </section>

                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">04.</span> 資料查詢與刪除
                  </h3>
                  <p className="text-justify">
                    您可隨時向本教會提出查詢、閱覽、補充、更正或刪除您的個人資料，請透過「聯絡我們」頁面或致信 <a href="mailto:Info.NKBBC@gmail.com" className="text-[#B45309] font-bold hover:underline border-b border-[#B45309]/30 pb-0.5">Info.NKBBC@gmail.com</a> 聯繫我們。
                  </p>
                </section>

                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">05.</span> 隱私權政策修訂
                  </h3>
                  <p className="text-justify">
                    本教會將不定期檢討並修訂本政策，更新內容將公告於本網站，恕不另行個別通知。
                  </p>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-[#D4C5B5] text-center">
                <p className="text-xs text-[#94A3B8] font-bold tracking-widest uppercase">
                  Last Updated: May 28, 2025
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}