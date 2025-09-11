// studio/schemas/index.ts
import event from './event'
import monthlyPlan from './monthlyPlan'   // ← 新增
import registration from './registration'
import memberReport from './memberReport'
import groupReport from './groupReport'
import group from './group'
import member from './member'
import userRegistration from './userRegistration'
import donation from './donation'
import heroSlide from './heroSlide'

export const schemaTypes = [
  event,
  monthlyPlan,          // ← 新增到陣列（與行事曆平級的「本月主題」）
  registration,
  memberReport,
  groupReport,
  group,
  member,
  userRegistration,
  donation,
  heroSlide,
]
