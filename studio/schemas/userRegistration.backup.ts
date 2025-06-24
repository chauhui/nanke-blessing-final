  import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'userRegistration',
  title: '用戶註冊',
  type: 'document',
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
      name: 'isAdmin',
      title: '管理員',
      type: 'boolean',
      description: '是否為管理員',
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
    },
    prepare(selection) {
      const { title, email, approved } = selection;
      return {
        title: title || '未命名用戶',
        subtitle: `${email} ${approved ? '✓ 已審核' : '✗ 待審核'}`,
      };
    },
  },
});
