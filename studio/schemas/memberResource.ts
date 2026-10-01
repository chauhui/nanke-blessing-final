import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'memberResource',
  title: '資源中心',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '資源名稱',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '資源說明',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'category',
      title: '分類',
      type: 'string',
      options: {
        list: [
          { title: '教會行政', value: '教會行政' },
          { title: '幸福小組', value: '幸福小組' },
          { title: '細胞小組', value: '細胞小組' },
          { title: '課程教材', value: '課程教材' },
          { title: '表單文件', value: '表單文件' },
          { title: '其他資源', value: '其他資源' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resourceType',
      title: '資源類型',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: '上傳檔案', value: 'file' },
          { title: '外部連結', value: 'link' },
        ],
      },
      initialValue: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: '資源檔案',
      type: 'file',
      description: '上傳 PDF、Word、Excel、PowerPoint、圖片或壓縮檔等資源。',
      hidden: ({ parent }) => parent?.resourceType !== 'file',
      validation: (Rule) => Rule.custom((value, context) => {
        const parent = context.parent as { resourceType?: string } | undefined
        return parent?.resourceType !== 'file' || value ? true : '請上傳資源檔案'
      }),
    }),
    defineField({
      name: 'url',
      title: '外部連結',
      type: 'url',
      description: '請輸入完整網址，例如 https://example.com',
      hidden: ({ parent }) => parent?.resourceType !== 'link',
      validation: (Rule) =>
        Rule.uri({ scheme: ['http', 'https'] }).custom((value, context) => {
          const parent = context.parent as { resourceType?: string } | undefined
          return parent?.resourceType !== 'link' || value ? true : '請輸入外部連結'
        }),
    }),
    defineField({
      name: 'publishedAt',
      title: '發布日期',
      type: 'date',
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: '設為精選資源',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'isPublished',
      title: '顯示於資源中心',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      description: '數字越小越前面。',
      initialValue: 100,
      validation: (Rule) => Rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: '自訂排序',
      name: 'manualOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
    {
      title: '發布日期（新到舊）',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      resourceType: 'resourceType',
      isPublished: 'isPublished',
    },
    prepare({ title, category, resourceType, isPublished }) {
      const typeLabel = resourceType === 'file' ? '檔案' : '連結'
      return {
        title,
        subtitle: `${category || '未分類'} · ${typeLabel}${isPublished === false ? ' · 已隱藏' : ''}`,
      }
    },
  },
})
