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
    .map((r) =>
      r
        .map((x) => `"${(x ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\r\n");
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 將活動代碼轉成可讀文字
const getActivityLabel = (code: string): string => {
  const activities: Record<string, string> = {
    devotion: "靈修",
    cellGroup: "細胞小組",
    sundayService: "主日聚會",
    prayerMeeting: "禱告會",
    happinessGroup: "幸福小組",
    discipleship: "門訓系統",
  };
  return activities[code] || code;
};

// 門訓系統選項
const discipleshipOptions: Record<string, string> = {
  'door-up': '門上',
  'door-down': '門下',
  'bless-up': '福上',
  'bless-down': '福下'
};

// 定義統計數據類型
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
  oikos: {
    p: number;
    l: number;
    v: number;
    m: number;
    f: number;
    t: number;
  };
  discipleshipOptions: Record<string, number>;
}

export default function GroupReportStatsTool() {
  const client = useClient({ apiVersion: "2024-01-01" });
  const toast = useToast();

  // State
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: new Date(new Date().setDate(1)).toISOString().split("T")[0], // 本月 1 號
    end: new Date().toISOString().split("T")[0], // 今天
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);

  // 第一次載入與 dateRange 變動時，向 Sanity 抓「groupReport」資料
  useEffect(() => {
    setLoading(true);

    const query = `*[_type == "groupReport"]{
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
      .fetch(query)
      .then((data) => {
        setReports(data);
      })
      .catch((error) => {
        console.error("查詢出錯:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dateRange, client]);

  // 過濾條件：搜尋／小組篩選
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

  // 設定要顯示的「小組下拉選項」
  // 注意：這裡只是示範，實際可改成動態抓 Sanity 裡所有小組
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

  // 產生單筆回報的統計數據
  const generateStats = (report: any): ReportStats => {
    const stats: ReportStats = {
      totalMembers: report.reports.length,
      activities: {
        devotion: 0,
        cellGroup: 0,
        sundayService: 0,
        prayerMeeting: 0,
        happinessGroup: 0,
        discipleship: 0, // 這個欄位保留但不使用
      },
      oikos: {
        p: 0, // 代禱
        l: 0, // LINE
        v: 0, // 探訪
        m: 0, // 幸福講座
        f: 0, // 聚餐
        t: 0, // 旅遊
      },
      discipleshipOptions: {
        'door-up': 0,   // 門上
        'door-down': 0, // 門下
        'bless-up': 0,  // 福上
        'bless-down': 0 // 福下
      }
    };

    report.reports.forEach((r: any) => {
      // 統計活動參與情況（不包括門訓系統）
      if (r.devotion) stats.activities.devotion++;
      if (r.cellGroup) stats.activities.cellGroup++;
      if (r.sundayService) stats.activities.sundayService++;
      if (r.prayerMeeting) stats.activities.prayerMeeting++;
      if (r.happinessGroup) stats.activities.happinessGroup++;
      
      // 統計門訓系統選項
      if (r.discipleship) {
        const option = r.discipleship as keyof typeof stats.discipleshipOptions;
        if (stats.discipleshipOptions[option] !== undefined) {
          stats.discipleshipOptions[option]++;
        }
      }
      if (r.oikos && stats.oikos.hasOwnProperty(r.oikos)) {
        stats.oikos[r.oikos as keyof typeof stats.oikos]++;
      }
    });

    return stats;
  };

  // 刪除單筆回報
  const handleDeleteReport = async (reportId: string) => {
    if (!reportId) return;
    setLoading(true);

    try {
      await client.delete(reportId);
      // 刪除後更新前端 List
      setReports((prev) => prev.filter((r) => r._id !== reportId));
      toast.push({
        status: "success",
        title: "已刪除回報",
        description: "小組回報已成功刪除",
      });
    } catch (error: any) {
      console.error("刪除回報時出錯:", error);
      toast.push({
        status: "error",
        title: "刪除失敗",
        description: error.message || "無法刪除回報",
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setReportToDelete(null);
    }
  };

  // 確認開啟刪除對話框
  const confirmDelete = (reportId: string) => {
    setReportToDelete(reportId);
    setDeleteDialogOpen(true);
  };

  // 匯出成 CSV
  const exportToCSV = (report: any) => {
    const headers = [
      "姓名",
      "身份",
      "靈修",
      "細胞小組",
      "主日聚會",
      "禱告會",
      "幸福小組",
      "OKIOS",
      "門訓系統",
      "備註",
    ];
    const rows = report.reports.map((r: any) => [
      r.member?.name || "",
      r.identity === "leader"
        ? "組長"
        : r.identity === "parent"
        ? "家長"
        : r.identity === "staff"
        ? "合心同工"
        : "組員",
      r.devotion ? "✓" : "",
      r.cellGroup ? "✓" : "",
      r.sundayService ? "✓" : "",
      r.prayerMeeting ? "✓" : "",
      r.happinessGroup ? "✓" : "",
      r.oikos === "p"
        ? "代禱"
        : r.oikos === "l"
        ? "LINE"
        : r.oikos === "v"
        ? "探訪"
        : r.oikos === "m"
        ? "幸福講座"
        : r.oikos === "f"
        ? "聚餐"
        : r.oikos === "t"
        ? "旅遊"
        : "",
      r.discipleship ? (discipleshipOptions[r.discipleship] || r.discipleship) : "",
      r.note || "",
    ]);

    const filename = `${
      report.groupName || "小組"
    }_${report.date || ""}_回報統計.csv`;
    downloadCSV([headers, ...rows], filename);
  };

  return (
    <Card padding={4}>
      <Stack space={4}>
        {/** 標題 + 日期範圍選擇 **/}
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Heading size={1}>小組回報統計</Heading>
          <Flex gap={2} align="center">
            <Text size={1}>日期範圍：</Text>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              style={{
                padding: "8px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <Text size={1}>至</Text>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              style={{
                padding: "8px",
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
          </Flex>
        </Flex>

        {/** 搜尋框 + 小組下拉選單 **/}
        <Flex gap={3} wrap="wrap">
          <Box flex={1} minWidth={250}>
            <input
              type="text"
              placeholder="搜尋小組或標題..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: 6,
                border: "1px solid #ccc",
                width: "100%",
              }}
            />
          </Box>

          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: 6,
              border: "1px solid #ccc",
              minWidth: 200,
            }}
          >
            {groupOptions.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </Flex>

        {/** 如果正在讀取資料，顯示讀取中 **/}
        {loading ? (
          <Text>讀取中...</Text>
        ) : filteredReports.length === 0 ? (
          <Card padding={4} tone="caution">
            <Text>找不到符合條件的回報記錄</Text>
          </Card>
        ) : (
          /** 列出每一筆回報卡片 **/
          filteredReports.map((report) => {
            const stats = generateStats(report);
            const isReportExpanded = expandedId === report._id;

            return (
              <Card
                key={report._id}
                shadow={1}
                padding={4}
                style={{ background: "#f9f9fb", marginBottom: 16 }}
              >
                {/** 卡片頂部：標題 + 按鈕 **/}
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

                    <Button
                      text={isReportExpanded ? "收起詳情" : "查看詳情"}
                      tone="primary"
                      mode="ghost"
                      onClick={() =>
                        setExpandedId(isReportExpanded ? null : report._id)
                      }
                    />

                    <Button
                      text="匯出 CSV"
                      tone="primary"
                      icon={DownloadIcon}
                      mode="ghost"
                      onClick={() => exportToCSV(report)}
                    />

                    <Button
                      text="刪除回報"
                      tone="critical"
                      icon={TrashIcon}
                      mode="ghost"
                      onClick={() => confirmDelete(report._id)}
                    />
                  </Flex>
                </Flex>

                {/** 若展開，顯示詳細統計 **/}
                {isReportExpanded && (
                  <Box marginTop={4}>
                    {/** 活動參與統計（靈修、細胞、主日、禱告、幸福、門訓） **/}
                    <Grid
                      columns={[1, 1, 2, 3]}
                      gap={3}
                      marginBottom={4}
                    >
                      {Object.entries(stats.activities).map(
                        ([key, count]) => (
                          <Card
                            key={key}
                            padding={3}
                            radius={2}
                            shadow={1}
                            style={{ background: "#ffffff" }}
                          >
                            <Text size={1} weight="medium">
                              {getActivityLabel(key)}
                            </Text>
                            <Text size={3} weight="bold" style={{ marginTop: 4 }}>
                              {count} 人 (
                              {(
                                (count / stats.totalMembers) *
                                100
                              ).toFixed(0)}
                              %)
                            </Text>
                          </Card>
                        )
                      )}
                    </Grid>

                    {/** OKIOS 活動統計 **/}
                    <Card
                      padding={3}
                      radius={2}
                      shadow={1}
                      style={{ marginBottom: "1rem", background: "#ffffff" }}
                    >
                      <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>
                        OIKOS 活動統計
                      </Text>
                      <Grid columns={[2, 3, 6]} gap={2}>
                        {Object.entries(stats.oikos).map(([key, count]) => (
                          <Flex key={key} align="center" gap={2}>
                            <Badge tone="primary" padding={1} radius={2} fontSize={0}>
                              {count}
                            </Badge>
                            <Text size={1}>
                              {key === "p"
                                ? "代禱"
                                : key === "l"
                                ? "LINE"
                                : key === "v"
                                ? "探訪"
                                : key === "m"
                                ? "幸福講座"
                                : key === "f"
                                ? "聚餐"
                                : "旅遊"}
                            </Text>
                          </Flex>
                        ))}
                      </Grid>
                    </Card>

                    {/** 門訓系統統計 **/}
                    {Object.keys(stats.discipleshipOptions).length > 0 && (
                      <Card
                        padding={3}
                        radius={2}
                        shadow={1}
                        style={{ marginBottom: "1rem", background: "#f8f9fa" }}
                      >
                        <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>
                          門訓系統統計
                        </Text>
                        <Grid columns={[2, 3, 4]} gap={2}>
                          {Object.entries(stats.discipleshipOptions).map(([key, count]) => (
                            <Flex key={key} align="center" gap={2}>
                              <Badge tone="primary" padding={1} radius={2} fontSize={0}>
                                {count}
                              </Badge>
                              <Text size={1}>
                                {discipleshipOptions[key] || key}
                              </Text>
                            </Flex>
                          ))}
                        </Grid>
                      </Card>
                    )}

                    {/** 明細表格：列出每位組員的參與情況 **/}
                    <Card
                      padding={3}
                      radius={2}
                      shadow={1}
                      style={{ background: "#ffffff" }}
                    >
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          fontSize: 14,
                        }}
                      >
                        <thead>
                          <tr style={{ background: "#e7eaf6" }}>
                            <th style={{ textAlign: "left", padding: "8px" }}>
                              姓名
                            </th>
                            <th style={{ textAlign: "left", padding: "8px" }}>
                              身份
                            </th>
                            <th style={{ textAlign: "center", padding: "8px" }}>
                              靈修
                            </th>
                            <th style={{ textAlign: "center", padding: "8px" }}>
                              細胞
                            </th>
                            <th style={{ textAlign: "center", padding: "8px" }}>
                              主日
                            </th>
                            <th style={{ textAlign: "center", padding: "8px" }}>
                              禱告
                            </th>
                            <th style={{ textAlign: "center", padding: "8px" }}>
                              幸福
                            </th>
                            <th style={{ textAlign: "left", padding: "8px" }}>
                              門訓系統
                            </th>
                            <th style={{ textAlign: "left", padding: "8px" }}>
                              OIKOS
                            </th>
                            <th style={{ textAlign: "left", padding: "8px" }}>
                              備註
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {report.reports.map((r: any, idx: number) => (
                            <tr
                              key={idx}
                              style={{ borderBottom: "1px solid #eee" }}
                            >
                              <td style={{ padding: "8px" }}>
                                {r.member?.name || "未命名"}
                              </td>
                              <td style={{ padding: "8px" }}>
                                {r.identity === "leader"
                                  ? "組長"
                                  : r.identity === "parent"
                                  ? "家長"
                                  : r.identity === "staff"
                                  ? "合心同工"
                                  : "組員"}
                              </td>
                              <td style={{ padding: "8px", textAlign: "center" }}>
                                {r.devotion ? "✓" : ""}
                              </td>
                              <td style={{ padding: "8px", textAlign: "center" }}>
                                {r.cellGroup ? "✓" : ""}
                              </td>
                              <td style={{ padding: "8px", textAlign: "center" }}>
                                {r.sundayService ? "✓" : ""}
                              </td>
                              <td style={{ padding: "8px", textAlign: "center" }}>
                                {r.prayerMeeting ? "✓" : ""}
                              </td>
                              <td style={{ padding: "8px", textAlign: "center" }}>
                                {r.happinessGroup ? "✓" : ""}
                              </td>
                              <td style={{ padding: "8px" }}>
                                {r.discipleship ? (
                                  <Badge
                                    tone="primary"
                                    padding={1}
                                    radius={2}
                                    fontSize={0}
                                  >
                                    {discipleshipOptions[r.discipleship] || r.discipleship}
                                  </Badge>
                                ) : "-"}
                              </td>
                              <td style={{ padding: "8px" }}>
                                {r.oikos === "p"
                                  ? "代禱"
                                  : r.oikos === "l"
                                  ? "LINE"
                                  : r.oikos === "v"
                                  ? "探訪"
                                  : r.oikos === "m"
                                  ? "幸福講座"
                                  : r.oikos === "f"
                                  ? "聚餐"
                                  : r.oikos === "t"
                                  ? "旅遊"
                                  : "-"}
                              </td>
                              <td
                                style={{
                                  padding: "8px",
                                  maxWidth: "200px",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {r.note || ""}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  </Box>
                )}
              </Card>
            );
          })
        )}
      </Stack>

      {/** 刪除確認對話框 **/}
      {deleteDialogOpen && (
        <Dialog
          id="delete-confirm-dialog"
          header="確認刪除"
          onClose={() => {
            setDeleteDialogOpen(false);
            setReportToDelete(null);
          }}
          zOffset={1000}
          width={1}
        >
          <Box padding={4}>
            <Stack space={4}>
              <Text>確定要刪除此筆小組回報嗎？此操作無法復原。</Text>
              <Flex gap={2} justify="flex-end">
                <Button
                  text="取消"
                  mode="ghost"
                  onClick={() => {
                    setDeleteDialogOpen(false);
                    setReportToDelete(null);
                  }}
                />
                <Button
                  text="確定刪除"
                  tone="critical"
                  onClick={() => {
                    if (reportToDelete) {
                      handleDeleteReport(reportToDelete);
                    }
                  }}
                  disabled={loading}
                />
              </Flex>
            </Stack>
          </Box>
        </Dialog>
      )}
    </Card>
  );
}
