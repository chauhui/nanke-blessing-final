// pages/api/group-report/submit.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth-options'; // 確認這個路徑對應到你的 authOptions

/**
 * Sanity 客戶端初始化
 */
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 僅允許 POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // 先檢查 Session，以確保 user 已登入
  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // 從前端取欄位：date、groupId、reports
    const { date, groupId, reports } = req.body as {
      date: string;
      groupId: string;
      reports: Array<{
        member: string;
        identity: string;
        devotion: boolean;
        cellGroup: boolean;
        sundayService: boolean;
        prayerMeeting: boolean;
        happinessGroup: boolean;
        oikos: string;
        discipleship: string; // 改為字串類型
        note: string;
      }>;
    };

    // 必填欄位驗證
    if (!date || !groupId || !Array.isArray(reports)) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // 驗證：groupId 是否存在於 Sanity 的 group 文件
    const foundGroup = await client.fetch(
      '*[_type == "group" && _id == $id]{ _id, name }',
      { id: groupId }
    );
    if (foundGroup.length === 0) {
      return res.status(400).json({ message: `Sanity 裡找不到 group id="${groupId}"` });
    }
    // 取出 group name，好用來做 title
    const groupName: string = (foundGroup[0] as any).name || '未命名小組';

    // 驗證每一筆 reports 裡的 r.member 是否存在於 Sanity 的 member 文件
    for (const r of reports) {
      const foundMember = await client.fetch(
        '*[_type == "member" && _id == $id]{ _id }',
        { id: r.member }
      );
      if (foundMember.length === 0) {
        return res.status(400).json({ message: `Sanity 裡找不到 member id="${r.member}"` });
      }
    }

    // 把前端傳來的 reports 打包成符合 schema 的 memberReport
    const sanitizedReports = reports.map((r) => ({
      _type: 'memberReport',
      member: {
        _type: 'reference',
        _ref: r.member, // r.member 必須是 member document 的 _id
      },
      identity: r.identity || 'member',
      devotion: Boolean(r.devotion),
      cellGroup: Boolean(r.cellGroup),
      sundayService: Boolean(r.sundayService),
      prayerMeeting: Boolean(r.prayerMeeting),
      happinessGroup: Boolean(r.happinessGroup),
      // 只有當 oikos 有值時才包含該欄位
      ...(r.oikos ? { oikos: r.oikos } : {}),
      discipleship: r.discipleship || '', // 保持為字串類型
      note: r.note || '',
    }));

    // 構造要寫到 Sanity 的 groupReport document
    // 特別要注意：schemas/groupReport.ts 裡面有個 name='title' 的必填欄位，所以這裡要帶上 title
    const reportDoc = {
      _type: 'groupReport',
      title: `${groupName} - ${new Date(date).toLocaleDateString()}`, // 例如 "勝騰小組 - 2025/6/6"
      date: new Date(date).toISOString(), // 把 "YYYY-MM-DD" 轉成 ISO
      group: {
        _type: 'reference',
        _ref: groupId, // 以 reference 形式存入 groupId
      },
      submittedBy: {
        _type: 'reference',
        _ref: session.user.id, // 指向目前登入的 user document _id
      },
      reports: sanitizedReports, // memberReport 陣列
    };

    // 執行 Sanity create
    const result = await client.create(reportDoc);

    // 回傳成功訊息，以及剛剛建立文件的 _id
    return res.status(200).json({ success: true, id: result._id });
  } catch (error: any) {
    console.error('提交回報時內部錯誤:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message || 'Unknown error',
    });
  }
}
