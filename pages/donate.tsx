// pages/donate.tsx
'use client';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React, { useState } from 'react';
import Head from 'next/head';

const DONATE_TYPES = [
  { value: '', label: '請選擇用途' },
  { value: '十一', label: '十一奉獻' },
  { value: '建堂', label: '建堂奉獻' },
  { value: '宣教', label: '宣教奉獻' },
  { value: '慈惠', label: '慈惠奉獻' },
  { value: '其他', label: '其他' },
];

export default function DonatePage() {
  const [form, setForm] = useState({
    name: '',
    amount: '',
    type: '',
    note: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitted(false);

    try {
      const res = await fetch('/api/donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: Number(form.amount) }),
      });
      if (!res.ok) {
        throw new Error('送出失敗，請稍後再試。');
      }
      setSubmitted(true);
      setForm({ name: '', amount: '', type: '', note: '' });
    } catch (err: any) {
      setError(err?.message || '發生未知錯誤');
    } finally {
      setLoading(false);
    }
  }

  return (
    // [配色計畫] 暖沙白 (#F9F8F6) × 靜謐岩灰 (#44403C) × 琥珀金 (#B45309)
    <div className="min-h-screen flex flex-col bg-[#F9F8F6] text-[#44403C] font-sans selection:bg-[#FEF3C7] selection:text-[#92400E]">
      <Head>
        <title>線上奉獻 | 南科福氣教會</title>
        <meta name="description" content="線上奉獻支持教會事工" />
      </Head>

      <NavBar />

      {/* ✅ 修正 1: 頂部 pt-28 (防剪裁)，底部 pb-12 */}
      <main className="flex-grow pt-28 md:pt-40 pb-12 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
          
          {/* --- Section 1: 標題區 (統一全站風格) --- */}
          {/* ✅ 修正 2: 底部間距縮小 mb-8 */}
          <div className="border-b border-[#D6D3D1] pb-6 md:pb-10 mb-8 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                <div className="flex items-center gap-3 mb-2 md:mb-4">
                   <div className="h-[1px] w-8 bg-[#B45309]"></div>
                   <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-[#B45309] uppercase">
                     Giving & Tithing
                   </span>
                </div>
                {/* ✅ 修正 3: 手機版標題 text-3xl */}
                <h1 className="text-3xl md:text-6xl font-serif font-bold text-[#292524] leading-tight">
                  線上奉獻
                </h1>
              </div>
              
              {/* 文字對齊：手機靠右，電腦靠左 */}
              <p className="max-w-md text-[#57534E] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                您的慷慨，是教會前進的動力。<br/>
                願神親自紀念您在主裡的擺上。
              </p>
            </div>
          </div>

          {/* --- Section 2: 內容網格 (雙欄佈局) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* 左側：銀行資訊卡 (Bank Info) */}
            <div className="lg:col-span-5 space-y-6">
              {/* ✅ 修正 4: 手機版內距 p-6 */}
              <div className="bg-[#E7E5E4] p-6 md:p-10 rounded-sm border border-[#D6D3D1] relative overflow-hidden">
                {/* 裝飾圓圈 */}
                <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
                
                <h3 className="text-lg md:text-xl font-serif font-bold text-[#292524] mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#B45309] rounded-full"></span>
                  銀行轉帳資訊
                </h3>
                
                <div className="space-y-4 font-mono text-sm md:text-base text-[#44403C]">
                  <div className="bg-white/50 p-4 rounded-sm border border-[#D6D3D1]/50">
                    <span className="block text-[10px] text-[#78716C] uppercase tracking-widest mb-1">Bank Name</span>
                    <span className="font-bold">050 臺灣企銀（善化分行）</span>
                  </div>
                  
                  <div className="bg-white/50 p-4 rounded-sm border border-[#D6D3D1]/50">
                    <span className="block text-[10px] text-[#78716C] uppercase tracking-widest mb-1">Account Name</span>
                    <span className="font-bold">臺南市南科美善福音協會吳俊男</span>
                  </div>

                  <div className="bg-[#292524] p-4 rounded-sm border border-[#292524] text-[#F9F8F6]">
                    <span className="block text-[10px] text-[#A8A29E] uppercase tracking-widest mb-1">Account Number</span>
                    <span className="font-bold text-xl md:text-2xl tracking-widest">702-12-175658</span>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-2 text-xs text-[#78716C] leading-relaxed">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p>轉帳後請務必填寫右側表單，或於備註欄位註明姓名及奉獻用途，以利財務同工開立收據。</p>
                </div>
              </div>

              {/* 聖經經文 */}
              <div className="hidden lg:block text-center py-8">
                <p className="font-serif italic text-[#57534E] text-lg mb-2">
                  "各人要隨本心所酌定的，<br/>不要作難，不要勉強，<br/>因為捐得樂意的人是神所喜愛的。"
                </p>
                <p className="text-xs font-bold tracking-widest text-[#B45309] uppercase">— 哥林多後書 9:7</p>
              </div>
            </div>

            {/* 右側：奉獻回報表單 (Form) */}
            <div className="lg:col-span-7">
              {/* ✅ 修正 5: 手機版內距 p-6 */}
              <div className="bg-white p-6 md:p-10 rounded-sm border border-[#E7E5E4] shadow-sm">
                <div className="mb-6 md:mb-8 border-b border-[#E7E5E4] pb-4">
                  <h2 className="text-xl md:text-2xl font-serif font-bold text-[#292524]">
                    奉獻指定 / 回報表單
                  </h2>
                  <p className="text-xs md:text-sm text-[#78716C] mt-2">請於轉帳完成後填寫此表單。</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6" autoComplete="off">
                  
                  {/* 金額 & 姓名 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label htmlFor="amount" className="block text-xs font-bold tracking-widest uppercase text-[#57534E]">
                        Amount (TWD) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        placeholder="例如：1000"
                        className="w-full bg-[#F9F8F6] border border-[#D6D3D1] rounded-sm px-4 py-3 text-[#292524] focus:outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] transition-all"
                        value={form.amount}
                        onChange={handleChange}
                        min={1}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-xs font-bold tracking-widest uppercase text-[#57534E]">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="真實姓名或奉獻編號"
                        className="w-full bg-[#F9F8F6] border border-[#D6D3D1] rounded-sm px-4 py-3 text-[#292524] focus:outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] transition-all"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 用途 & 備註 */}
                  <div className="space-y-2">
                    <label htmlFor="type" className="block text-xs font-bold tracking-widest uppercase text-[#57534E]">
                      Purpose <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="type"
                        name="type"
                        className="w-full appearance-none bg-[#F9F8F6] border border-[#D6D3D1] rounded-sm px-4 py-3 text-[#292524] focus:outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] transition-all"
                        value={form.type}
                        onChange={handleChange}
                        required
                      >
                        {DONATE_TYPES.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      {/* 自定義箭頭 */}
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#57534E]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  {form.type === '其他' && (
                    <div className="space-y-2 animate-fade-in">
                      <label htmlFor="note" className="block text-xs font-bold tracking-widest uppercase text-[#57534E]">
                        Note
                      </label>
                      <input
                        type="text"
                        id="note"
                        name="note"
                        placeholder="請說明奉獻用途"
                        className="w-full bg-[#F9F8F6] border border-[#D6D3D1] rounded-sm px-4 py-3 text-[#292524] focus:outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309] transition-all"
                        value={form.note}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  {/* 送出按鈕 */}
                  <button
                    type="submit"
                    className="w-full mt-4 py-3 md:py-4 bg-[#B45309] text-white text-xs md:text-sm font-bold tracking-[0.15em] uppercase rounded-sm hover:bg-[#92400E] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                  >
                    {loading ? 'PROCESSING...' : 'SUBMIT DONATION'}
                  </button>

                  {/* 訊息回饋 */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs md:text-sm text-center rounded-sm">
                      {error}
                    </div>
                  )}
                  {submitted && (
                    <div className="p-3 bg-green-50 border border-green-100 text-green-700 text-xs md:text-sm text-center rounded-sm flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      已收到您的奉獻資訊，願神紀念！
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}