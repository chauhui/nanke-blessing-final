import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'monthlyPlan',
  title: '本月主題（月別）',
  type: 'document',
  fields: [
    defineField({
      name: 'month',
      title: '月份 (YYYY-MM)',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .regex(/^\d{4}-(0[1-9]|1[0-2])$/, {name: 'YYYY-MM'})
          .error('請輸入 YYYY-MM，例如 2025-08'),
    }),
    defineField({
      name: 'themeTitle',
      title: '主題 / 書名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'entries',
      title: '每週進度',
      type: 'array',
      of: [
        defineField({
          name: 'entry',
          type: 'object',
          fields: [
            defineField({
              name: 'date',
              title: '日期 (YYYY-MM-DD)',
              type: 'date',
              options: {dateFormat: 'YYYY-MM-DD'},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: '進度標題',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'note',
              title: '備註（可選）',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'title', date: 'date'},
            prepare({title, date}) {
              return {title, subtitle: date}
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'month', subtitle: 'themeTitle'},
  },
  orderings: [
    {
      title: '月份（新→舊）',
      name: 'monthDesc',
      by: [{field: 'month', direction: 'desc'}],
    },
  ],
})
