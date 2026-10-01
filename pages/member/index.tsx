import type { GetServerSideProps } from 'next'
import { getMemberLandingPath } from '@/lib/member-access'

export default function MemberIndex() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await getMemberLandingPath(ctx)

  return {
    redirect: {
      destination: destination || `/auth/login?callbackUrl=${encodeURIComponent('/member')}`,
      permanent: false,
    },
  }
}
