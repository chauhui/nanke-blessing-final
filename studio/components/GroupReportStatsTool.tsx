// studio/components/GroupReportStatsTool.tsx
import React, { useEffect, useState } from "react";
import { useClient } from "sanity";
import {
  Card,
  Stack,
  Heading,
  Text,
  Button,
  Grid,
  Badge,
  Box,
  Flex,
  Dialog,
  useToast,
} from "@sanity/ui";
import { TrashIcon, DownloadIcon } from '@sanity/icons';

// CSV 下載工具函式
function downloadCSV(rows: string[][], filename: string) {
  const csvContent = rows
    .map((r) => r.map((x) => `"${(x ?? "").replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 將活動代碼轉成可讀文字（與前台一致）
const getActivityLabel = (code: string): string => {
  const activities: Record<string, string> = {
    devotion: "靈修小組",
    cellGroup: "細胞小組",
    sundayService: "主日",
    prayerMeeting: "禱告會",
    happinessGroup: "幸福小組",
    discipleship: "門訓系統",
  };
  return activities[code] || code;
};

// 門訓系統選項（含 done）
const discipleshipOptions: Record<string, string> = {
  'door-up': '門上',
  'door-down': '門下',
  'bless-up': '福上',
  'bless-down': '福下',
  'done': '完成',
};

interface ReportStats {
  totalMembers: number;
  activities: {
    devotion: number;
    cellGroup: number;
    sundayService: number;
    prayerMeeting: number;
    happinessGroup: number;
    discipleship: number;
  };
  oikos: { p: number; l: number; v: number; m: number; f: number; t: number };
  discipleshipOptions: Record<string, number>;
}

export default function GroupReportStatsTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const toast = useToast();

  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(new Date().setDate(1)).toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  // === RWD：<640px 視為手機，改走卡片式，不需要水平捲動 ===
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639.98px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // 取資料（含日期區間）
  useEffect(() => {
    setLoading(true);

    const query = `*[_type == "groupReport" && date >= $start && date <= $end]{
      _id,
      _createdAt,
      _updatedAt,
      title,
      date,
      group,
      "groupName": group->name,
      "groupRef": group._ref,
      "reportCount": count(reports),
      reports[] {
        _key,
        member->{name, phone, _id},
        identity,
        devotion,
        cellGroup,
        sundayService,
        prayerMeeting,
        happinessGroup,
        oikos,
        discipleship,
        note
      }
    } | order(date desc)`;

    client
      .fetch(query, {
        start: `${dateRange.start}T00:00:00Z`,
        end: `${dateRange.end}T23:59:59Z`,
      })
      .then(setReports)
      .catch((err) => console.error("查詢出錯:", err))
      .finally(() => setLoading(false));
  }, [dateRange, client]);

  // 搜尋/小組篩選
  const filteredReports = reports.filter((report) => {
    if (!report) return false;
    const searchTerm = search.trim().toLowerCase();
    const matchesSearch =
      !searchTerm ||
      report.title?.toLowerCase().includes(searchTerm) ||
      report.groupName?.toLowerCase().includes(searchTerm);
    const matchesGroup =
      selectedGroup === "all" ||
      (report.group && report.group._ref === selectedGroup);
    return matchesSearch && matchesGroup;
  });

  // 示範：靜態小組清單（可改成動態）
  const groupOptions = [
    { id: "all", name: "全部小組" },
    { id: "group1", name: "尤君小組" },
    { id: "group2", name: "朝暉小組" },
    { id: "group3", name: "榮杰小組" },
    { id: "group4", name: "秀蘭小組" },
    { id: "group5", name: "俊男小組" },
    { id: "group6", name: "青少年團契" },
    { id: "group7", name: "黃晨小組" },
    { id: "group8", name: "勝騰小組" },
    { id: "group9", name: "玉真小組" },
  ];

  // 統計
  const generateStats = (report: any): ReportStats => {
    const stats: ReportStats = {
      totalMembers: Array.isArray(report.reports) ? report.reports.length : 0,
      activities: {
        devotion: 0,
        cellGroup: 0,
        sundayService: 0,
        prayerMeeting: 0,
        happinessGroup: 0,
        discipleship: 0,
      },
      oikos: { p: 0, l: 0, v: 0, m: 0, f: 0, t: 0 },
      discipleshipOptions: { 'door-up': 0, 'door-down': 0, 'bless-up': 0, 'bless-down': 0, 'done': 0 },
    };

    (report.reports || []).forEach((r: any) => {
      if (r.devotion) stats.activities.devotion++;
      if (r.cellGroup) stats.activities.cellGroup++;
      if (r.sundayService) stats.activities.sundayService++;
      if (r.prayerMeeting) stats.activities.prayerMeeting++;
      if (r.happinessGroup) stats.activities.happinessGroup++;

      const ds = (r.discipleship || "").trim();
      if (ds) {
        stats.activities.discipleship++;
        if (stats.discipleshipOptions[ds] !== undefined) stats.discipleshipOptions[ds]++;
        else stats.discipleshipOptions[ds] = 1;
      }

      const ok = (r.oikos || "").trim();
      if (ok && (stats.oikos as any)[ok] !== undefined) {
        (stats.oikos as any)[ok]++;
      }
    });

    return stats;
  };

  // 刪除
  const handleDeleteReport = async (reportId: string) => {
    if (!reportId) return;
    setLoading(true);
    try {
      await client.delete(reportId);
      setReports((prev) => prev.filter((r) => r._id !== reportId));
      toast.push({ status: "success", title: "已刪除回報", description: "小組回報已成功刪除" });
    } catch (error: any) {
      console.error("刪除回報時出錯:", error);
      toast.push({ status: "error", title: "刪除失敗", description: error.message || "無法刪除回報" });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setReportToDelete(null);
    }
  };

  const confirmDelete = (reportId: string) => {
    setReportToDelete(reportId);
    setDeleteDialogOpen(true);
  };

  // 匯出 CSV（標題與前台一致）
  const exportToCSV = (report: any) => {
    const headers = [
      "姓名",
      "身份",
      "靈修小組",
      "細胞小組",
      "主日",
      "禱告會",
      "幸福小組",
      "OIKOS",
      "門訓系統",
      "備註",
    ];
    const rows = (report.reports || []).map((r: any) => [
      r.member?.name || "",
      r.identity === "leader" ? "組長" : r.identity === "parent" ? "家長" : r.identity === "staff" ? "合心同工" : "組員",
      r.devotion ? "✓" : "",
      r.cellGroup ? "✓" : "",
      r.sundayService ? "✓" : "",
      r.prayerMeeting ? "✓" : "",
      r.happinessGroup ? "✓" : "",
      r.oikos === "p" ? "代禱" :
      r.oikos === "l" ? "LINE" :
      r.oikos === "v" ? "探訪" :
      r.oikos === "m" ? "幸福小組/講座" :
      r.oikos === "f" ? "聚餐" :
      r.oikos === "t" ? "旅遊" : "",
      r.discipleship ? (discipleshipOptions[r.discipleship] || r.discipleship) : "",
      r.note || "",
    ]);

    const filename = `${report.groupName || "小組"}_${report.date || ""}_回報統計.csv`;
    downloadCSV([headers, ...rows], filename);
  };

  return (
    <Card padding={4}>
      <Stack space={4}>
        {/* 標題 + 日期範圍 */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Heading size={1}>小組回報統計</Heading>
          <Flex gap={2} align="center">
            <Text size={1}>日期範圍：</Text>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              style={{ padding: "8px", borderRadius: 4, border: "1px solid #ccc" }}
            />
            <Text size={1}>至</Text>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              style={{ padding: "8px", borderRadius: 4, border: "1px solid #ccc" }}
            />
          </Flex>
        </Flex>

        {/* 搜尋 + 小組選單 */}
        <Flex gap={3} wrap="wrap">
          <Box flex={1} style={{ minWidth: 250 }}>
            <input
              type="text"
              placeholder="搜尋小組或標題..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "8px", borderRadius: 6, border: "1px solid #ccc", width: "100%" }}
            />
          </Box>

          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{ padding: "8px", borderRadius: 6, border: "1px solid #ccc", minWidth: 200 }}
          >
            {groupOptions.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </Flex>

        {/* 清單 */}
        {loading ? (
          <Text>讀取中...</Text>
        ) : filteredReports.length === 0 ? (
          <Card padding={4} tone="caution"><Text>找不到符合條件的回報記錄</Text></Card>
        ) : (
          filteredReports.map((report) => {
            const stats = generateStats(report);
            const isReportExpanded = expandedId === report._id;
            const discipleshipTotal = Object.values(stats.discipleshipOptions).reduce((a, b) => a + b, 0);

            return (
              <Card key={report._id} shadow={1} padding={4} style={{ background: "#f9f9fb", marginBottom: 16 }}>
                {/* 卡片頂部 */}
                <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
                  <Box>
                    <Text size={2} weight="semibold">
                      {report.groupName || "未指定小組"} - {report.title}
                    </Text>
                    <Text size={1} muted style={{ marginTop: 4 }}>
                      {new Date(report.date).toLocaleDateString()}
                    </Text>
                  </Box>

                  <Flex gap={2} wrap="wrap">
                    <Badge tone="primary" padding={2} radius={2} fontSize={1}>
                      組員：{stats.totalMembers} 人
                    </Badge>
                    <Badge tone="positive" padding={2} radius={2} fontSize={1}>
                      門訓系統：{discipleshipTotal} 人
                    </Badge>

                    <Button
                      text={isReportExpanded ? "收起詳情" : "查看詳情"}
                      tone="primary"
                      mode="ghost"
                      onClick={() => setExpandedId(isReportExpanded ? null : report._id)}
                    />
                    <Button text="匯出 CSV" tone="primary" icon={DownloadIcon} mode="ghost" onClick={() => exportToCSV(report)} />
                    <Button text="刪除回報" tone="critical" icon={TrashIcon} mode="ghost" onClick={() => confirmDelete(report._id)} />
                  </Flex>
                </Flex>

                {/* 詳細統計 */}
                {isReportExpanded && (
                  <Box marginTop={4}>
                    {/* 活動參與統計 */}
                    <Grid columns={[1, 1, 2, 3]} gap={3} marginBottom={4}>
                      {Object.entries(stats.activities).map(([key, count]) => (
                        <Card key={key} padding={3} radius={2} shadow={1} style={{ background: "#ffffff" }}>
                          <Text size={1} weight="medium">{getActivityLabel(key)}</Text>
                          <Text size={3} weight="bold" style={{ marginTop: 4 }}>
                            {count} 人 ({((count / Math.max(stats.totalMembers, 1)) * 100).toFixed(0)}%)
                          </Text>
                        </Card>
                      ))}
                    </Grid>

                    {/* OIKOS 活動統計 */}
                    <Card padding={3} radius={2} shadow={1} style={{ marginBottom: "1rem", background: "#ffffff" }}>
                      <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>OIKOS 活動統計</Text>
                      <Grid columns={[2, 3, 6]} gap={2}>
                        {Object.entries(stats.oikos).map(([key, count]) => (
                          <Flex key={key} align="center" gap={2}>
                            <Badge tone="primary" padding={1} radius={2} fontSize={0}>{count}</Badge>
                            <Text size={1}>
                              {key === "p" ? "代禱"
                                : key === "l" ? "LINE"
                                : key === "v" ? "探訪"
                                : key === "m" ? "幸福小組/講座"
                                : key === "f" ? "聚餐"
                                : "旅遊"}
                            </Text>
                          </Flex>
                        ))}
                      </Grid>
                    </Card>

                    {/* 門訓系統統計 */}
                    {Object.keys(stats.discipleshipOptions).length > 0 && (
                      <Card padding={3} radius={2} shadow={1} style={{ marginBottom: "1rem", background: "#f8f9fa" }}>
                        <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>門訓系統統計</Text>
                        <Grid columns={[2, 3, 5]} gap={2}>
                          {Object.entries(stats.discipleshipOptions).map(([key, count]) => (
                            <Flex key={key} align="center" gap={2}>
                              <Badge tone={key === "done" ? "positive" : "primary"} padding={1} radius={2} fontSize={0}>
                                {count}
                              </Badge>
                              <Text size={1}>{discipleshipOptions[key] || key}</Text>
                            </Flex>
                          ))}
                        </Grid>
                      </Card>
                    )}

                    {/* 明細（RWD）：手機＝卡片；桌機＝表格 */}
                    {isMobile ? (
                      // === 手機卡片（不需要水平捲動、顯示 OIKOS 與門訓） ===
                      <Stack space={3}>
                        {(report.reports || []).map((r: any, idx: number) => (
                          <Card key={idx} radius={2} shadow={1} padding={3} style={{ background: "#fff" }}>
                            <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
                              <Text size={2} weight="semibold">{r.member?.name || "未命名"}</Text>
                              <Badge padding={1} radius={2} fontSize={0}>
                                {r.identity === "leader" ? "組長"
                                  : r.identity === "parent" ? "家長"
                                  : r.identity === "staff" ? "合心同工" : "組員"}
                              </Badge>
                            </Flex>

                            <Grid columns={2} gap={2} style={{ marginTop: 8 }}>
                              <Text size={1}>靈修：{r.devotion ? "✓" : "-"}</Text>
                              <Text size={1}>細胞：{r.cellGroup ? "✓" : "-"}</Text>
                              <Text size={1}>主日：{r.sundayService ? "✓" : "-"}</Text>
                              <Text size={1}>禱告：{r.prayerMeeting ? "✓" : "-"}</Text>
                              <Text size={1}>幸福：{r.happinessGroup ? "✓" : "-"}</Text>
                              <Text size={1}>
                                OIKOS：{
                                  r.oikos === "p" ? "代禱"
                                    : r.oikos === "l" ? "LINE"
                                    : r.oikos === "v" ? "探訪"
                                    : r.oikos === "m" ? "幸福小組/講座"
                                    : r.oikos === "f" ? "聚餐"
                                    : r.oikos === "t" ? "旅遊" : "-"
                                }
                              </Text>
                              <Text size={1} style={{ gridColumn: "1 / -1" }}>
                                門訓：{r.discipleship
                                  ? (discipleshipOptions[r.discipleship] || r.discipleship)
                                  : "-"}
                              </Text>
                              {r.note && (
                                <Text size={1} muted style={{ gridColumn: "1 / -1" }}>
                                  備註：{r.note}
                                </Text>
                              )}
                            </Grid>
                          </Card>
                        ))}
                      </Stack>
                    ) : (
                      // === 中大螢幕表格（無水平捲動；欄位會自動換行） ===
                      <Card padding={3} radius={2} shadow={1} style={{ background: "#ffffff" }}>
                        <table
                          style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: 14,
                            tableLayout: "auto",
                            wordBreak: "keep-all",
                          }}
                        >
                          <thead>
                            <tr style={{ background: "#e7eaf6" }}>
                              <th style={{ textAlign: "left", padding: "8px" }}>姓名</th>
                              <th style={{ textAlign: "left", padding: "8px" }}>身份</th>
                              <th style={{ textAlign: "center", padding: "8px" }}>靈修小組</th>
                              <th style={{ textAlign: "center", padding: "8px" }}>細胞小組</th>
                              <th style={{ textAlign: "center", padding: "8px" }}>主日</th>
                              <th style={{ textAlign: "center", padding: "8px" }}>禱告會</th>
                              <th style={{ textAlign: "center", padding: "8px" }}>幸福小組</th>
                              <th style={{ textAlign: "left", padding: "8px" }}>門訓系統</th>
                              <th style={{ textAlign: "left", padding: "8px" }}>OIKOS</th>
                              <th style={{ textAlign: "left", padding: "8px" }}>備註</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(report.reports || []).map((r: any, idx: number) => (
                              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                                <td style={{ padding: "8px" }}>{r.member?.name || "未命名"}</td>
                                <td style={{ padding: "8px" }}>
                                  {r.identity === "leader" ? "組長"
                                    : r.identity === "parent" ? "家長"
                                    : r.identity === "staff" ? "合心同工" : "組員"}
                                </td>
                                <td style={{ padding: "8px", textAlign: "center" }}>{r.devotion ? "✓" : ""}</td>
                                <td style={{ padding: "8px", textAlign: "center" }}>{r.cellGroup ? "✓" : ""}</td>
                                <td style={{ padding: "8px", textAlign: "center" }}>{r.sundayService ? "✓" : ""}</td>
                                <td style={{ padding: "8px", textAlign: "center" }}>{r.prayerMeeting ? "✓" : ""}</td>
                                <td style={{ padding: "8px", textAlign: "center" }}>{r.happinessGroup ? "✓" : ""}</td>
                                <td style={{ padding: "8px" }}>
                                  {r.discipleship ? (
                                    <Badge tone={r.discipleship === "done" ? "positive" : "primary"} padding={1} radius={2} fontSize={0}>
                                      {discipleshipOptions[r.discipleship] || r.discipleship}
                                    </Badge>
                                  ) : "-"}
                                </td>
                                <td style={{ padding: "8px" }}>
                                  {r.oikos === "p" ? "代禱"
                                    : r.oikos === "l" ? "LINE"
                                    : r.oikos === "v" ? "探訪"
                                    : r.oikos === "m" ? "幸福小組/講座"
                                    : r.oikos === "f" ? "聚餐"
                                    : r.oikos === "t" ? "旅遊" : "-"}
                                </td>
                                <td
                                  style={{
                                    padding: "8px",
                                    maxWidth: "240px",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                  }}
                                  title={r.note || ""}
                                >
                                  {r.note || ""}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Card>
                    )}
                  </Box>
                )}
              </Card>
            );
          })
        )}
      </Stack>

      {/* 刪除確認對話框 */}
      {deleteDialogOpen && (
        <Dialog
          id="delete-confirm-dialog"
          header="確認刪除"
          onClose={() => { setDeleteDialogOpen(false); setReportToDelete(null); }}
          zOffset={1000}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text>確定要刪除此筆小組回報嗎？此操作無法復原。</Text>
              <Flex gap={2} justify="flex-end">
                <Button text="取消" mode="ghost" onClick={() => { setDeleteDialogOpen(false); setReportToDelete(null); }} />
                <Button text="確定刪除" tone="critical" onClick={() => { if (reportToDelete) handleDeleteReport(reportToDelete); }} disabled={loading} />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Card>
  );
}
