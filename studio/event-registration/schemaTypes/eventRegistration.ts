// studio/event-registration/schemaTypes/eventRegistration.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'eventRegistration',
  title: '活動報名',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '報名標題',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'event',
      title: '活動',
      type: 'reference',
      to: [{type: 'event'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: '使用者',
      type: 'reference',
      to: [{type: 'userRegistration'}],
      weak: true,                // ← 設為弱引用
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'registeredAt',
      title: '報名時間',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString()
    }),
    // … 如有其他欄位，依原樣補回 …
  ]
})
