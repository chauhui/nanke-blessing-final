import { defineField, defineType } from 'sanity'
import TemporaryPasswordIssuer from '../components/TemporaryPasswordIssuer'

export default defineType({
  name: 'passwordResetRequest',
  title: '密碼重設申請',
  type: 'document',
  fields: [
    defineField({
      name: 'user',
      title: '會員',
      type: 'reference',
      to: [{ type: 'userRegistration' }],
      readOnly: true,
    }),
    defineField({ name: 'email', title: '電子郵件', type: 'string', readOnly: true }),
    defineField({ name: 'requestedAt', title: '申請時間', type: 'datetime', readOnly: true }),
    defineField({
      name: 'status',
      title: '處理狀態',
      type: 'string',
      readOnly: true,
      options: {list: [{title: '待處理', value: 'pending'}, {title: '已完成', value: 'completed'}]},
    }),
    defineField({
      name: 'temporaryPasswordIssuer',
      title: '一次性臨時密碼',
      type: 'string',
      components: {input: TemporaryPasswordIssuer},
    }),
    defineField({ name: 'usedAt', title: '完成時間', type: 'datetime', readOnly: true }),
    // 保留舊郵件重設資料欄位，避免既有文件出現 Unknown fields。
    defineField({ name: 'expiresAt', title: '到期時間', type: 'datetime', hidden: true, readOnly: true }),
    defineField({ name: 'revokedAt', title: '失效時間', type: 'datetime', readOnly: true }),
    defineField({ name: 'tokenHash', title: '權杖雜湊', type: 'string', hidden: true, readOnly: true }),
  ],
  preview: {
    select: {
      email: 'email',
      requestedAt: 'requestedAt',
      usedAt: 'usedAt',
      revokedAt: 'revokedAt',
      status: 'status',
    },
    prepare({ email, requestedAt, usedAt, revokedAt, status }) {
      const statusLabel = usedAt || status === 'completed' ? '已完成' : revokedAt ? '已失效' : '待處理'
      return { title: email || '未知會員', subtitle: `${statusLabel} · ${requestedAt || ''}` }
    },
  },
})
