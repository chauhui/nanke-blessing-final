import { defineField, defineType } from 'sanity';

export default defineType({
  // 使用 'userRegistration' 作為 name，避免與 Sanity 內建用戶系統衝突
  name: 'userRegistration',
  title: '用戶註冊',
  type: 'document',
  // ---- options 已移除 ----
  fields: [
    defineField({
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (Rule) => Rule.required().error('姓名為必填欄位'),
    }),
    defineField({
      name: 'email',
      title: '電子郵件',
      type: 'string',
      validation: (Rule) => Rule.required().email().error('請輸入有效的電子郵件'),
    }),
    defineField({
      name: 'phone',
      title: '電話號碼',
      type: 'string',
      validation: (Rule) => Rule.required().error('電話號碼為必填欄位'),
    }),
    defineField({
      name: 'password',
      title: '密碼 (已加密)',
      type: 'string',
      readOnly: true,
      validation: (Rule) => Rule.required().error('密碼為必填欄位'),
    }),
    defineField({
      name: 'isApproved',
      title: '已審核',
      type: 'boolean',
      description: '是否已通過管理員審核',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: '會員等級',
      type: 'string',
      description: '審核會員時請設定等級，等級由低至高依序為一般會員、合心同工、小組長、長老。',
      options: {
        list: [
          { title: '一般會員', value: 'member' },
          { title: '合心同工', value: 'coworker' },
          { title: '小組長', value: 'groupLeader' },
          { title: '長老', value: 'elder' },
        ],
        layout: 'radio',
      },
      initialValue: 'member',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authVersion',
      title: '權限版本',
      type: 'number',
      initialValue: 1,
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'mustChangePassword',
      title: '必須修改密碼',
      type: 'boolean',
      readOnly: true,
      initialValue: false,
    }),
    defineField({
      name: 'temporaryPasswordIssuedAt',
      title: '臨時密碼產生時間',
      type: 'datetime',
      readOnly: true,
      hidden: ({document}) => !document?.mustChangePassword,
    }),
    defineField({
      name: 'createdAt',
      title: '註冊時間',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      email: 'email',
      approved: 'isApproved',
      role: 'role',
      reviewedBy: 'reviewedBy'
    },
    prepare(selection) {
      const { title, email, approved, role, reviewedBy } = selection;
      const status = approved ? '✓ 已審核' : '✗ 待審核';
      const roleLabels: Record<string, string> = { member: '一般會員', coworker: '合心同工', groupLeader: '小組長', elder: '長老' };
      const reviewer = reviewedBy ? `(由 ${reviewedBy} 審核)` : '';
      return {
        title: title || '未命名用戶',
        subtitle: `${email} ${status} · ${roleLabels[role] || '一般會員'} ${reviewer}`.trim(),
      };
    },
  },
});
