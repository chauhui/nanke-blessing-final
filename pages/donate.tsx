import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import React, { useState } from 'react';

const DONATE_TYPES = [
  { value: '', label: '請選擇用途' },
  { value: '十一', label: '十一' },
  { value: '建堂', label: '建堂' },
  { value: '宣教', label: '宣教' },
  { value: '慈惠', label: '慈惠' },
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
    <>
      <NavBar />

      <main className="min-h-screen pt-28 pb-16 bg-gradient-to-b from-white to-gray-50">
        <section className="container mx-auto max-w-xl bg-white rounded-2xl shadow border border-gray-100 p-8 text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-2 tracking-tight">線上奉獻</h1>
          <p className="text-base text-gray-500 mb-8">
            謝謝您支持南科福氣教會。請選擇您方便的奉獻方式。
          </p>

          <div className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-800 mb-2">銀行轉帳／ATM</h2>
            <div className="text-gray-700 mb-1">戶名：臺南市南科美善福音協會吳俊男</div>
            <div className="text-gray-700 mb-1">銀行：050 臺灣企銀（善化分行）</div>
            <div className="text-gray-700 mb-2 tracking-widest">帳號：702-12-175658</div>
            <div className="text-gray-400 text-xs">＊備註請填寫奉獻用途及姓名</div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto text-left border-t border-gray-200 pt-8"
            autoComplete="off"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">指定用途奉獻表單</h3>
            <div className="mb-4">
              <label className="block mb-1 text-gray-600" htmlFor="amount">奉獻金額（元）</label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
                value={form.amount}
                onChange={handleChange}
                min={1}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-600" htmlFor="name">姓名（奉獻編號）</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-600" htmlFor="type">奉獻用途</label>
              <select
                id="type"
                name="type"
                className="w-full border border-gray-200 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
                value={form.type}
                onChange={handleChange}
                required
              >
                {DONATE_TYPES.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            {form.type === '其他' && (
              <div className="mb-4">
                <label className="block mb-1 text-gray-600" htmlFor="note">用途說明</label>
                <input
                  type="text"
                  id="note"
                  name="note"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400"
                  value={form.note}
                  onChange={handleChange}
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full mt-2 py-2 rounded bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
              disabled={loading}
            >
              {loading ? '送出中...' : '送出奉獻資訊'}
            </button>
            {error && (
              <div className="mt-4 text-red-600 text-center">{error}</div>
            )}
            {submitted && (
              <div className="mt-4 text-green-600 text-center">
                已收到您的奉獻指定資訊（如需收據請聯絡同工）。
              </div>
            )}
          </form>

          <p className="mt-8 text-xs text-gray-400 text-center">
            需要奉獻收據、用途指定，或有其他問題，請與教會聯絡。
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
