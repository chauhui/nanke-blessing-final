import {useState, type FormEvent} from 'react'
import type {GetServerSideProps} from 'next'
import {getSession, signOut} from 'next-auth/react'

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (password.length < 8) return setError('密碼長度至少需要 8 個字元')
    if (password !== confirmPassword) return setError('兩次輸入的密碼不一致')

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/member/change-password', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({password}),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || '密碼更新失敗，請稍後再試')
        return
      }

      await signOut({callbackUrl: '/auth/login?passwordChanged=1'})
    } catch {
      setError('密碼更新失敗，請稍後再試')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2] px-4">
      <div className="bg-white border border-[#D4C5B5] p-8 md:p-10 rounded-sm shadow-lg w-full max-w-md">
        <span className="text-[#B45309] font-bold tracking-[0.2em] text-xs uppercase block mb-2">Secure Account</span>
        <h1 className="text-3xl font-bold text-[#1E1B4B] mb-3">設定您的新密碼</h1>
        <p className="text-sm leading-6 text-[#64748B] mb-7">您目前使用的是一次性臨時密碼。請設定只有您本人知道的新密碼，完成後需重新登入。</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}
          <label className="block">
            <span className="text-sm font-medium text-[#1E1B4B]">新密碼</span>
            <input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 block w-full border border-[#D4C5B5] px-4 py-3 rounded-sm outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-[#1E1B4B]">確認新密碼</span>
            <input type="password" required minLength={8} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="mt-2 block w-full border border-[#D4C5B5] px-4 py-3 rounded-sm outline-none focus:border-[#B45309] focus:ring-1 focus:ring-[#B45309]" />
          </label>
          <p className="text-xs text-[#64748B]">密碼長度至少 8 個字元，且不可與臨時密碼相同。</p>
          <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-[#1E1B4B] text-white font-bold rounded-sm hover:bg-[#B45309] transition-colors disabled:opacity-50">
            {isSubmitting ? '更新中...' : '設定新密碼'}
          </button>
        </form>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?callbackUrl=${encodeURIComponent('/member/change-password')}`,
        permanent: false,
      },
    }
  }
  return {props: {}}
}
