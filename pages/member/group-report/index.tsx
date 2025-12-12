// pages/member/group-report/index.tsx
import React, { useState, useEffect } from 'react'
import type { GetServerSideProps } from 'next'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

// 以命名匯入的方式取出 Sanity client
import { client as sanityClient } from '@/lib/sanity.client'

interface MemberReport {
  memberId: string
  memberName: string
  identity: string
  devotion: boolean
  cellGroup: boolean
  sundayService: boolean
  prayerMeeting: boolean
  happinessGroup: boolean
  oikos: string
  discipleship: string
  note: string
}

const identityOptions = [
  { value: 'leader', label: '組長' },
  { value: 'parent', label: '家長' },
  { value: 'staff', label: '合心同工' },
  { value: 'member', label: '組員' },
]

function GroupReport() {
  const { status } = useSession()
  const router = useRouter()

  const [groupList, setGroupList] = useState<{ _id: string; name: string }[]>([])
  const [groupId, setGroupId] = useState<string>('')
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [reports, setReports] = useState<MemberReport[]>([])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [successMessage, setSuccessMessage] = useState<string>('')

  // 取得所有小組
  useEffect(() => {
    async function fetchGroups() {
      try {
        const data: { _id: string; name: string }[] = await sanityClient.fetch(
          `*[_type == "group"]{ _id, name }`
        )
        setGroupList(data)
        if (data.length) setGroupId(data[0]._id)
      } catch (err) {
        console.error('取得小組列表錯誤：', err)
        setErrorMessage('無法取得小組列表，請稍後再試')
      }
    }
    fetchGroups()
  }, [])

  // 當 groupId 變更時，抓成員並初始化 reports
  useEffect(() => {
    async function fetchMembersForGroup() {
      if (!groupId) {
        setReports([])
        return
      }
      try {
        const memberDocs: { _id: string; name: string }[] = await sanityClient.fetch(
          `*[_type == "member" && $groupId in groups[]._ref]{ _id, name }`,
          { groupId }
        )
        setReports(
          memberDocs.map((m) => ({
            memberId: m._id,
            memberName: m.name,
            identity: 'member',
            devotion: false,
            cellGroup: false,
            sundayService: false,
            prayerMeeting: false,
            happinessGroup: false,
            oikos: '',
            discipleship: '',
            note: '',
          }))
        )
      } catch (err) {
        console.error('取得組員列表錯誤：', err)
        setErrorMessage('無法取得該小組的組員，請稍後再試')
        setReports([])
      }
    }
    fetchMembersForGroup()
  }, [groupId])

  // 欄位更新
  const handleReportChange = (
    memberId: string,
    field:
      | 'identity'
      | 'devotion'
      | 'cellGroup'
      | 'sundayService'
      | 'prayerMeeting'
      | 'happinessGroup'
      | 'oikos'
      | 'discipleship'
      | 'note',
    value: any
  ) => {
    setReports((prev) =>
      prev.map((r) => (r.memberId === memberId ? { ...r, [field]: value } : r))
    )
  }

  // 提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (!groupId) {
      setErrorMessage('請先選擇小組')
      return
    }
    if (!reports.length) {
      setErrorMessage('此小組沒有可回報的組員')
      return
    }

    setIsSubmitting(true)
    try {
      const payload = {
        date,
        groupId,
        reports: reports.map((r) => ({
          member: r.memberId,
          identity: r.identity,
          devotion: r.devotion,
          cellGroup: r.cellGroup,
          sundayService: r.sundayService,
          prayerMeeting: r.prayerMeeting,
          happinessGroup: r.happinessGroup,
          oikos: r.oikos,
          discipleship: r.discipleship,
          note: r.note,
        })),
      }

      const res = await fetch('/api/group-report/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        setErrorMessage(data.message || '提交失敗')
      } else {
        setSuccessMessage('回報已成功提交！')
      }
    } catch (err) {
      console.error(err)
      setErrorMessage('提交異常，請稍後再試')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center text-[#1E1B4B]">載入中...</div>
  }

  // ----(桌機版欄寬控制)----
  const attendanceKeys = [
    'devotion',
    'cellGroup',
    'sundayService',
    'prayerMeeting',
    'happinessGroup',
  ] as const
  type AttendanceKey = typeof attendanceKeys[number]

  const tdWidthClass: Record<AttendanceKey, string> = {
    devotion: 'w-24',
    cellGroup: 'w-24',
    sundayService: 'w-24',
    prayerMeeting: 'w-24',
    happinessGroup: 'w-28',
  }

  // ----(手機版顯示)----
  const mobileKeys = [
    'devotion',
    'cellGroup',
    'sundayService',
    'prayerMeeting',
    'happinessGroup',
  ] as const
  type MobileKey = typeof mobileKeys[number]

  const mobileLabelMap: Record<MobileKey, string> = {
    devotion: '靈修',
    cellGroup: '小組',
    sundayService: '主日',
    prayerMeeting: '禱告',
    happinessGroup: '幸福',
  }

  return (
    // 全站統一米灰背景
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#C7D2FE] selection:text-[#1E1B4B]">
      <NavBar />

      <main className="flex-grow pt-28 md:pt-40 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* 標題區：極簡風格 */}
          <div className="mb-10 md:mb-14 border-b border-[#D4C5B5] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#B45309] font-bold tracking-[0.2em] text-xs uppercase block mb-2">
                Leader&apos;s Area
              </span>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1E1B4B]">
                小組長回報系統
              </h1>
            </div>
            <p className="text-[#64748B] text-sm">
              請忠心記錄，守望羊群。
            </p>
          </div>

          <div className="space-y-8">
            {errorMessage && (
              <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-sm shadow-sm flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-sm shadow-sm flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 控制面板 (日期與小組) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 日期選擇 */}
                <div className="bg-white p-6 md:p-8 rounded-sm border border-[#D4C5B5] shadow-sm">
                  <label htmlFor="date" className="block text-sm font-bold text-[#1E1B4B] mb-3 uppercase tracking-wide">
                    REPORT DATE
                  </label>
                  <input
                    id="date"
                    type="date"
                    className="w-full p-3 bg-[#F8FAFC] border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#1E1B4B] focus:border-[#1E1B4B] transition-all text-[#1E1B4B]"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                {/* 小組選擇 */}
                <div className="bg-white p-6 md:p-8 rounded-sm border border-[#D4C5B5] shadow-sm">
                  <label htmlFor="group" className="block text-sm font-bold text-[#1E1B4B] mb-3 uppercase tracking-wide">
                    SELECT GROUP
                  </label>
                  <div className="relative">
                    <select
                      id="group"
                      className="w-full p-3 bg-[#F8FAFC] border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#1E1B4B] focus:border-[#1E1B4B] transition-all text-[#1E1B4B] appearance-none"
                      value={groupId}
                      onChange={(e) => setGroupId(e.target.value)}
                      required
                    >
                      <option value="" className="text-gray-400">請選擇小組...</option>
                      {groupList.map((g) => (
                        <option key={g._id} value={g._id}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                    {/* 自定義箭頭 Icon */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#64748B]">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* 組員回報列表 */}
              {groupId && (
                <div className="bg-white rounded-sm border border-[#D4C5B5] shadow-md overflow-hidden">
                  <div className="bg-[#1E1B4B] px-6 py-4 border-b border-[#1E1B4B]">
                    <h2 className="text-white font-bold tracking-wider text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#FBBF24] rounded-full"></span>
                      MEMBER REPORT
                    </h2>
                  </div>

                  {/* 手機版：卡片式列表 */}
                  <div className="md:hidden divide-y divide-gray-100">
                    {reports.map((r) => (
                      <div key={r.memberId} className="p-5 bg-white space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-serif font-bold text-lg text-[#1E1B4B]">{r.memberName}</h3>
                          <select
                            className="text-sm py-1 px-2 border border-gray-300 rounded-sm bg-gray-50 text-[#475569]"
                            value={r.identity}
                            onChange={(e) => handleReportChange(r.memberId, 'identity', e.target.value)}
                          >
                            {identityOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>

                        {/* 出席勾選區：格狀排列 */}
                        <div className="grid grid-cols-3 gap-2">
                          {mobileKeys.map((key) => (
                            <label 
                              key={key} 
                              className={`
                                flex flex-col items-center justify-center p-2 rounded-sm border cursor-pointer transition-all
                                ${Boolean((r as any)[key]) 
                                  ? 'bg-[#1E1B4B] border-[#1E1B4B] text-white shadow-sm' 
                                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}
                              `}
                            >
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={Boolean((r as any)[key])}
                                onChange={(e) => handleReportChange(r.memberId, key, e.target.checked)}
                              />
                              <span className="text-xs font-bold">{mobileLabelMap[key]}</span>
                              {Boolean((r as any)[key]) && (
                                <svg className="w-3 h-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                              )}
                            </label>
                          ))}
                        </div>

                        {/* 狀態與備註 */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">Discipleship</label>
                            <select
                              className="w-full text-sm p-2 border border-gray-300 rounded-sm bg-white"
                              value={r.discipleship}
                              onChange={(e) => handleReportChange(r.memberId, 'discipleship', e.target.value)}
                            >
                              <option value="">- 門訓狀態 -</option>
                              <option value="door-up">門上</option>
                              <option value="door-down">門下</option>
                              <option value="bless-up">福上</option>
                              <option value="bless-down">福下</option>
                              <option value="done">完成</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-[10px] text-[#94A3B8] uppercase tracking-wider mb-1">OIKOS</label>
                            <select
                              className="w-full text-sm p-2 border border-gray-300 rounded-sm bg-white"
                              value={r.oikos}
                              onChange={(e) => handleReportChange(r.memberId, 'oikos', e.target.value)}
                            >
                              <option value="">- 關懷 -</option>
                              <option value="p">代禱</option>
                              <option value="l">LINE</option>
                              <option value="v">探訪</option>
                              <option value="m">幸福/講座</option>
                              <option value="f">聚餐</option>
                              <option value="t">旅遊</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-full text-sm p-2 border-b border-gray-300 bg-transparent focus:border-[#1E1B4B] focus:ring-0 placeholder-gray-400 transition-colors"
                            value={r.note}
                            onChange={(e) => handleReportChange(r.memberId, 'note', e.target.value)}
                            placeholder="備註..."
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 桌機版：簡潔表格 */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="min-w-full text-sm text-left">
                      <thead className="bg-[#F1F5F9] text-[#64748B] text-xs uppercase font-bold tracking-wider border-b border-gray-200">
                        <tr>
                          <th className="py-4 px-6">姓名</th>
                          <th className="py-4 px-2">身份</th>
                          {attendanceKeys.map((key) => (
                            <th key={key} className="py-4 px-2 text-center">{mobileLabelMap[key]}</th>
                          ))}
                          <th className="py-4 px-2 text-center">門訓</th>
                          <th className="py-4 px-2 text-center">OIKOS</th>
                          <th className="py-4 px-6">備註</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {reports.map((r) => (
                          <tr key={r.memberId} className="hover:bg-blue-50/30 transition-colors">
                            <td className="py-3 px-6 font-medium text-[#1E1B4B]">{r.memberName}</td>
                            <td className="py-3 px-2">
                              <select
                                className="w-full text-xs p-1.5 border border-gray-200 rounded-sm bg-white focus:border-[#1E1B4B]"
                                value={r.identity}
                                onChange={(e) => handleReportChange(r.memberId, 'identity', e.target.value)}
                              >
                                {identityOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </td>
                            {attendanceKeys.map((key) => (
                              <td key={key} className="py-3 px-2 text-center">
                                <label className="inline-flex items-center justify-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="w-5 h-5 text-[#1E1B4B] border-gray-300 rounded focus:ring-[#1E1B4B] cursor-pointer"
                                    checked={(r as any)[key]}
                                    onChange={(e) => handleReportChange(r.memberId, key, e.target.checked)}
                                  />
                                </label>
                              </td>
                            ))}
                            <td className="py-3 px-2">
                              <select
                                className="w-full text-xs p-1.5 border border-gray-200 rounded-sm bg-white focus:border-[#1E1B4B]"
                                value={r.discipleship}
                                onChange={(e) => handleReportChange(r.memberId, 'discipleship', e.target.value)}
                              >
                                <option value="">-</option>
                                <option value="door-up">門上</option>
                                <option value="door-down">門下</option>
                                <option value="bless-up">福上</option>
                                <option value="bless-down">福下</option>
                                <option value="done">完成</option>
                              </select>
                            </td>
                            <td className="py-3 px-2">
                              <select
                                className="w-full text-xs p-1.5 border border-gray-200 rounded-sm bg-white focus:border-[#1E1B4B]"
                                value={r.oikos}
                                onChange={(e) => handleReportChange(r.memberId, 'oikos', e.target.value)}
                              >
                                <option value="">-</option>
                                <option value="p">代禱</option>
                                <option value="l">LINE</option>
                                <option value="v">探訪</option>
                                <option value="m">講座</option>
                                <option value="f">聚餐</option>
                                <option value="t">旅遊</option>
                              </select>
                            </td>
                            <td className="py-3 px-6">
                              <input
                                type="text"
                                className="w-full text-xs p-1.5 border-b border-gray-200 bg-transparent focus:border-[#1E1B4B] focus:ring-0 placeholder-gray-300"
                                value={r.note}
                                onChange={(e) => handleReportChange(r.memberId, 'note', e.target.value)}
                                placeholder="備註..."
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 提交按鈕 */}
              <div className="mt-10 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !groupId}
                  className={`
                    px-12 py-4 rounded-sm text-sm font-bold tracking-[0.2em] uppercase shadow-lg transition-all duration-300
                    ${isSubmitting || !groupId
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#1E1B4B] text-white hover:bg-[#B45309] hover:shadow-xl hover:-translate-y-1'
                    }
                  `}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default GroupReport

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