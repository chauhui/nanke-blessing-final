import { useState, type FormEvent } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage('')
    setError('')

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) setError(data.error || '申請失敗，請稍後再試')
      else setMessage(data.message)
    } catch {
      setError('申請失敗，請稍後再試')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2] px-4">
      <div className="bg-white border border-[#D4C5B5] p-8 md:p-10 rounded-sm shadow-lg w-full max-w-md">
        <span className="text-[#B45309] font-bold tracking-[0.2em] text-xs uppercase block mb-2">Password Reset</span>
        <h1 className="text-3xl font-bold text-[#1E1B4B] mb-3">忘記密碼</h1>
        <p className="text-sm leading-6 text-[#64748B] mb-7">輸入註冊時使用的電子郵件。管理員確認身分後，會透過電話、LINE 或其他約定方式提供一次性臨時密碼。</p>

        {message ? (
          <div className="p-4 bg-green-50 border border-green-200 text-green-800 text-sm leading-6 mb-6">{message}</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
            <label className="block">
              <span className="text-sm font-medium text-[#1E1B4B]">電子郵件</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 block w-full border border-[#D4C5B5] px-4 py-3 rounded-sm outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]"
              />
            </label>
            <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#1E1B4B] text-white font-bold rounded-sm hover:bg-[#B45309] transition-colors disabled:opacity-50">
              {isSubmitting ? '送出中...' : '送出重設申請'}
            </button>
          </form>
        )}

        <Link href="/auth/login" className="block mt-6 text-center text-sm text-[#64748B] hover:text-[#B45309]">返回會員登入</Link>
      </div>
    </div>
  )
}
