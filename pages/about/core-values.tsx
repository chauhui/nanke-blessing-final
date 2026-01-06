// pages/about/core-values.tsx
'use client';

import NavBar from '@/components/NavBar';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function CoreValuesPage() {
  
  const coreValues = [
    {
      id: "01",
      title: "教會是神愛的大家庭",
      engTitle: "God's Family",
      content: [
        "你可以在這裡找到安全感、歸屬感、價值感",
        "你可以在這裡被接納、被愛、被珍惜",
        "全心愛神、彼此相愛、彼此相顧"
      ],
      verse: "你們要彼此相愛，像我愛你們一樣",
      ref: "約翰福音 15:12"
    },
    {
      id: "02",
      title: "教會是醫治身心靈的醫院",
      engTitle: "Healing Hospital",
      content: [
        "透過一對一服事，帶下深度的醫治",
        "在家人的愛、接納與扶持中重新得力",
        "操練內在生活，經歷全人的恢復"
      ],
      verse: "醫治傷心的人，纏裹他們的傷處",
      ref: "詩篇 147:3"
    },
    {
      id: "03",
      title: "教會是裝備我們的學校",
      engTitle: "Equipping School",
      content: [
        "真理造就課程｜建立信仰根基",
        "內在生活課程｜深化與神關係",
        "門徒訓練課程｜培育屬靈品格",
        "領袖訓練課程｜承接託付使命"
      ],
      verse: "為要成全聖徒，各盡其職，建立基督的身體",
      ref: "以弗所書 4:12"
    },
    {
      id: "04",
      title: "教會成全我們成為上帝的同工",
      engTitle: "Co-workers",
      content: [
        "成為基督的精兵，為主打那美好的仗",
        "作得勝者，一同建造榮耀的基督身體",
      ],
      verse: "為要成全聖徒，各盡其職，建立基督的身體",
      ref: "以弗所書 4:12"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#334155] font-sans selection:bg-[#94A3B8] selection:text-white">
      <Head>
        <title>教會核心價值 | 南科福氣教會</title>
        <meta name="description" content="教會是家、是醫院、是學校、也是軍隊。了解南科福氣教會的核心價值。" />
      </Head>

      <NavBar />

      {/* ✅ 保持 pt-28 頂部安全距離 */}
      <main className="pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-20">
        
        {/* --- Section 1: 標題區 --- */}
        <section className="container mx-auto px-6 lg:px-12 mb-8 md:mb-16">
          <div className="border-b border-[#94A3B8] pb-6 md:pb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#64748B] mb-2 md:mb-4 uppercase">
                  Core Values
                </span>
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1E293B] leading-tight">
                  核心價值
                </h1>
              </div>
              
              {/* ✅ 修正 1: 統一改為 text-right md:text-left，與其他頁面風格一致 */}
              <p className="max-w-xl text-[#475569] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                我們的信念決定了我們的文化。<br/>
                在這四個價值中，我們看見<span className="text-[#1E293B] border-b border-[#94A3B8]">教會的樣式</span>。
              </p>
            </div>
          </div>
        </section>

        {/* --- Section 2: 核心價值網格 --- */}
        <section className="container mx-auto px-6 lg:px-12">
          
          <div className="flex items-center gap-4 mb-6 md:mb-10">
             <div className="h-[1px] w-8 md:w-12 bg-[#1E293B]"></div>
             <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#1E293B] uppercase">Our Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#94A3B8] border border-[#94A3B8]">
            
            {coreValues.map((item, index) => (
              <div 
                key={item.id} 
                // ✅ 修正 2: 手機版內距縮減為 p-6 (24px)，電腦版維持 p-12
                className={`
                  group bg-[#F7F5F2] p-6 lg:p-12 hover:bg-white transition-all duration-500 relative flex flex-col min-h-[360px] lg:min-h-[400px]
                `}
              >
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#B45309] group-hover:w-1.5 transition-all duration-300"></div>

                {/* Header */}
                <div className="flex justify-between items-start mb-6 md:mb-8">
                   <span className="text-4xl md:text-5xl font-serif font-light text-[#CBD5E1] group-hover:text-[#1E293B] transition-colors duration-500">
                     {item.id}
                   </span>
                   <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#64748B] py-1 px-3 border border-[#CBD5E1] rounded-full group-hover:border-[#B45309] group-hover:text-[#B45309] transition-colors">
                     {item.engTitle}
                   </span>
                </div>

                {/* Content */}
                <div className="mb-8 md:mb-10 flex-grow">
                   <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#1E293B] mb-4 md:mb-6 group-hover:translate-x-2 transition-transform duration-300">
                     {item.title}
                   </h3>
                   
                   <div className="space-y-2 md:space-y-3">
                     {item.content.map((line, idx) => (
                       <div key={idx} className="flex items-start gap-3">
                         <span className="mt-2 w-1.5 h-1.5 bg-[#94A3B8] rotate-45 flex-shrink-0 opacity-60 group-hover:bg-[#B45309] transition-colors"></span>
                         <p className="text-[#475569] leading-relaxed text-sm font-medium">
                           {line}
                         </p>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 md:pt-6 border-t border-[#CBD5E1] group-hover:border-[#94A3B8] transition-colors duration-500">
                   <p className="font-serif italic text-[#334155] text-xs md:text-sm opacity-90">
                     "{item.verse}"
                   </p>
                   <p className="text-[10px] md:text-xs text-[#64748B] mt-1.5 md:mt-2 font-bold uppercase tracking-wide">
                     — {item.ref}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Section 3: 頁尾呼召 --- */}
        <section className="container mx-auto px-6 lg:px-12 mt-12 md:mt-24 mb-12">
           <div className="border-t border-[#94A3B8] pt-12 md:pt-16 flex flex-col items-center text-center">
              <h2 className="text-2xl md:text-4xl font-serif font-medium text-[#1E293B] mb-4 md:mb-6">
                歡迎回家
              </h2>
              <p className="text-[#475569] mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
                教會是家、是醫院、是學校、也是軍隊。<br/>
                在這裡，我們一起經歷生命的更新。
              </p>
              
              {/* ✅ 修改重點：連結改為 Line 官方帳號連結 */}
              <a 
                href="https://lin.ee/nQ7s6dC" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <button className="bg-[#1E293B] text-white hover:bg-[#334155] px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-bold tracking-widest transition-colors duration-300 uppercase shadow-lg shadow-[#1E293B]/20">
                  JOIN US TODAY
                </button>
              </a>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}