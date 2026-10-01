export const MEMBER_ROLES = ['member', 'coworker', 'groupLeader', 'elder'] as const

export type MemberRole = (typeof MEMBER_ROLES)[number]
export type MemberPageKey = 'resources' | 'sundayService' | 'groupReport'

export const MEMBER_ROLE_LABELS: Record<MemberRole, string> = {
  member: '一般會員',
  coworker: '合心同工',
  groupLeader: '小組長',
  elder: '長老',
}

export const DEFAULT_MEMBER_PAGE_LEVELS: Record<MemberPageKey, MemberRole> = {
  resources: 'member',
  sundayService: 'member',
  groupReport: 'groupLeader',
}

const MEMBER_ROLE_RANK: Record<MemberRole, number> = {
  member: 1,
  coworker: 2,
  groupLeader: 3,
  elder: 4,
}

export function normalizeMemberRole(role?: string | null): MemberRole {
  return MEMBER_ROLES.includes(role as MemberRole) ? (role as MemberRole) : 'member'
}

export function hasMinimumRole(role: MemberRole, minimumRole: MemberRole) {
  return MEMBER_ROLE_RANK[role] >= MEMBER_ROLE_RANK[minimumRole]
}
