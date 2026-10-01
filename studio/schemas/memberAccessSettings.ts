import { defineField, defineType } from 'sanity'

const roleOptions = [
  { title: '一般會員', value: 'member' },
  { title: '合心同工', value: 'coworker' },
  { title: '小組長', value: 'groupLeader' },
  { title: '長老', value: 'elder' },
]

export default defineType({
  name: 'memberAccessSettings',
  title: '會友專區權限設定',
  type: 'document',
  fields: [
    defineField({
      name: 'resources',
      title: '資源中心最低等級',
      type: 'string',
      options: { list: roleOptions, layout: 'radio' },
      initialValue: 'member',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sundayService',
      title: '主日信息最低等級',
      type: 'string',
      options: { list: roleOptions, layout: 'radio' },
      initialValue: 'member',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'groupReport',
      title: '小組長回報系統最低等級',
      type: 'string',
      options: { list: roleOptions, layout: 'radio' },
      initialValue: 'groupLeader',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: '會友專區權限設定' }),
  },
})
