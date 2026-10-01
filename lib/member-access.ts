import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { getServerSession } from 'next-auth/next'
import { createClient } from '@sanity/client'
import { authOptions } from '@/lib/auth-options'
import {
  DEFAULT_MEMBER_PAGE_LEVELS,
  hasMinimumRole,
  normalizeMemberRole,
  type MemberPageKey,
  type MemberRole,
} from '@/lib/member-roles'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-06-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN,
})

type CurrentMember = {
  _id: string
  isApproved: boolean
  role?: string
  authVersion?: number
  mustChangePassword?: boolean
}

export type MemberAccessState = {
  role: MemberRole
  pageAccess: Record<MemberPageKey, boolean>
  minimumLevels: Record<MemberPageKey, MemberRole>
  mustChangePassword: boolean
}

async function getAccessState(userId: string, sessionAuthVersion: number): Promise<MemberAccessState | null> {
  const [user, settings] = await Promise.all([
    client.fetch<CurrentMember | null>(
      `*[_type == "userRegistration" && _id == $userId][0]{_id, isApproved, role, authVersion, mustChangePassword}`,
      { userId }
    ),
    client.fetch<Partial<Record<MemberPageKey, string>> | null>(
      `*[_type == "memberAccessSettings" && _id == "memberAccessSettings"][0]{resources, sundayService, groupReport}`
    ),
  ])

  if (!user || user.isApproved !== true || (user.authVersion || 1) !== sessionAuthVersion) return null

  const role = normalizeMemberRole(user.role)
  const minimumLevels = {
    resources: normalizeMemberRole(settings?.resources || DEFAULT_MEMBER_PAGE_LEVELS.resources),
    sundayService: normalizeMemberRole(settings?.sundayService || DEFAULT_MEMBER_PAGE_LEVELS.sundayService),
    groupReport: normalizeMemberRole(settings?.groupReport || DEFAULT_MEMBER_PAGE_LEVELS.groupReport),
  }

  return {
    role,
    mustChangePassword: user.mustChangePassword === true,
    minimumLevels,
    pageAccess: {
      resources: hasMinimumRole(role, minimumLevels.resources),
      sundayService: hasMinimumRole(role, minimumLevels.sundayService),
      groupReport: hasMinimumRole(role, minimumLevels.groupReport),
    },
  }
}

export async function authorizeMemberPage(ctx: GetServerSidePropsContext, page: MemberPageKey) {
  const session = await getSession(ctx)

  if (!session?.user?.id) {
    return {
      allowed: false as const,
      redirect: `/auth/login?callbackUrl=${encodeURIComponent(ctx.resolvedUrl)}`,
    }
  }

  const access = await getAccessState(session.user.id, session.user.authVersion || 1)
  if (!access) {
    return { allowed: false as const, redirect: '/auth/login?error=SessionExpired' }
  }

  if (access.mustChangePassword) {
    return { allowed: false as const, redirect: '/member/change-password' }
  }

  if (!access.pageAccess[page]) {
    return { allowed: false as const, redirect: '/member/forbidden' }
  }

  return { allowed: true as const, access }
}

export async function getMemberApiAccess(
  req: NextApiRequest,
  res: NextApiResponse,
  page?: MemberPageKey
) {
  const session = await getServerSession(req, res, authOptions)
  if (!session?.user?.id) return { status: 401 as const, access: null }

  const access = await getAccessState(session.user.id, session.user.authVersion || 1)
  if (!access) return { status: 403 as const, access: null }
  if (access.mustChangePassword) return { status: 403 as const, access }
  if (page && !access.pageAccess[page]) return { status: 403 as const, access }

  return { status: 200 as const, access, session }
}

export async function getMemberLandingPath(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx)
  if (!session?.user?.id) return null

  const access = await getAccessState(session.user.id, session.user.authVersion || 1)
  if (!access) return null
  if (access.mustChangePassword) return '/member/change-password'
  if (access.pageAccess.resources) return '/member/resources'
  if (access.pageAccess.sundayService) return '/member/sunday-service'
  if (access.pageAccess.groupReport) return '/member/group-report'
  return '/member/forbidden'
}
