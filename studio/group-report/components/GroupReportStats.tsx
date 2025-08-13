import React, { useState, useEffect } from 'react'
import { Card, Flex, Text, Box, Badge, Grid, Stack } from '@sanity/ui'
import type { SanityClient, SanityDocument } from '@sanity/client'

// 擴展 Window 介面以包含 sanityClient
interface CustomWindow extends Window {
  sanityClient: SanityClient
}
declare const window: CustomWindow

// ===== 型別 =====
interface Group { _id: string; _type: string; name: string }
interface Member { _id: string; _type: string; name: string }

// OIKOS 與門訓的鍵（做為嚴格 union）
type OikosKey = 'p' | 'l' | 'v' | 'm' | 'f' | 't'
type DiscipleshipKey = 'door-up' | 'door-down' | 'bless-up' | 'bless-down' | 'done'

interface ReportItem {
  member?: Member
  // 出席
  devotion?: boolean
  cellGroup?: boolean
  sundayService?: boolean
  prayerMeeting?: boolean
  happinessGroup?: boolean
  // OIKOS / 門訓
  oikos?: OikosKey | ''
  discipleship?: DiscipleshipKey | ''
}
interface Report extends SanityDocument { _id: string; date: string; group: Group; reports: ReportItem[] }
interface GroupStat { name: string; count: number }
interface RecentReport { group: string; date: string; count: number }

interface OikosStats {
  total: number
  byType: Record<OikosKey, number>
}
interface AttendStats {
  devotion: number
  cellGroup: number
  sundayService: number
  prayerMeeting: number
  happinessGroup: number
}
type DsDist = Record<DiscipleshipKey, number>
interface DsStats { total: number; dist: DsDist }

interface Stats {
  totalReports: number
  thisWeek: number
  lastWeek: number
  groups: GroupStat[]
  recentReports: RecentReport[]
  oikosStats: OikosStats
  attend: AttendStats
  discipleship: DsStats
}

// 型別守衛
const isOikosKey = (x: string): x is OikosKey =>
  (['p', 'l', 'v', 'm', 'f', 't'] as const).includes(x as OikosKey)

const isDsKey = (x: string): x is DiscipleshipKey =>
  (['door-up', 'door-down', 'bless-up', 'bless-down', 'done'] as const).includes(x as DiscipleshipKey)

export default function GroupReportStats() {
  const [stats, setStats] = useState<Stats>({
    totalReports: 0,
    thisWeek: 0,
    lastWeek: 0,
    groups: [],
    recentReports: [],
    oikosStats: { total: 0, byType: { p: 0, l: 0, v: 0, m: 0, f: 0, t: 0 } },
    attend: { devotion: 0, cellGroup: 0, sundayService: 0, prayerMeeting: 0, happinessGroup: 0 },
    discipleship: { total: 0, dist: { 'door-up': 0, 'door-down': 0, 'bless-up': 0, 'bless-down': 0, done: 0 } },
  })

  // 使用 window.sanityClient
  const client = typeof window !== 'undefined' ? window.sanityClient : null

  useEffect(() => {
    if (!client) return

    const fetchStats = async () => {
      try {
        // 把需要的欄位一次取齊（含 discipleship）
        const reports = await client.fetch<Report[]>(
          `*[_type == "groupReport" && defined(reports)]{
            _id,
            date,
            group,
            reports[]{
              member,
              devotion,
              cellGroup,
              sundayService,
              prayerMeeting,
              happinessGroup,
              oikos,
              discipleship
            }
          } | order(date desc)`
        )

        const statsData: Stats = {
          totalReports: reports.length,
          thisWeek: 0,
          lastWeek: 0,
          groups: [],
          recentReports: [],
          oikosStats: { total: 0, byType: { p: 0, l: 0, v: 0, m: 0, f: 0, t: 0 } },
          attend: { devotion: 0, cellGroup: 0, sundayService: 0, prayerMeeting: 0, happinessGroup: 0 },
          discipleship: { total: 0, dist: { 'door-up': 0, 'door-down': 0, 'bless-up': 0, 'bless-down': 0, done: 0 } },
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
              if (!r) return

              // 五項出席
              if (r.devotion) statsData.attend.devotion++
              if (r.cellGroup) statsData.attend.cellGroup++
              if (r.sundayService) statsData.attend.sundayService++
              if (r.prayerMeeting) statsData.attend.prayerMeeting++
              if (r.happinessGroup) statsData.attend.happinessGroup++

              // 門訓系統：凡有值就算（含 done）
              const dsRaw = (r.discipleship || '').trim()
              if (isDsKey(dsRaw)) {
                statsData.discipleship.total++
                statsData.discipleship.dist[dsRaw] += 1
              }

              // OIKOS
              const oikosRaw = (r.oikos || '').trim()
              if (isOikosKey(oikosRaw)) {
                statsData.oikosStats.total++
                statsData.oikosStats.byType[oikosRaw] += 1
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

      {/* KPI */}
      <Grid columns={[1, 1, 3]} gap={3} style={{ marginBottom: '1rem' }}>
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

      {/* 出席 KPI（簡表） */}
      <Grid columns={[1, 1, 2]} gap={3} style={{ marginBottom: '1rem' }}>
        <Card padding={3} radius={2} shadow={1} border className="hc-card">
          <Text size={[1, 1, 2]} weight="semibold" className="hc-title" style={{ marginBottom: 12 }}>
            出席統計
          </Text>
          <Stack space={2}>
            <Flex align="center" justify="space-between"><Text>靈修小組</Text><Badge tone="primary">{stats.attend.devotion}</Badge></Flex>
            <Flex align="center" justify="space-between"><Text>細胞小組</Text><Badge tone="primary">{stats.attend.cellGroup}</Badge></Flex>
            <Flex align="center" justify="space-between"><Text>主日</Text><Badge tone="primary">{stats.attend.sundayService}</Badge></Flex>
            <Flex align="center" justify="space-between"><Text>禱告會</Text><Badge tone="primary">{stats.attend.prayerMeeting}</Badge></Flex>
            <Flex align="center" justify="space-between"><Text>幸福小組</Text><Badge tone="primary">{stats.attend.happinessGroup}</Badge></Flex>
          </Stack>
        </Card>

        <Card padding={3} radius={2} shadow={1} border className="hc-card">
          <Text size={[1, 1, 2]} weight="semibold" className="hc-title" style={{ marginBottom: 12 }}>
            門訓系統統計
          </Text>
          <Stack space={2}>
            <Flex align="center" justify="space-between">
              <Text className="hc-strong">合計（含完成）</Text>
              <Badge tone="positive">{stats.discipleship.total}</Badge>
            </Flex>
            <Flex align="center" justify="space-between"><Text>門上</Text><Badge>{stats.discipleship.dist['door-up']}</Badge></Flex>
            <Flex align="center" justify="space-between"><Text>門下</Text><Badge>{stats.discipleship.dist['door-down']}</Badge></Flex>
            <Flex align="center" justify="space-between"><Text>福上</Text><Badge>{stats.discipleship.dist['bless-up']}</Badge></Flex>
            <Flex align="center" justify="space-between"><Text>福下</Text><Badge>{stats.discipleship.dist['bless-down']}</Badge></Flex>
            <Flex align="center" justify="space-between"><Text>完成</Text><Badge tone="primary">{stats.discipleship.dist['done']}</Badge></Flex>
          </Stack>
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
