import { defineField, defineType } from 'sanity';

export default defineType({
  // 使用 'userRegistration' 作為 name，避免與 Sanity 內建用戶系統衝突
  name: 'userRegistration',
  title: '用戶註冊',
  type: 'document',
  options: {
    // 忽略未在 schema 中定義的欄位
    unknownField: 'ignore'
  },
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
      reviewedBy: 'reviewedBy'
    },
    prepare(selection) {
      const { title, email, approved, reviewedBy } = selection;
      const status = approved ? '✓ 已審核' : '✗ 待審核';
      const reviewer = reviewedBy ? `(由 ${reviewedBy} 審核)` : '';
      
      return {
        title: title || '未命名用戶',
        subtitle: `${email} ${status} ${reviewer}`.trim(),
      };
    },
  },
});
