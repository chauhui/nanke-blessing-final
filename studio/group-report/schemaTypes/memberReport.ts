export default {
  name: 'memberReport',
  title: '組員回報',
  type: 'object',
  fields: [
    {
      name: 'member',
      title: '組員姓名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'identity',
      title: '身份',
      type: 'string',
      options: {
        list: [
          { title: '組長', value: 'leader' },
          { title: '家長', value: 'parent' },
          { title: '合心同工', value: 'staff' },
          { title: '組員', value: 'member' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'devotion',
      title: '靈修',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'cellGroup',
      title: '細胞小組',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'sundayService',
      title: '主日聚會',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'prayerMeeting',
      title: '禱告會',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'happinessGroup',
      title: '幸福小組',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'oikos',
      title: 'OIKOS',
      type: 'string',
      options: {
        list: [
          { title: '代禱', value: 'p' },
          { title: 'LINE', value: 'l' },
          { title: '探訪', value: 'v' },
          { title: '幸福講座', value: 'm' },
          { title: '聚餐', value: 'f' },
          { title: '旅遊', value: 't' },
        ],
        layout: 'dropdown',
      },
    },
    {
      name: 'discipleship',
      title: '門訓系統',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'note',
      title: '備註',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'member',
      identity: 'identity',
      devotion: 'devotion',
      cellGroup: 'cellGroup',
      sundayService: 'sundayService',
    },
    prepare(selection: any) {
      const { title, identity, devotion, cellGroup, sundayService } = selection;
      const identityMap: Record<string, string> = {
        leader: '組長',
        parent: '家長',
        staff: '合心同工',
        member: '組員',
      };
      
      const activities = [];
      if (devotion) activities.push('靈修');
      if (cellGroup) activities.push('細胞');
      if (sundayService) activities.push('主日');
      
      return {
        title: `${title} (${identityMap[identity] || identity})`,
        subtitle: activities.length > 0 ? activities.join('・') : '無活動記錄',
      };
    },
  },
};
