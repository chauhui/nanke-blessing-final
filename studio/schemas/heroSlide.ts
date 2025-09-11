// studio/schemas/heroSlide.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '標題（可留白）',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: '副標（可留白）',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: '圖片（建議 1920×1080 或 16:9）',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: '排序（小在前）',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle', media: 'image'},
    prepare({title, subtitle, media}) {
      return {title: title || '(未命名 Slide)', subtitle, media}
    },
  },
})
