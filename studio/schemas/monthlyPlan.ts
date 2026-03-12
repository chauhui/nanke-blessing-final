import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'monthlyPlan', 
  title: '近期重點事工', 
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '事工標題 (例如：幸福小組熱烈招募中)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: '事工海報 / 圖片',
      type: 'image',
      options: {
        hotspot: true, 
      },
      validation: (Rule) => Rule.required().error('請務必上傳一張事工圖片'),
    }),
    defineField({
      name: 'description',
      title: '簡短說明或行動呼籲 (選填)',
      type: 'text',
      rows: 3,
      description: '例如：歡迎向各小組長報名，或掃描右方 QR Code。',
    }),
    defineField({
      name: 'isActive',
      title: '是否顯示於前台？',
      type: 'boolean',
      description: '如果活動結束，可以把這裡關閉，前台就不會顯示這張海報了。',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'poster', 
    },
  },
  // 🐛 修復區塊：我們把舊的 month 排序刪掉，改成用系統內建的建立時間 (_createdAt) 來排序
  orderings: [
    {
      title: '最新建立',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
})