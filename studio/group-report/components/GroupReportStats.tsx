import React, { useState, useEffect } from 'react'
import { Card, Flex, Text, Box, Badge, Grid, Stack } from '@sanity/ui'
import type { SanityClient, SanityDocument } from '@sanity/client'

// 擴展 Window 介面以包含 sanityClient
interface CustomWindow extends Window {
  sanityClient: SanityClient
}
declare const window: CustomWindow

// 型別
interface Group { _id: string; _type: string; name: string }
interface Member { _id: string; _type: string; name: string }
interface ReportItem { oikos?: string; member?: Member }
interface Report extends SanityDocument { _id: string; date: string; group: Group; reports: ReportItem[] }
interface GroupStat { name: string; count: number }
interface RecentReport { group: string; date: string; count: number }
interface OikosStats {
  total: number
  byType: { p: number; l: number; v: number; m: number; f: number; t: number }
}
interface Stats {
  totalReports: number
  thisWeek: number
  lastWeek: number
  groups: GroupStat[]
  recentReports: RecentReport[]
  oikosStats: OikosStats
}

export default function GroupReportStats() {
  const [stats, setStats] = useState<Stats>({
    totalReports: 0,
    thisWeek: 0,
    lastWeek: 0,
    groups: [],
    recentReports: [],
    oikosStats: { total: 0, byType: { p: 0, l: 0, v: 0, m: 0, f: 0, t: 0 } },
  })

  // 使用 window.sanityClient
  const client = typeof window !== 'undefined' ? window.sanityClient : null

  useEffect(() => {
    if (!client) return

    const fetchStats = async () => {
      try {
        // 取回所有 groupReport（僅修正 GROQ 括號配對）
        const reports = await client.fetch<Report[]>(
          `*[_type == "groupReport" && defined(reports)]{
              _id,
              date,
              group,
              reports[]{ member, oikos }
            } | order(date desc)`
        )

        const statsData: Stats = {
          totalReports: reports.length,
          thisWeek: 0,
          lastWeek: 0,
          groups: [],
          recentReports: [],
          oikosStats: { total: 0, byType: { p: 0, l: 0, v: 0, m: 0, f: 0, t: 0 } },
        }

        const now = new Date()
        const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000
        const twoWeeksAgo = oneWeekAgo - 7 * 24 * 60 * 60 * 1000
        const groupStats: Record<string, number> = {}
        const recentReports: Report[] = []

        reports.forEach((report) => {
          if (!report || !report.reports) return

          const reportDate = report.date ? new Date(report.date) : new Date()
          const ts = reportDate.getTime()

          if (ts > oneWeekAgo) statsData.thisWeek++
          else if (ts >= twoWeeksAgo) statsData.lastWeek++

          if (report.group) {
            const groupName = report.group.name || '未知小組'
            groupStats[groupName] = (groupStats[groupName] || 0) + 1
          }

          if (Array.isArray(report.reports)) {
            report.reports.forEach((r) => {
              if (!r || !r.oikos) return
              statsData.oikosStats.total++
              switch (r.oikos) {
                case 'p': statsData.oikosStats.byType.p++; break
                case 'l': statsData.oikosStats.byType.l++; break
                case 'v': statsData.oikosStats.byType.v++; break
                case 'm': statsData.oikosStats.byType.m++; break
                case 'f': statsData.oikosStats.byType.f++; break
                case 't': statsData.oikosStats.byType.t++; break
              }
            })
          }

          if (recentReports.length < 3) recentReports.push(report)
        })

        statsData.groups = Object.entries(groupStats).map(([name, count]) => ({ name, count }))
        statsData.recentReports = recentReports.map((r) => ({
          group: r.group?.name || '未知小組',
          date: r.date,
          count: r.reports?.length || 0,
        }))

        setStats(statsData)
      } catch (err) {
        console.error('Failed to fetch group report stats:', err)
      }
    }

    fetchStats()
  }, [client])

  return (
    <Box padding={4} className="grp-stats">
      {/* 只在暗色＋行動裝置時提升對比；範圍限定 grp-stats，不影響其他頁/桌面 */}
      <style>{`
        @media (prefers-color-scheme: dark) and (max-width: 820px) {
          .grp-stats {
            --grp-fg: var(--card-fg-color);
            --grp-muted: var(--card-muted-fg-color);
            --grp-surface: var(--card-bg-color);
            --grp-border: var(--card-border-color);
          }
          .grp-stats .hc-card {
            background: var(--grp-surface) !important;
            border: 1px solid var(--grp-border) !important;
          }
          .grp-stats .hc-title { color: var(--grp-fg) !important; opacity: .98; }
          .grp-stats .hc-muted { color: var(--grp-muted) !important; opacity: .95; }
          .grp-stats .hc-strong { color: var(--grp-fg) !important; }
        }
      `}</style>

      <Grid columns={[1, 1, 2, 3]} gap={3} style={{ marginBottom: '1rem' }}>
        <Card padding={3} radius={2} shadow={1} border className="hc-card">
          <Flex align="center" justify="space-between">
            <Box>
              <Text size={[1, 1, 2]} weight="semibold" className="hc-title">總回報數</Text>
              <Text size={[5, 5, 6]} weight="bold" className="hc-strong">{stats.totalReports}</Text>
            </Box>
            <Badge tone="primary" padding={2} radius={2} fontSize={1}>全部</Badge>
          </Flex>
        </Card>

        <Card padding={3} radius={2} shadow={1} border className="hc-card">
          <Flex align="center" justify="space-between">
            <Box>
              <Text size={[1, 1, 2]} weight="semibold" className="hc-title">本週回報</Text>
              <Text size={[5, 5, 6]} weight="bold" className="hc-strong">{stats.thisWeek}</Text>
            </Box>
            <Badge tone="positive" padding={2} radius={2} fontSize={1}>本週</Badge>
          </Flex>
        </Card>

        <Card padding={3} radius={2} shadow={1} border className="hc-card">
          <Flex align="center" justify="space-between">
            <Box>
              <Text size={[1, 1, 2]} weight="semibold" className="hc-title">上週回報</Text>
              <Text size={[5, 5, 6]} weight="bold" className="hc-strong">{stats.lastWeek}</Text>
            </Box>
            <Badge tone="caution" padding={2} radius={2} fontSize={1}>上週</Badge>
          </Flex>
        </Card>
      </Grid>

      <Grid columns={[1, 1, 2]} gap={4}>
        <Card padding={3} radius={2} shadow={1} border className="hc-card">
          <Text size={[1, 1, 2]} weight="semibold" style={{ marginBottom: 12 }} className="hc-title">
            各小組回報統計
          </Text>
          <Stack space={2}>
            {stats.groups.map((group) => (
              <Flex key={group.name} align="center" justify="space-between" paddingY={2}>
                <Text size={[1, 1, 2]} className="hc-strong" style={{ flex: 1 }}>
                  {group.name}
                </Text>
                <Badge tone="primary" paddingX={2} radius={2} fontSize={1}>
                  {group.count}
                </Badge>
              </Flex>
            ))}
          </Stack>
        </Card>

        <Card padding={3} radius={2} shadow={1} border className="hc-card">
          <Text size={[1, 1, 2]} weight="semibold" style={{ marginBottom: 12 }} className="hc-title">
            最近回報
          </Text>
          <Stack space={2}>
            {stats.recentReports.map((report, index) => (
              <Flex key={index} align="center" justify="space-between" paddingY={2}>
                <Box>
                  <Text size={[1, 1, 2]} weight="medium" className="hc-strong">
                    {report.group}
                  </Text>
                  <Text size={[1, 1, 1]} className="hc-muted">
                    {report.date}
                  </Text>
                </Box>
                <Badge tone="primary" paddingX={2} radius={2} fontSize={1}>
                  {report.count} 筆
                </Badge>
              </Flex>
            ))}
          </Stack>
        </Card>
      </Grid>
    </Box>
  )
}
