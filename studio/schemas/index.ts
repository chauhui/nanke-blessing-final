// studio/schemas/index.ts
import event from './event'
import monthlyPlan from './monthlyPlan'
import registration from './registration'
import memberReport from './memberReport'
import groupReport from './groupReport'
import group from './group'
import member from './member'
import userRegistration from './userRegistration'
import donation from './donation'
import heroSlide from './heroSlide'
import testimony from './testimony'
// 👇 重點：引入 pageViewLog
import pageViewLog from './pageViewLog'

export const schemaTypes = [
  event,
  monthlyPlan,
  registration,
  memberReport,
  groupReport,
  group,
  member,
  userRegistration,
  donation,
  heroSlide,
  testimony,
  // 👇 重點：加入 pageViewLog 到列表
  pageViewLog,
]