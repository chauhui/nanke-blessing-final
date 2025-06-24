export default {
  name: 'groupReport',
  title: '小組回報',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '標題',
      type: 'string',
      description: '例如: 2023年10月第一週小組回報',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: '回報日期',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'group',
      title: '小組',
      type: 'string',
      options: {
        list: [
          { title: '尤君小組', value: 'group1' },
          { title: '朝暉小組', value: 'group2' },
          { title: '榮杰小組', value: 'group3' },
          { title: '秀蘭小組', value: 'group4' },
          { title: '俊男小組', value: 'group5' },
          { title: '青少年團契', value: 'group6' },
          { title: '黃晨小組', value: 'group7' },
          { title: '勝騰小組', value: 'group8' },
          { title: '玉真小組', value: 'group9' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'reports',
      title: '組員回報',
      type: 'array',
      of: [{ type: 'memberReport' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'notes',
      title: '備註',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'title',
      group: 'group',
      date: 'date',
      reportCount: 'reports.length',
    },
    prepare(selection: any) {
      const { title, group, date, reportCount } = selection;
      const groupMap: Record<string, string> = {
        group1: '尤君小組',
        group2: '朝暉小組',
        group3: '榮杰小組',
        group4: '秀蘭小組',
        group5: '俊男小組',
        group6: '青少年團契',
        group7: '黃晨小組',
        group8: '勝騰小組',
        group9: '玉真小組',
      };
      
      return {
        title: title || '未命名回報',
        subtitle: `${groupMap[group] || group} • ${date || '未設定日期'} • ${reportCount || 0} 筆回報`,
      };
    },
  },
  orderings: [
    {
      title: '回報日期 (新到舊)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: '回報日期 (舊到新)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
};
