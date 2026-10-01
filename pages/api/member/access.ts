import type { NextApiRequest, NextApiResponse } from 'next'
import { getMemberApiAccess } from '@/lib/member-access'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const authorization = await getMemberApiAccess(req, res)
  if (authorization.status !== 200) {
    return res.status(authorization.status).json({ error: authorization.status === 401 ? 'Unauthorized' : 'Forbidden' })
  }

  return res.status(200).json({
    role: authorization.access.role,
    pageAccess: authorization.access.pageAccess,
    minimumLevels: authorization.access.minimumLevels,
  })
}
