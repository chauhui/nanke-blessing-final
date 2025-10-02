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
import testimony from './testimony'   // ← 新增生命見證 schema

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
  testimony,        // ← 加入生命見證
]
