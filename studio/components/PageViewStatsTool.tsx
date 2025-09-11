// studio/components/PageViewStatsTool.tsx
import React, { useEffect, useState, forwardRef } from "react"
import type { Ref } from "react"
import { useClient } from "sanity"
import { Card, Heading, Box, Select, Text } from "@sanity/ui"
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

type PageViewLog = {
  page: string
  date: string
  country?: string
  referer?: string
  userAgent?: string
  host?: string
}

const PROD_HOST = "nanke-blessing.vercel.app"

/** 站內路由 → 中文名稱（可自由擴充） */
const ROUTE_NAME_MAP: Array<[RegExp, string]> = [
  [/^\/$/, "首頁"],
  [/^\/about(?:\/)?$/, "關於我們"],
  [/^\/about\/vision-mission$/, "異象使命"],
  [/^\/about\/implementation$/, "實踐方向"],
  [/^\/gatherings$/, "課程資訊"],
  [/^\/video(?:\/.*)?$/, "影音平台"],
  [/^\/member(?:\/)?$/, "會友專區"],
  [/^\/member\/meal$/, "愛宴報名"],
  [/^\/member\/group-report$/, "小組回報"],
  [/^\/auth\/login(?:.*)?$/, "登入頁"], // 含 callbackUrl
]

/** 取站內路徑（把同站完整網址轉為 pathname+search；否則回傳原字串） */
function getInternalPathOrKeep(raw: string, host = PROD_HOST) {
  if (!raw) return ""
  try {
    const u = new URL(raw)
    return u.host === host ? u.pathname + u.search : raw
  } catch {
    // raw 不是完整 URL，可能已經是路徑
    return raw
  }
}

/** 將路徑/網址轉為中文名稱（站外來源維持原字串） */
function toDisplayName(raw: string, host = PROD_HOST) {
  const s = getInternalPathOrKeep(raw, host)
  // 站外：不是以 / 開頭，又不是本站網址 ⇒ 直接回傳原字串
  if (!s.startsWith("/")) return raw || "-"

  // 站內：用 map 找到第一個符合的中文名稱
  for (const [re, name] of ROUTE_NAME_MAP) {
    if (re.test(s)) return name
  }
  // 找不到就回傳路徑本身（至少不是一長串網址）
  return s
}

function PageViewStatsTool(_props: any, ref: Ref<HTMLDivElement>) {
  const client = useClient({ apiVersion: "2024-01-01" })
  const [data, setData] = useState<PageViewLog[]>([])
  const [page, setPage] = useState("all")

  // 日期範圍
  const todayStr = new Date().toISOString().slice(0, 10)
  const defaultStart = new Date(Date.now() - 29 * 24 * 3600 * 1000)
    .toISOString()
    .slice(0, 10)
  const [startDate, setStartDate] = useState(defaultStart)
  const [endDate, setEndDate] = useState(todayStr)

  // 手機判定
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const upd = () => setIsMobile(window.innerWidth <= 600)
    upd()
    window.addEventListener("resize", upd)
    return () => window.removeEventListener("resize", upd)
  }, [])

  // 只抓正式站資料（兼容舊資料：referer 前綴判斷）
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
            page,date,country,referer,userAgent,host
          } | order(date asc)`,
        { start: startDate, end: endDate, host: PROD_HOST, hostPrefix }
      )
      .then(setData)
  }, [client, startDate, endDate])

  // ==== 統計資料 ====
  const pages = Array.from(new Set(data.map((d) => d.page)))

  // 每日 views（依 page 篩選）
  const viewCount: Record<string, number> = {}
  data.forEach((d) => {
    if (page !== "all" && d.page !== page) return
    const key = `${d.date}-${d.page}`
    viewCount[key] = (viewCount[key] || 0) + 1
  })

  // 產生日期序列
  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.ceil((end.getTime() - start.getTime()) / 864e5) + 1
  const chartData: { date: string; views: number }[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 864e5)
    const dateKey = d.toISOString().slice(0, 10)
    let views = 0
    if (page === "all") {
      views = pages.reduce(
        (sum, p) => sum + (viewCount[`${dateKey}-${p}`] || 0),
        0
      )
    } else {
      views = viewCount[`${dateKey}-${page}`] || 0
    }
    chartData.push({ date: dateKey, views })
  }

  // X 軸密度
  const interval = Math.max(1, Math.ceil(chartData.length / (isMobile ? 4 : 12)))

  // 國家 / 來源 / 裝置 統計（顯示名稱轉換放在 render）
  const countryStat: Record<string, number> = {}
  const refererStat: Record<string, number> = {}
  const deviceStat: Record<string, number> = {}
  data.forEach((d) => {
    if (page !== "all" && d.page !== page) return
    const c = d.country || "未知"
    // 來源保留原始字串，render 再轉中文
    const r = d.referer || "直接"
    const dv = d.userAgent?.includes("Mobile") ? "Mobile" : "Desktop"
    countryStat[c] = (countryStat[c] || 0) + 1
    refererStat[r] = (refererStat[r] || 0) + 1
    deviceStat[dv] = (deviceStat[dv] || 0) + 1
  })

  return (
    <Card padding={4} radius={4} ref={ref}>
      <Heading>網站瀏覽統計 Dashboard（{PROD_HOST}）</Heading>

      {/* 篩選區 */}
      <Box marginY={3} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Box>
          <label>起始：</label>
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.currentTarget.value)}
          />
        </Box>
        <Box>
          <label>結束：</label>
          <input
            type="date"
            value={endDate}
            min={startDate}
            max={todayStr}
            onChange={(e) => setEndDate(e.currentTarget.value)}
          />
        </Box>
        <Box>
          <label>頁面：</label>
          <Select
            value={page}
            onChange={(e) => setPage(e.currentTarget.value)}
            style={{ minWidth: 180 }}
          >
            <option value="all">全部</option>
            {pages.map((p) => (
              <option key={p} value={p}>
                {toDisplayName(p, PROD_HOST)}（{getInternalPathOrKeep(p, PROD_HOST) || p}）
              </option>
            ))}
          </Select>
        </Box>
      </Box>

      {/* 圖表 */}
      <Box style={{ width: "100%", height: isMobile ? 240 : 360 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: isMobile ? 30 : 60, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={interval}
              height={isMobile ? 40 : 60}
              tickFormatter={(dateStr) => {
                const d = new Date(dateStr)
                return `${d.getMonth() + 1}/${d.getDate()}`
              }}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              minTickGap={isMobile ? 20 : 0}
              textAnchor={isMobile ? "middle" : "end"}
            />
            <YAxis allowDecimals={false} />
            <Tooltip wrapperStyle={{ fontSize: isMobile ? 12 : 14 }} cursor={false} />
            <Line type="monotone" dataKey="views" stroke="#8884d8" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* 統計列表 */}
      <Box marginY={isMobile ? 2 : 4} style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <Box>
          <Text weight="bold">國家：</Text>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {Object.entries(countryStat).map(([k, v]) => (
              <li key={k}>
                <Text>
                  {k}: {v}
                </Text>
              </li>
            ))}
          </ul>
        </Box>
        <Box>
          <Text weight="bold">來源：</Text>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {Object.entries(refererStat).map(([raw, v]) => (
              <li key={raw}>
                <Text title={raw}>
                  {toDisplayName(raw, PROD_HOST)}: {v}
                </Text>
              </li>
            ))}
          </ul>
        </Box>
        <Box>
          <Text weight="bold">裝置：</Text>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {Object.entries(deviceStat).map(([k, v]) => (
              <li key={k}>
                <Text>
                  {k}: {v}
                </Text>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Card>
  )
}

export default forwardRef<HTMLDivElement, any>(PageViewStatsTool)
