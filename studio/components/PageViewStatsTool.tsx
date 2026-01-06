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

// 定義資料型態
type PageViewLog = {
  page: string
  title?: string
  date: string
  country?: string
  referer?: string
  userAgent?: string
  host?: string
}

const PROD_HOST = "nanke-blessing.vercel.app"

/** * 站內路由 → 中文名稱對照表 (依照你提供的清單更新)
 * 正則表達式說明： \/?$ 表示網址最後有沒有斜線都可以 (例如 /meal 和 /meal/ 都算)
 */
const ROUTE_NAME_MAP: Array<[RegExp, string]> = [
  [/^\/$/, "首頁"], // 你清單未列出，但我幫你補上，通常 / 就是首頁
  [/^\/about\/vision-mission\/?$/, "異象與使命"],
  [/^\/about\/implementation\/?$/, "實行之路"],
  [/^\/about\/strategy\/?$/, "教會策略"],
  [/^\/about\/core-values\/?$/, "核心價值"],
  [/^\/about\/gatherings\/?$/, "成全聚會"],
  [/^\/courses\/teen-parenting\/?$/, "如何教養青少年"],
  [/^\/courses\/child-parenting\/?$/, "如何教養孩童"],
  [/^\/courses\/intimacy-journey\/?$/, "親密之旅"],
  [/^\/courses\/financial-wisdom\/?$/, "理財有道"],
  [/^\/courses\/children-character\/?$/, "兒童品格班"],
  [/^\/video\/church-intro\/?$/, "教會簡介"],
  [/^\/video\/happy-group\/?$/, "幸福小組花絮"],
  [/^\/event-registration\/?$/, "活動報名"],
  [/^\/meal\/?$/, "愛宴系統"],
  [/^\/member\/group-report\/?$/, "小組長回報系統"],
  [/^\/donate\/?$/, "線上奉獻"],
  // --- 以下為系統保留或備用路由 ---
  [/^\/auth\/login(?:.*)?$/, "登入頁"],
  [/^\/member(?:\/)?$/, "會友專區"], 
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
 * 1. 優先查表 (ROUTE_NAME_MAP) -> 解決舊資料顯示 Generic Title 的問題
 * 2. 其次看 DB 存的 Title (但過濾掉 "南科福氣教會")
 * 3. 最後顯示網址
 */
function getSmartDisplayName(page: string, title: string | undefined, host = PROD_HOST) {
  const s = getInternalPathOrKeep(page, host)

  // 1. 優先比對人工翻譯表 (最強制)
  for (const [re, name] of ROUTE_NAME_MAP) {
    if (re.test(s)) return name
  }

  // 2. 如果表裡沒有，才看資料庫存的 Title
  // 關鍵修正：如果標題只是 "南科福氣教會"，視為無效資訊，不顯示
  if (title && title !== 'undefined') {
    const cleanTitle = title.replace(' - 南科福氣教會', '').replace(' | 南科福氣教會', '').trim()
    // 如果清乾淨後跟 "南科福氣教會" 一模一樣，或是空的，就跳過
    if (cleanTitle && cleanTitle !== '南科福氣教會') {
      return cleanTitle
    }
  }

  // 3. 真的沒輒了，顯示網址路徑
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
  const pageMeta: Record<string, string> = {}
  data.forEach(d => {
    if (d.title) pageMeta[d.page] = d.title
  })
  
  const uniquePages = Array.from(new Set(data.map((d) => d.page)))

  const viewCountByDate: Record<string, number> = {}
  const viewCountByPage: Record<string, number> = {} 

  const countryStat: Record<string, number> = {}
  const refererStat: Record<string, number> = {}
  const deviceStat: Record<string, number> = {}

  data.forEach((d) => {
    if (pageFilter !== "all" && d.page !== pageFilter) return

    const dateKey = d.date
    viewCountByDate[dateKey] = (viewCountByDate[dateKey] || 0) + 1
    viewCountByPage[d.page] = (viewCountByPage[d.page] || 0) + 1

    const c = d.country || "未知"
    const r = d.referer || "直接"
    const dv = d.userAgent?.includes("Mobile") ? "Mobile" : "Desktop"
    
    countryStat[c] = (countryStat[c] || 0) + 1
    refererStat[r] = (refererStat[r] || 0) + 1
    deviceStat[dv] = (deviceStat[dv] || 0) + 1
  })

  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.ceil((end.getTime() - start.getTime()) / 864e5) + 1
  const chartData: { date: string; views: number }[] = []
  
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 864e5)
    const dateKey = d.toISOString().slice(0, 10)
    chartData.push({ date: dateKey, views: viewCountByDate[dateKey] || 0 })
  }

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

      <Box marginY={4} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', gap: 24 }}>
        
        {/* 熱門頁面排行 */}
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

        {/* 其他統計 */}
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