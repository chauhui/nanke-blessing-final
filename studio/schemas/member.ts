// studio/schemas/member.ts
export default {
  name: 'member',
  title: '組員',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('姓名為必填欄位'),
    },
    {
      name: 'phone',
      title: '電話',
      type: 'string',
      // 不再強制 required
      // validation: (Rule: any) => Rule.required().error('電話為必填欄位'),
    },
    {
      name: 'email',
      title: '電子郵件',
      type: 'string',
      // 不再強制 required，也不做 email 格式驗證
      // validation: (Rule: any) => Rule.required().email().error('請輸入有效的電子郵件地址'),
    },
    {
      name: 'birthday',
      title: '生日',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      name: 'groups',
      title: '所屬小組',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'group' }],
          weak: true,    // 新增 weak: true 變成弱引用，刪除 group 時不再提示引用錯誤
        },
      ],
      // 可選：暫時不強制指定小組
      // validation: (Rule: any) => Rule.required().error('請至少指定一個所屬小組'),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'phone',
      groupList: 'groups',
    },
    prepare(selection: any) {
      const { title, subtitle, groupList } = selection;
      let groupNames = Array.isArray(groupList)
        ? groupList.map((g: any) => g.name).filter(Boolean)
        : [];
      return {
        title,
        subtitle: subtitle || '無電話資料',
        description:
          groupNames.length > 0 ? `小組：${groupNames.join('、')}` : '尚未分配小組',
      };
    },
  },
};
