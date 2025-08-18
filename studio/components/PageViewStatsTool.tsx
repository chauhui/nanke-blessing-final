import React, { useEffect, useState, forwardRef } from "react"
import type { Ref } from "react"
import { useClient } from "sanity"
import type { PaneComponentProps } from "sanity"
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

function normHost(log: PageViewLog) {
  if (log.host) return log.host
  if (log.referer) {
    try {
      const u = new URL(log.referer)
      return u.host
    } catch { /* ignore */ }
  }
  return "(unknown)"
}

function PageViewStatsTool(
  props: PaneComponentProps,
  ref: Ref<HTMLDivElement>
) {
  const client = useClient({ apiVersion: "2024-01-01" })
  const [data, setData] = useState<PageViewLog[]>([])
  const [page, setPage] = useState("all")
  const [host, setHost] = useState("all")

  const todayStr = new Date().toISOString().slice(0, 10)
  const defaultStart = new Date(Date.now() - 29 * 24 * 3600 * 1000)
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

  // ★ 不再在 GROQ 先按 host 篩掉，統一抓回來再過濾，避免看不到資料
  useEffect(() => {
    client
      .fetch<PageViewLog[]>(
        `*[_type=="pageViewLog" && date >= $start && date <= $end]{
           page,date,country,referer,userAgent,host
         } | order(date asc)`,
        { start: startDate, end: endDate }
      )
      .then(setData)
      .catch((e) => {
        console.error("fetch pageViewLog failed:", e)
        setData([])
      })
  }, [client, startDate, endDate])

  // 依選擇的 host/page 過濾
  const filtered = data.filter(d => {
    const h = normHost(d)
    if (host !== "all" && h !== host) return false
    if (page !== "all" && d.page !== page) return false
    return true
  })

  const pages = Array.from(new Set(filtered.map((d) => d.page)))
  const hosts = Array.from(new Set(data.map(normHost))).sort()

  // 每日瀏覽量
  const bucket: Record<string, number> = {}
  filtered.forEach(d => {
    const key = `${d.date}-${d.page}`
    bucket[key] = (bucket[key] || 0) + 1
  })
  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / 864e5) + 1)
  const chartData: { date: string; views: number }[] = []
  for (let i = 0; i < days; i++) {
    const d = new Date(start.getTime() + i * 864e5)
    const dateKey = d.toISOString().slice(0, 10)
    let views = 0
    if (page === "all") {
      views = pages.reduce((sum, p) => sum + (bucket[`${dateKey}-${p}`] || 0), 0)
    } else {
      views = bucket[`${dateKey}-${page}`] || 0
    }
    chartData.push({ date: dateKey, views })
  }

  const interval = Math.max(1, Math.ceil(chartData.length / (isMobile ? 4 : 12)))

  // 統計列表
  const countryStat: Record<string, number> = {}
  const refererStat: Record<string, number> = {}
  const deviceStat: Record<string, number> = {}
  filtered.forEach((d) => {
    const c = d.country || "未知"
    const r = d.referer || "直接"
    const dv = d.userAgent?.includes("Mobile") ? "Mobile" : "Desktop"
    countryStat[c] = (countryStat[c] || 0) + 1
    refererStat[r] = (refererStat[r] || 0) + 1
    deviceStat[dv] = (deviceStat[dv] || 0) + 1
  })

  return (
    <Card padding={4} radius={4} ref={ref}>
      <Heading>網站瀏覽統計 Dashboard</Heading>

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
          <label>來源網域：</label>
          <Select value={host} onChange={(e) => setHost(e.currentTarget.value)} style={{ minWidth: 200 }}>
            <option value="all">全部</option>
            {hosts.map(h => <option key={h} value={h}>{h}</option>)}
          </Select>
        </Box>
        <Box>
          <label>頁面：</label>
          <Select value={page} onChange={(e) => setPage(e.currentTarget.value)} style={{ minWidth: 160 }}>
            <option value="all">全部</option>
            {Array.from(new Set(filtered.map(d => d.page))).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </Select>
        </Box>
      </Box>

      {/* 圖表 */}
      <Box style={{ width: '100%', height: isMobile ? 240 : 360 }}>
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
              tickFormatter={(d) => {
                const x = new Date(d)
                return `${x.getMonth() + 1}/${x.getDate()}`
              }}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              minTickGap={isMobile ? 20 : 0}
              textAnchor={isMobile ? 'middle' : 'end'}
            />
            <YAxis allowDecimals={false} />
            <Tooltip wrapperStyle={{ fontSize: isMobile ? 12 : 14 }} cursor={false} />
            <Line type="monotone" dataKey="views" stroke="#8884d8" dot={false} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* 簡要統計 */}
      <Box marginY={isMobile ? 2 : 4} style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <Box>
          <Text weight="bold">國家：</Text>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {Object.entries(countryStat).map(([k, v]) => (
              <li key={k}><Text>{k}: {v}</Text></li>
            ))}
          </ul>
        </Box>
        <Box>
          <Text weight="bold">來源：</Text>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {Object.entries(refererStat).map(([k, v]) => (
              <li key={k}><Text>{k}: {v}</Text></li>
            ))}
          </ul>
        </Box>
        <Box>
          <Text weight="bold">裝置：</Text>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {Object.entries(deviceStat).map(([k, v]) => (
              <li key={k}><Text>{k}: {v}</Text></li>
            ))}
          </ul>
        </Box>
      </Box>
    </Card>
  )
}

export default forwardRef<HTMLDivElement, PaneComponentProps>(PageViewStatsTool)
