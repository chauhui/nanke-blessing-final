// pages/terms.tsx
'use client';

import React from 'react';
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  return (
    // [配色] 全站統一：米灰底色 + 深靛藍文字
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <Head>
        <title>使用條款 - 南科福氣教會</title>
        <meta name="description" content="南科福氣教會網站使用條款，說明使用者應遵守的規範與注意事項" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      {/* ✅ 修正 1: 頂部 pt-28 (防剪裁)，底部 pb-12 (手機版緊緻) */}
      <main className="flex-grow pt-28 md:pt-40 pb-12 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          
          {/* --- Section 1: 標題區 (統一風格) --- */}
          {/* ✅ 修正 2: 底部間距縮小 mb-8 */}
          <div className="border-b border-[#D4C5B5] pb-6 md:pb-10 mb-8 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                {/* 小標籤 */}
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   <div className="h-[1px] w-8 bg-[#B45309]"></div>
                   <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#B45309] uppercase">
                     Terms of Use
                   </span>
                </div>
                {/* 標題：手機版 text-3xl */}
                <h1 className="text-3xl md:text-6xl font-serif font-bold text-[#1E1B4B] leading-tight">
                  使用條款
                </h1>
              </div>
              
              {/* 敘述：手機版靠右，電腦版靠左 */}
              <p className="max-w-md text-[#475569] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                歡迎使用南科福氣教會網站。<br/>
                請詳閱以下規範，以保障您的權益。
              </p>
            </div>
          </div>

          {/* --- Section 2: 條款內容卡片 --- */}
          {/* ✅ 修正 3: 手機版內距 p-6，背景改為白底卡片風格 */}
          <div className="bg-white rounded-sm shadow-sm border border-[#D4C5B5] p-6 md:p-12">
            <div className="prose max-w-none text-[#475569] text-sm md:text-base leading-loose">
              <p className="mb-8">
                歡迎您使用南科福氣教會網站（以下簡稱「本網站」）。請您詳閱下列條款，使用本網站即表示您同意遵守本條款。
              </p>

              <div className="space-y-8">
                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">01.</span> 服務內容
                  </h3>
                  <p className="text-justify">
                    本網站提供教會資訊、活動報名、見證分享、聯絡窗口及相關資源等網路服務。我們致力於提供準確且即時的資訊，但保留隨時修改或終止服務的權利。
                  </p>
                </section>

                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">02.</span> 使用者義務
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#B45309]">
                    <li>使用本網站時，請遵守相關法令規定及社會公序良俗，不得利用本網站從事任何非法行為。</li>
                    <li>請如實填寫個人資料，不得冒用、偽造或盜用他人身分。</li>
                    <li>發表言論請保持尊重，嚴禁散播不實、誹謗、攻擊、色情或違法內容。</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">03.</span> 智慧財產權
                  </h3>
                  <p className="text-justify">
                    本網站所刊載的所有內容（包含文字、圖片、影音、Logo 等），均為本教會或原權利人所有。未經書面授權，不得擅自轉載、修改、重製、散布或用於商業用途。
                  </p>
                </section>

                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">04.</span> 免責聲明
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 marker:text-[#B45309]">
                    <li>本教會對於網站內容之正確性及即時性，雖力求無誤，但不負完全保證責任。</li>
                    <li>因系統維護、資料更新、網路不穩或不可抗力因素導致網站中斷、錯誤或資料遺失，本教會不負任何賠償責任。</li>
                    <li>本網站可能包含外部連結，外部網站內容不在本教會掌控範圍內，點擊前請自行評估風險。</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#1E1B4B] mb-3 flex items-center gap-3">
                    <span className="text-[#B45309]">05.</span> 條款修訂
                  </h3>
                  <p className="text-justify">
                    本教會有權隨時修改本條款，修改後將直接公布於本網站，不另行個別通知。若您繼續使用本網站，即視為您已同意並接受修訂後的條款。
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