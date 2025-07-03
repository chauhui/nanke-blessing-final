// studio/components/DonationStatsTool.tsx
import React, { useEffect, useState } from 'react'
import { groq } from 'next-sanity'
import { useClient } from 'sanity'

// 取得所有奉獻資料
const query = groq`
  *[_type == "donation"] {
    amount, type, createdAt, name
  }
`

export default function DonationStatsTool() {
  const client = useClient({ apiVersion: '2024-01-01' })
  const [data, setData] = useState<any[]>([])
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  useEffect(() => {
    client.fetch(query).then(setData)
  }, [client])

  // 取日期範圍
  const dateList = Array.from(
    new Set(
      data
        .map((d) => d.createdAt?.slice(0, 10))
        .filter(Boolean)
        .sort((a, b) => (a > b ? 1 : -1))
    )
  )
  const minDate = dateList[0]
  const maxDate = dateList[dateList.length - 1]
  const startDate = start || minDate
  const endDate = end || maxDate

  // 篩選資料
  const filtered = data.filter((d) => {
    const date = d.createdAt?.slice(0, 10)
    return (!startDate || date >= startDate) && (!endDate || date <= endDate)
  })

  // 分類統計
  const total = filtered.reduce((sum, d) => sum + (Number(d.amount) || 0), 0)
  const byType = filtered.reduce((acc, d) => {
    const key = d.type || '未分類'
    acc[key] = (acc[key] || 0) + (Number(d.amount) || 0)
    return acc
  }, {} as Record<string, number>)

  // 支援暗色模式
  const isDark =
    typeof window !== 'undefined' &&
    document.querySelector('[data-theme="dark"]')
  const bgColor = isDark ? '#202127' : '#fff'
  const fgColor = isDark ? '#fff' : '#222'
  const borderColor = isDark ? '#444' : '#ddd'

  return (
    <div
      style={{
        padding: 24,
        fontFamily: 'inherit',
        background: bgColor,
        color: fgColor,
        minHeight: 500,
        borderRadius: 16,
        maxWidth: 900,
        margin: '0 auto',
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>
        奉獻統計與明細
      </h2>
      {/* 篩選區 */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <label>起日</label>
        <select
          value={startDate}
          onChange={e => setStart(e.target.value)}
          style={{
            borderRadius: 4, border: `1px solid ${borderColor}`,
            padding: 4, background: bgColor, color: fgColor, minWidth: 120
          }}
        >
          {dateList.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <label>迄日</label>
        <select
          value={endDate}
          onChange={e => setEnd(e.target.value)}
          style={{
            borderRadius: 4, border: `1px solid ${borderColor}`,
            padding: 4, background: bgColor, color: fgColor, minWidth: 120
          }}
        >
          {dateList.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <span style={{ fontSize: 13, color: isDark ? '#aaa' : '#888' }}>（可篩選區間）</span>
      </div>
      {/* 總額與統計 */}
      <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 18 }}>
        區間奉獻總額：{total.toLocaleString()} 元
      </div>
      <table style={{
        width: '100%', borderCollapse: 'collapse', marginBottom: 18,
        background: isDark ? '#23232a' : '#f8f8fc', color: fgColor,
        borderRadius: 8, overflow: 'hidden'
      }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', fontWeight: 600, padding: 8, background: isDark ? '#23232a' : '#e7e7f5' }}>用途</th>
            <th style={{ textAlign: 'right', fontWeight: 600, padding: 8, background: isDark ? '#23232a' : '#e7e7f5' }}>金額</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(byType).map(([k, v]) => (
            <tr key={k}>
              <td style={{ padding: 8 }}>{k}</td>
              <td style={{ padding: 8, textAlign: 'right' }}>{v.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 明細列表 */}
      <div style={{ fontWeight: 700, margin: '18px 0 8px', fontSize: 17 }}>明細列表</div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%', borderCollapse: 'collapse',
          background: isDark ? '#1a1b20' : '#fff', color: fgColor, borderRadius: 8
        }}>
          <thead>
            <tr>
              <th style={{ padding: 8, background: isDark ? '#23232a' : '#f4f4f4' }}>日期</th>
              <th style={{ padding: 8, background: isDark ? '#23232a' : '#f4f4f4' }}>姓名/編號</th>
              <th style={{ padding: 8, background: isDark ? '#23232a' : '#f4f4f4', textAlign: 'right' }}>金額</th>
              <th style={{ padding: 8, background: isDark ? '#23232a' : '#f4f4f4' }}>用途</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d, i) => (
              <tr key={i} style={{
                background: isDark
                  ? (i % 2 === 0 ? '#23232a' : '#1a1b20')
                  : (i % 2 === 0 ? '#fff' : '#f8f8fc')
              }}>
                <td style={{ padding: 8 }}>{d.createdAt?.slice(0, 10) || '-'}</td>
                <td style={{ padding: 8 }}>{d.name}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>{d.amount?.toLocaleString()}</td>
                <td style={{ padding: 8 }}>{d.type || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 16, color: isDark ? '#bbb' : '#888', fontSize: 12 }}>
        若需進階報表（EXCEL）、匯出或月報，請聯絡工程師擴充需求。
      </div>
    </div>
  )
}
