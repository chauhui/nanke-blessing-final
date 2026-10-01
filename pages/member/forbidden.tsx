import type { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B]">
      <NavBar />
      <main className="flex-grow pt-32 md:pt-44 pb-20 px-4 flex items-start justify-center">
        <div className="w-full max-w-2xl bg-white border border-[#D4C5B5] rounded-sm p-10 md:p-14 text-center shadow-lg">
          <span className="text-[#B45309] font-bold tracking-[0.2em] text-xs uppercase block mb-3">Access Restricted</span>
          <p className="text-[#64748B] leading-7 mb-8">您的帳號目前沒有進入此頁面的權限。如有需要，請聯繫網站管理員。</p>
          <Link href="/member" className="inline-block px-8 py-3 bg-[#1E1B4B] text-white font-bold rounded-sm hover:bg-[#B45309] no-underline transition-colors">返回會友專區</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?callbackUrl=${encodeURIComponent(ctx.resolvedUrl)}`,
        permanent: false,
      },
    }
  }
  return { props: {} }
}
