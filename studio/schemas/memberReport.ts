// studio/schemas/memberReport.ts

export default {
  name: 'memberReport',
  title: '組員回報',
  type: 'object',
  fields: [
    {
      name: 'member',
      title: '組員姓名',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('請填寫組員姓名'),
    },
    {
      name: 'identity',
      title: '此行回報者身份',
      type: 'string',
      options: {
        list: [
          { title: '組長', value: 'leader' },
          { title: '家長', value: 'parent' },
          { title: '合心同工', value: 'staff' },
          { title: '組員', value: 'member' },
        ],
      },
      validation: (Rule: any) => Rule.required().error('請選擇此行回報者身份'),
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
      name: 'okios',
      title: 'OKIOS',
      type: 'string',
      options: {
        list: [
          { title: '-', value: '' },
          { title: '代禱', value: 'p' },
          { title: 'LINE', value: 'l' },
          { title: '探訪', value: 'v' },
          { title: '幸福講座', value: 'm' },
          { title: '聚餐', value: 'f' },
          { title: '旅遊', value: 't' },
        ],
      },
      initialValue: '',
    },
    {
      name: 'discipleship',
      title: '門訓系統',
      type: 'string',
      options: {
        list: [
          { title: '-', value: '' },
          { title: '門上', value: 'door-up' },
          { title: '門下', value: 'door-down' },
          { title: '福上', value: 'bless-up' },
          { title: '福下', value: 'bless-down' },
        ],
      },
      initialValue: '',
    },
    {
      name: 'note',
      title: '備註',
      type: 'text',
      rows: 2,
    },
  ],
};
