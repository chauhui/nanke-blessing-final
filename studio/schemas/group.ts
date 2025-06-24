// schemas/group.ts

export default {
  name: 'group',
  title: '小組',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '小組名稱',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('小組名稱為必填欄位'),
    },
    {
      name: 'leader',
      title: '小組長',
      type: 'reference',
      to: [{ type: 'member' }],
      // 不再強制 required，先建立「只有名稱」的 Group，再由使用者自行選擇小組長
      // validation: (Rule: any) => Rule.required().error('請選擇小組長'),
    },
    {
      name: 'description',
      title: '描述',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'name',
      leaderName: 'leader.name',
    },
    prepare(selection: any) {
      const { title, leaderName } = selection;
      return {
        title,
        subtitle: leaderName ? `小組長：${leaderName}` : '尚未指定小組長',
      };
    },
  },
};
