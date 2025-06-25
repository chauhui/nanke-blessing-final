// pages/member/group-report/index.tsx
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

// **注意：這裡以「命名匯入(client)」的方式取出 Sanity client**
import { client as sanityClient } from '@/lib/sanity.client';

interface MemberReport {
  memberId: string;    // 真正的 member document _id
  memberName: string;  // 畫面呈現用的「組員姓名」
  identity: string;
  devotion: boolean;
  cellGroup: boolean;
  sundayService: boolean;
  prayerMeeting: boolean;
  happinessGroup: boolean;
  oikos: string;
  discipleship: string; 
  note: string;
}

const identityOptions = [
  { value: 'leader', label: '組長' },
  { value: 'parent', label: '家長' },
  { value: 'staff', label: '合心同工' },
  { value: 'member', label: '組員' },
];

function GroupReport() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [groupList, setGroupList] = useState<{ _id: string; name: string }[]>([]);
  const [groupId, setGroupId] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [reports, setReports] = useState<MemberReport[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  // 未登入時導回
  useEffect(() => {
    if (status === 'unauthenticated' && typeof window !== 'undefined' && window.location.pathname !== '/auth/login') {
      const callbackUrl = encodeURIComponent(router.asPath);
      router.replace(`/auth/login?callbackUrl=${callbackUrl}`);
    }
    if (status === 'authenticated' && typeof window !== 'undefined' && window.location.pathname === '/auth/login') {
      const cb = new URLSearchParams(window.location.search).get('callbackUrl');
      if (cb) window.location.href = decodeURIComponent(cb);
    }
  }, [status, router]);

  // 取所有小組
  useEffect(() => {
    async function fetchGroups() {
      try {
        const data: { _id: string; name: string }[] = await sanityClient.fetch(
          `*[_type == "group"]{ _id, name }`
        );
        setGroupList(data);
        if (data.length) setGroupId(data[0]._id);
      } catch (err) {
        console.error('取得小組列表錯誤：', err);
        setErrorMessage('無法取得小組列表，請稍後再試');
      }
    }
    fetchGroups();
  }, []);

  // 當 groupId 變更時，抓成員並初始化 reports
  useEffect(() => {
    async function fetchMembersForGroup() {
      if (!groupId) {
        setReports([]);
        return;
      }
      try {
        const memberDocs: { _id: string; name: string }[] = await sanityClient.fetch(
          `*[_type == "member" && $groupId in groups[]._ref]{ _id, name }`,
          { groupId }
        );
        setReports(
          memberDocs.map(m => ({
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
        );
      } catch (err) {
        console.error('取得組員列表錯誤：', err);
        setErrorMessage('無法取得該小組的組員，請稍後再試');
        setReports([]);
      }
    }
    fetchMembersForGroup();
  }, [groupId]);

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
    setReports(prev =>
      prev.map(r =>
        r.memberId === memberId ? { ...r, [field]: value } : r
      )
    );
  };

  // 提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (!groupId) {
      setErrorMessage('請先選擇小組');
      return;
    }
    if (!reports.length) {
      setErrorMessage('此小組沒有可回報的組員');
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        date,
        groupId,
        reports: reports.map(r => ({
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
      };
      const res = await fetch('/api/group-report/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message || '提交失敗');
      } else {
        setSuccessMessage('回報已成功提交！');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('提交異常，請稍後再試');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status !== 'authenticated') {
    return <div className="p-4 text-center">載入中...</div>;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* 標題與訊息 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              小組長回報系統
            </h1>
            <div className="w-24 h-1.5 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              請填寫組員本週聚會出席與關懷狀況
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md">
            {errorMessage && (
              <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 回報日期 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                  回報日期
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      日期
                    </label>
                    <input
                      id="date"
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 選擇小組 */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                  選擇小組
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <label htmlFor="group" className="block text-sm font-medium text-gray-700 mb-2">
                      選擇小組
                    </label>
                    <select
                      id="group"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors"
                      value={groupId}
                      onChange={e => setGroupId(e.target.value)}
                      required
                    >
                      <option value="" className="text-gray-500">
                        請選擇小組
                      </option>
                      {groupList.map(g => (
                        <option key={g._id} value={g._id} className="text-gray-800">
                          {g.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* 組員回報 */}
              {groupId && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                    組員回報
                  </h2>

                  {/* 手機版：卡片列表 */}
                  <div className="md:hidden space-y-4">
                    {reports.map(r => (
                      <div
                        key={r.memberId}
                        className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium text-base text-gray-900">
                            {r.memberName}
                          </h3>
                          <select
                            className="text-base p-1.5 border border-gray-300 rounded-md"
                            value={r.identity}
                            onChange={e =>
                              handleReportChange(r.memberId, 'identity', e.target.value)
                            }
                          >
                            {identityOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-wrap gap-3 text-base">
                          {['devotion', 'cellGroup', 'sundayService', 'prayerMeeting', 'happinessGroup'].map(
                            key => (
                              <label key={key} className="flex items-center space-x-1 whitespace-nowrap">
                                <input
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                  checked={(r as any)[key]}
                                  onChange={e =>
                                    handleReportChange(
                                      r.memberId,
                                      key as any,
                                      e.target.checked
                                    )
                                  }
                                />
                                <span>
                                  {{
                                    devotion: '靈修',
                                    cellGroup: '小組',
                                    sundayService: '主日',
                                    prayerMeeting: '禱告',
                                    happinessGroup: '幸福小組',
                                  }[key]}
                                </span>
                              </label>
                            )
                          )}
                        </div>
                        <div className="mt-3 space-y-2">
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              門訓系統
                            </label>
                            <select
                              className="w-full p-1.5 text-sm border border-gray-300 rounded-md"
                              value={r.discipleship}
                              onChange={e =>
                                handleReportChange(
                                  r.memberId,
                                  'discipleship',
                                  e.target.value
                                )
                              }
                            >
                              <option value="">-</option>
                              <option value="door-up">門上</option>
                              <option value="door-down">門下</option>
                              <option value="bless-up">福上</option>
                              <option value="bless-down">福下</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              OIKOS
                            </label>
                            <select
                              className="w-full p-1.5 text-sm border border-gray-300 rounded-md"
                              value={r.oikos}
                              onChange={e =>
                                handleReportChange(r.memberId, 'oikos', e.target.value)
                              }
                            >
                              <option value="">-</option>
                              <option value="p">代禱</option>
                              <option value="l">LINE</option>
                              <option value="v">探訪</option>
                              <option value="m">幸福講座</option>
                              <option value="f">聚餐</option>
                              <option value="t">旅遊</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">
                              備註
                            </label>
                            <input
                              type="text"
                              className="w-full p-1.5 text-sm border border-gray-300 rounded-md"
                              value={r.note}
                              onChange={e =>
                                handleReportChange(r.memberId, 'note', e.target.value)
                              }
                              placeholder="輸入備註"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 桌機版：表格 */}
                  <div className="hidden md:block">
                    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                      <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="py-4 px-4 text-left font-medium text-gray-900 border-b border-gray-200 w-36">
                              組員
                            </th>
                            <th className="py-4 px-4 text-left font-medium text-gray-900 border-b border-gray-200 w-28">
                              身份
                            </th>
                            <th className="py-4 px-3 text-center font-medium text-gray-900 border-b border-gray-200 w-20">
                              靈修
                            </th>
                            <th className="py-4 px-3 text-center font-medium text-gray-900 border-b border-gray-200 w-20">
                              小組
                            </th>
                            <th className="py-4 px-3 text-center font-medium text-gray-900 border-b border-gray-200 w-20">
                              主日
                            </th>
                            <th className="py-4 px-3 text-center font-medium text-gray-900 border-b border-gray-200 w-20">
                              禱告
                            </th>
                            <th className="py-4 px-3 text-center font-medium text-gray-900 border-b border-gray-200 w-24">
                              幸福小組
                            </th>
                            <th className="py-4 px-3 text-center font-medium text-gray-900 border-b border-gray-200 w-28">
                              門訓系統
                            </th>
                            <th className="py-4 px-3 text-center font-medium text-gray-900 border-b border-gray-200 w-28">
                              OIKOS
                            </th>
                            <th className="py-4 px-4 text-left font-medium text-gray-900 border-b border-gray-200 w-40">
                              備註
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {reports.map(r => (
                            <tr key={r.memberId} className="hover:bg-gray-50">
                              <td className="py-4 px-4 text-gray-900 border-b border-gray-100">
                                {r.memberName}
                              </td>
                              <td className="py-4 px-3 border-b border-gray-100">
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  value={r.identity}
                                  onChange={e =>
                                    handleReportChange(
                                      r.memberId,
                                      'identity',
                                      e.target.value
                                    )
                                  }
                                >
                                  {identityOptions.map(opt => (
                                    <option
                                      key={opt.value}
                                      value={opt.value}
                                      className="text-gray-900"
                                    >
                                      {opt.label}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              {['devotion','cellGroup','sundayService','prayerMeeting','happinessGroup'].map(
                                key => (
                                  <td
                                    key={key}
                                    className="py-3 px-3 text-center border-b border-gray-100"
                                  >
                                    <input
                                      type="checkbox"
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                      checked={(r as any)[key]}
                                      onChange={e =>
                                        handleReportChange(
                                          r.memberId,
                                          key as any,
                                          e.target.checked
                                        )
                                      }
                                    />
                                  </td>
                                )
                              )}
                              <td className="py-3 px-3 border-b border-gray-100">
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  value={r.discipleship}
                                  onChange={e =>
                                    handleReportChange(
                                      r.memberId,
                                      'discipleship',
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="" className="text-gray-500">
                                    -
                                  </option>
                                  <option value="door-up" className="text-gray-900">
                                    門上
                                  </option>
                                  <option value="door-down" className="text-gray-900">
                                    門下
                                  </option>
                                  <option value="bless-up" className="text-gray-900">
                                    福上
                                  </option>
                                  <option value="bless-down" className="text-gray-900">
                                    福下
                                  </option>
                                </select>
                              </td>
                              <td className="py-3 px-3 border-b border-gray-100">
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  value={r.oikos}
                                  onChange={e =>
                                    handleReportChange(r.memberId, 'oikos', e.target.value)
                                  }
                                >
                                  <option value="" className="text-gray-500">
                                    -
                                  </option>
                                  <option value="p" className="text-gray-900">
                                    代禱
                                  </option>
                                  <option value="l" className="text-gray-900">
                                    LINE
                                  </option>
                                  <option value="v" className="text-gray-900">
                                    探訪
                                  </option>
                                  <option value="m" className="text-gray-900">
                                    幸福講座
                                  </option>
                                  <option value="f" className="text-gray-900">
                                    聚餐
                                  </option>
                                  <option value="t" className="text-gray-900">
                                    旅遊
                                  </option>
                                </select>
                              </td>
                              <td className="py-4 px-4 border-b border-gray-100">
                                <input
                                  type="text"
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  value={r.note}
                                  onChange={e =>
                                    handleReportChange(r.memberId, 'note', e.target.value)
                                  }
                                  placeholder="輸入備註"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-10 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || !groupId}
                  className={`inline-flex items-center justify-center px-8 py-3 rounded-full text-white font-medium text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600'
                  }`}
                >
                  {isSubmitting ? '提交中…' : '提交回報'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default GroupReport;
