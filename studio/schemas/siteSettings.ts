import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroSlides',
      title: '首頁輪播（拖曳排序）',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'heroSlide' }] }],
      options: { sortable: true },
    }),
  ],
})
