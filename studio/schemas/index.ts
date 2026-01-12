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
import pageViewLog from './pageViewLog'

// ✅ 新增：引入主日信息的 schema
import sundayService from './sundayService'

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
  pageViewLog,
  
  // ✅ 新增：加入到列表
  sundayService,
]