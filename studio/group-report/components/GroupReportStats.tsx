import React, { useState, useEffect } from 'react';
import { Card, Flex, Text, Box, Badge, Grid, Stack } from '@sanity/ui';
import type { SanityClient, SanityDocument } from '@sanity/client';

// 擴展 Window 介面以包含 sanityClient
interface CustomWindow extends Window {
  sanityClient: SanityClient;
}

declare const window: CustomWindow;

// 定義型別
interface Group {
  _id: string;
  _type: string;
  name: string;
}

interface Member {
  _id: string;
  _type: string;
  name: string;
}

interface ReportItem {
  oikos?: string;
  member?: Member;
}

interface Report extends SanityDocument {
  _id: string;
  date: string;
  group: Group;
  reports: ReportItem[];
}

interface GroupStat {
  name: string;
  count: number;
}

interface RecentReport {
  group: string;
  date: string;
  count: number;
}

interface OikosStats {
  total: number;
  byType: {
    p: number; // 代禱
    l: number; // LINE
    v: number; // 探訪
    m: number; // 幸福講座
    f: number; // 聚餐
    t: number; // 旅遊
  };
}

interface Stats {
  totalReports: number;
  thisWeek: number;
  lastWeek: number;
  groups: GroupStat[];
  recentReports: RecentReport[];
  oikosStats: OikosStats;
}

export default function GroupReportStats() {
  const [stats, setStats] = useState<Stats>({
    totalReports: 0,
    thisWeek: 0,
    lastWeek: 0,
    groups: [],
    recentReports: [],
    oikosStats: {
      total: 0,
      byType: {
        p: 0, // 代禱
        l: 0, // LINE
        v: 0, // 探訪
        m: 0, // 幸福講座
        f: 0, // 聚餐
        t: 0  // 旅遊
      }
    }
  });

  // 使用 window.sanityClient 替代 useSanityClient
  const client = typeof window !== 'undefined' ? window.sanityClient : null;

  useEffect(() => {
    if (!client) return;

    const fetchStats = async () => {
      try {
        // 獲取所有 groupReport 文檔，包含 reports 中的 oikos 數據
        const reports = await client.fetch<Report[]>(`
          *[_type == "groupReport" && defined(reports)] {
            _id,
            date,
            group,
            reports[] {
              member,
              oikos
              }
            }
          } | order(date desc)
        `);
        
        console.log('Fetched reports:', JSON.stringify(reports, null, 2));

        // 初始化統計數據
        const statsData: Stats = {
          totalReports: reports.length,
          thisWeek: 0,
          lastWeek: 0,
          groups: [],
          recentReports: [],
          oikosStats: {
            total: 0,
            byType: { p: 0, l: 0, v: 0, m: 0, f: 0, t: 0 }
          }
        };

        const now = new Date();
        const oneWeekAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;
        const twoWeeksAgo = oneWeekAgo - 7 * 24 * 60 * 60 * 1000;
        const groupStats: Record<string, number> = {};
        const recentReports: Report[] = [];

        // 處理每個報告
        reports.forEach((report) => {
          if (!report || !report.reports) return;
          
          const reportDate = report.date ? new Date(report.date) : new Date();
          const reportTimestamp = reportDate.getTime();
          
          // 統計本週和上週的報告
          if (reportTimestamp > oneWeekAgo) {
            statsData.thisWeek++;
          } else if (reportTimestamp >= twoWeeksAgo) {
            statsData.lastWeek++;
          }
          
          // 處理小組統計
          if (report.group) {
            const groupName = report.group.name || '未知小組';
            groupStats[groupName] = (groupStats[groupName] || 0) + 1;
          }
          
          // 統計 OIKOS 數據
          if (report.reports && Array.isArray(report.reports)) {
            report.reports.forEach((r) => {
              if (r && r.oikos) {
                statsData.oikosStats.total++;
                // 支援所有 OIKOS 類型的統計
                switch (r.oikos) {
                  case 'p': // 代禱
                    statsData.oikosStats.byType.p++;
                    break;
                  case 'l': // LINE
                    statsData.oikosStats.byType.l++;
                    break;
                  case 'v': // 探訪
                    statsData.oikosStats.byType.v = (statsData.oikosStats.byType.v || 0) + 1;
                    break;
                  case 'm': // 幸福講座
                    statsData.oikosStats.byType.m = (statsData.oikosStats.byType.m || 0) + 1;
                    break;
                  case 'f': // 聚餐
                    statsData.oikosStats.byType.f = (statsData.oikosStats.byType.f || 0) + 1;
                    break;
                  case 't': // 旅遊
                    statsData.oikosStats.byType.t = (statsData.oikosStats.byType.t || 0) + 1;
                    break;
                }
              }
            });
          }
          
          // 收集最近報告
          if (recentReports.length < 3) {
            recentReports.push(report);
          }
        });

        // 轉換小組統計為數組
        statsData.groups = Object.entries(groupStats).map(([name, count]) => ({
          name,
          count
        }));

        // 處理最近報告
        statsData.recentReports = recentReports.map(report => ({
          group: report.group?.name || '未知小組',
          date: report.date,
          count: report.reports?.length || 0
        }));
        
        console.log('Processed stats:', JSON.stringify(statsData, null, 2));
        setStats(statsData);
      } catch (error) {
        console.error('Failed to fetch group report stats:', error);
      }
    };

    fetchStats();
  }, [client]);

  return (
    <Box padding={4}>
      <Grid columns={[1, 1, 2, 3]} gap={3} style={{ marginBottom: '1rem' }}>
        <Card padding={3} radius={2} shadow={1}>
          <Flex align="center" justify="space-between">
            <Box>
              <Text size={1} weight="semibold">
                總回報數
              </Text>
              <Text size={5} weight="bold">
                {stats.totalReports}
              </Text>
            </Box>
            <Badge tone="primary" padding={2} radius={2} fontSize={1}>
              全部
            </Badge>
          </Flex>
  );
}
        </Card>

        <Card padding={3} radius={2} shadow={1}>
          <Flex align="center" justify="space-between">
            <Box>
              <Text size={1} weight="semibold">
                本週回報
              </Text>
              <Text size={5} weight="bold">
                {stats.thisWeek}
              </Text>
            </Box>
            <Badge tone="positive" padding={2} radius={2} fontSize={1}>
              本週
            </Badge>
          </Flex>
        </Card>

        <Card padding={3} radius={2} shadow={1}>
          <Flex align="center" justify="space-between">
            <Box>
              <Text size={1} weight="semibold">
                上週回報
              </Text>
              <Text size={5} weight="bold">
                {stats.lastWeek}
              </Text>
            </Box>
            <Badge tone="caution" padding={2} radius={2} fontSize={1}>
              上週
            </Badge>
          </Flex>
        </Card>
      </Grid>

      <Grid columns={[1, 1, 2]} gap={4}>
        <Card padding={3} radius={2} shadow={1}>
          <Text size={1} weight="semibold" marginBottom={3}>
            各小組回報統計
          </Text>
          <Stack space={2}>
            {stats.groups.map((group) => (
              <Flex key={group.name} align="center" justify="space-between" paddingY={2}>
                <Text size={1} style={{ flex: 1 }}>
                  {group.name}
                </Text>
                <Badge tone="primary" paddingX={2} radius={2} fontSize={1}>
                  {group.count || group.value}
                </Badge>
              </Flex>
            ))}
          </Stack>
        </Card>


        <Card padding={3} radius={2} shadow={1}>
          <Text size={1} weight="semibold" marginBottom={3}>
            最近回報
          </Text>
          <Stack space={2}>
            {stats.recentReports.map((report, index) => (
              <Flex key={index} align="center" justify="space-between" paddingY={2}>
                <Box>
                  <Text size={1} weight="medium">
                    {report.group}
                  </Text>
                  <Text size={1} muted>
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
  );
}
