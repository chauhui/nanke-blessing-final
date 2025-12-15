import React, { useEffect, useState, forwardRef } from "react"
import type { Ref } from "react"
import { useClient } from "sanity"
import { Card, Heading, Box, Select, Text, Stack, Label } from "@sanity/ui"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

// 新增 title 欄位
type PageViewLog = {
  page: string
  title?: string // <--- 新增
  date: string
  country?: string
  referer?: string
  userAgent?: string
  host?: string
}

const PROD_HOST = "nanke-blessing.vercel.app"

/** 站內路由 → 中文名稱（舊資料或無標題時的備案） */
const ROUTE_NAME_MAP: Array<[RegExp, string]> = [
  [/^\/$/, "首頁"],
  [/^\/about(?:\/)?$/, "關於我們"],
  [/^\/about\/vision-mission\/?$/, "異象使命"],
  [/^\/about\/implementation\/?$/, "實踐方向"],
  [/^\/about\/strategy\/?$/, "策略說明"],
  [/^\/about\/core-values\/?$/, "核心價值"],
  [/^\/about\/groups\/?$/, "小組與團契"],
  [/^\/gatherings\/?$/, "課程資訊"],
  [/^\/courses(?:\/)?$/, "課程列表"],
  [/^\/courses\/teen-parenting\/?$/, "青少年親職課程"],
  [/^\/courses\/intimacy-journey\/?$/, "親密之旅課程"],
  [/^\/courses\/child-parenting\/?$/, "如何教養孩童課程"],
  [/^\/courses\/financial-wisdom\/?$/, "理財有道課程"],
  [/^\/courses\/children-character\/?$/, "品格教育課程"],
  [/^\/video(?:\/.*)?$/, "影音平台"],
  [/^\/member(?:\/)?$/, "會友專區"],
  [/^\/member\/meal\/?$/, "愛宴報名"],
  [/^\/member\/group-report\/?$/, "小組回報"],
  [/^\/auth\/login(?:.*)?$/, "登入頁"],
]

const COUNTRY_LABEL_MAP: Record<string, string> = {
  TW: "台灣",
  NZ: "紐西蘭",
  US: "美國",
  JP: "日本",
  CN: "中國",
  HK: "香港",
  SG: "新加坡",
  unknown: "未知",
  未知: "未知",
}

const DEVICE_LABEL_MAP: Record<string, string> = {
  Mobile: "手機",
  Desktop: "桌機",
}

function getInternalPathOrKeep(raw: string, host = PROD_HOST) {
  if (!raw) return ""
  try {
    const u = new URL(raw)
    return u.host === host ? u.pathname + u.search : raw
  } catch {
    return raw
  }
}

/** * 智慧顯示名稱：
 * 1. 如果 log 裡有存 title，優先用 title
 * 2. 如果沒有，則用 ROUTE_NAME_MAP 猜
 * 3. 最後才顯示網址
 */
function getSmartDisplayName(page: string, title: string | undefined, host = PROD_HOST) {
  // 如果有存下來的中文標題，直接回傳（去掉後面的 "- 南科福氣教會" 讓畫面乾淨點）
  if (title && title !== 'undefined') {
    return title.replace(' - 南科福氣教會', '').replace(' | 南科福氣教會', '')
  }

  const s = getInternalPathOrKeep(page, host)
  if (!s.startsWith("/")) return page || "-"

  for (const [re, name] of ROUTE_NAME_MAP) {
    if (re.test(s)) return name
  }
  return s
}

function PageViewStatsTool(_props: any, ref: Ref<HTMLDivElement>) {
  const client = useClient({ apiVersion: "2024-01-01" })
  const [data, setData] = useState<PageViewLog[]>([])
  const [pageFilter, setPageFilter] = useState("all")

  // 日期範圍（預設看最近 7 天）
  const todayStr = new Date().toISOString().slice(0, 10)
  const defaultStart = new Date(Date.now() - 6 * 24 * 3600 * 1000)
    .toISOString()
    .slice(0, 10)
  const [startDate, setStartDate] = useState(defaultStart)
  const [endDate, setEndDate] = useState(todayStr)

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const upd = () => setIsMobile(window.innerWidth <= 600)
    upd()
    window.addEventListener("resize", upd)
    return () => window.removeEventListener("resize", upd)
  }, [])

  useEffect(() => {
    const hostPrefix = `https://${PROD_HOST}*`
    // 查詢語法中加入 title
    client
      .fetch<PageViewLog[]>(
        `*[_type=="pageViewLog" 
           && date >= $start && date <= $end 
           && (
                host == $host 
                || (!defined(host) && defined(referer) && referer match $hostPrefix)
              )
          ]{
            page, title, date, country, referer, userAgent, host
          } | order(date asc)`,
        { start: startDate, end: endDate, host: PROD_HOST, hostPrefix }
      )
      .then(setData)
  }, [client, startDate, endDate])

  // ==== 統計計算 ====
  // 1. 整理所有出現過的頁面，並記錄該頁面最新的標題 (給下拉選單和列表用)
  const pageMeta: Record<string, string> = {}
  data.forEach(d => {
    if (d.title) pageMeta[d.page] = d.title
  })
  
  const uniquePages = Array.from(new Set(data.map((d) => d.page)))

  // 2. 每日流量 & 總流量統計
  const viewCountByDate: Record<string, number> = {}
  const viewCountByPage: Record<string, number> = {} // 頁面排行榜用

  const countryStat: Record<string, number> = {}
  const refererStat: Record<string, number> = {}
  const deviceStat: Record<string, number> = {}

  data.forEach((d) => {
    // 全域過濾器
    if (pageFilter !== "all" && d.page !== pageFilter) return

    // 圖表數據
    const dateKey = d.date // YYYY-MM-DD
    viewCountByDate[dateKey] = (viewCountByDate[dateKey] || 0) + 1

    // 排行榜數據 (只在沒有選特定頁面時統計排行，或者單頁統計)
    viewCountByPage[d.page] = (viewCountByPage[d.page] || 0) + 1

    // 詳細統計
    const c = d.country || "未知"
    const r = d.referer || "直接"
    const dv = d.userAgent?.includes("Mobile") ? "Mobile" : "Desktop"
    
    countryStat[c] = (countryStat[c] || 0) + 1
    refererStat[r] = (refererStat[r] || 0) + 1
    deviceStat[dv] = (deviceStat[dv] || 0) + 1
  })

  // 3. 準備圖表資料
  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.ceil((end.getTime() - start.getTime()) / 864e5) + 1
  const chartData: { date: string; views: number }[] = []
  
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 864e5)
    const dateKey = d.toISOString().slice(0, 10)
    chartData.push({ date: dateKey, views: viewCountByDate[dateKey] || 0 })
  }

  // 4. 準備頁面排行資料 (排序：瀏覽量高 -> 低)
  const sortedPageStats = Object.entries(viewCountByPage)
    .sort(([, a], [, b]) => b - a)
    .map(([pageUrl, count]) => ({
      url: pageUrl,
      name: getSmartDisplayName(pageUrl, pageMeta[pageUrl]),
      count
    }))

  const interval = chartData.length > 0 ? Math.max(0, Math.ceil(chartData.length / 7) - 1) : 0

  return (
    <Card padding={4} radius={4} ref={ref} tone="transparent">
      <Heading size={2}>網站瀏覽統計 ({PROD_HOST})</Heading>

      {/* 篩選控制器 */}
      <Box marginY={4} style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
        <Box>
          <Label size={1}>起始日期</Label>
          <Box marginTop={2}>
            <input
              type="date"
              value={startDate}
              max={endDate}
              onChange={(e) => setStartDate(e.currentTarget.value)}
              style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
          </Box>
        </Box>
        <Box>
          <Label size={1}>結束日期</Label>
          <Box marginTop={2}>
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={todayStr}
              onChange={(e) => setEndDate(e.currentTarget.value)}
              style={{ padding: '4px 8px', borderRadius: 4, border: '1px solid #ccc' }}
            />
          </Box>
        </Box>
        <Box>
          <Label size={1}>篩選單一頁面</Label>
          <Box marginTop={2}>
            <Select
              value={pageFilter}
              onChange={(e) => setPageFilter(e.currentTarget.value)}
              style={{ minWidth: 200 }}
            >
              <option value="all">全部頁面</option>
              {uniquePages.map((p) => (
                <option key={p} value={p}>
                  {getSmartDisplayName(p, pageMeta[p])}
                </option>
              ))}
            </Select>
          </Box>
        </Box>
      </Box>

      {/* 流量折線圖 */}
      <Card border padding={3} radius={3} style={{ background: 'white' }}>
        <Label size={1} muted>每日瀏覽趨勢</Label>
        <Box style={{ width: "100%", height: isMobile ? 220 : 320, marginTop: 16 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
              <XAxis
                dataKey="date"
                interval={interval}
                tickFormatter={(d) => d.slice(5).replace('-', '/')}
                tick={{ fontSize: 11, fill: '#666' }}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                allowDecimals={false} 
                tick={{ fontSize: 11, fill: '#666' }} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ borderRadius: 4, border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: '#666', marginBottom: 4 }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#2276FC"
                strokeWidth={3}
                dot={{ r: 3, fill: '#2276FC', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>

      {/* 詳細資料區塊 */}
      <Box marginY={4} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: 24 }}>
        
        {/* 左側：熱門頁面排行 (新功能) */}
        <Card border radius={3} padding={3}>
          <Label size={1} muted>熱門頁面排行 (Top Pages)</Label>
          <Box marginTop={3} style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 300 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                  <th style={{ padding: 8, fontSize: 12 }}>頁面名稱</th>
                  <th style={{ padding: 8, fontSize: 12 }}>瀏覽次數</th>
                </tr>
              </thead>
              <tbody>
                {sortedPageStats.slice(0, 20).map((row, idx) => (
                  <tr key={row.url} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: 8 }}>
                      <Text size={1} weight="semibold" style={{ color: '#2276FC' }}>
                        {row.name}
                      </Text>
                      <Text size={0} muted style={{ marginTop: 2 }}>
                        {getInternalPathOrKeep(row.url)}
                      </Text>
                    </td>
                    <td style={{ padding: 8 }}>
                      <Text weight="bold">{row.count}</Text>
                    </td>
                  </tr>
                ))}
                {sortedPageStats.length === 0 && (
                  <tr><td colSpan={2} style={{ padding: 20, textAlign: 'center', color: '#999' }}>尚無資料</td></tr>
                )}
              </tbody>
            </table>
          </Box>
        </Card>

        {/* 右側：其他統計 (國家/來源/裝置) */}
        <Stack space={4}>
          <Card border radius={3} padding={3}>
            <Label size={1} muted>裝置分佈</Label>
            <Box marginTop={3}>
              {Object.entries(deviceStat).map(([k, v]) => (
                <Box key={k} marginBottom={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text size={1}>{DEVICE_LABEL_MAP[k] || k}</Text>
                  <Text size={1} weight="bold">{v}</Text>
                </Box>
              ))}
            </Box>
          </Card>

          <Card border radius={3} padding={3}>
            <Label size={1} muted>訪客國家</Label>
            <Box marginTop={3}>
              {Object.entries(countryStat).map(([k, v]) => (
                <Box key={k} marginBottom={2} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text size={1}>{COUNTRY_LABEL_MAP[k] || k}</Text>
                  <Text size={1} weight="bold">{v}</Text>
                </Box>
              ))}
            </Box>
          </Card>
        </Stack>
      </Box>

    </Card>
  )
}

export default forwardRef<HTMLDivElement, any>(PageViewStatsTool)