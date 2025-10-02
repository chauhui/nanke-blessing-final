// sanity/schemas/testimony.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimony',
  title: '生命見證',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '標題',
      type: 'string',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'tag',
      title: '標籤（如：夫妻、親子…）',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: '簡介',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube 連結（建議貼「分享」連結或 https://www.youtube.com/watch?v=...）',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }).required(),
    }),
    defineField({
      name: 'thumbnail',
      title: '縮圖（可選，不上傳則以 YouTube 預設縮圖顯示）',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: '排序（數字小的排前面）',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'isPublished',
      title: '發佈',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      subtitle: 'tag',
    },
  },
  orderings: [
    {
      title: '自訂排序（由小到大）',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }, { field: '_createdAt', direction: 'desc' }],
    },
  ],
})
