// schemas/pageViewLog.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pageViewLog',
  type: 'document',
  title: '頁面瀏覽紀錄',
  fields: [
    defineField({
      name: 'site',
      type: 'string',
      title: '來源網域',
      description: '例如：nanke-blessing.vercel.app',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'page',
      type: 'string',
      title: '頁面路徑',
      description: '例如：/、/about',
    }),
    // === 新增：頁面標題 ===
    defineField({
      name: 'title',
      type: 'string',
      title: '頁面標題',
      description: '紀錄當下的中文網頁標題',
    }),
    // ====================
    defineField({
      name: 'date',
      type: 'date',
      title: '日期（YYYY-MM-DD）',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'ip', type: 'string', title: 'IP' }),
    defineField({ name: 'userAgent', type: 'string', title: '裝置資訊' }),
    defineField({ name: 'referer', type: 'string', title: '來源（Referer）' }),
    defineField({ name: 'country', type: 'string', title: '國家' }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      title: '建立時間',
      readOnly: true,
    }),
  ],
  initialValue: () => ({
    date: new Date().toISOString().slice(0, 10),
    createdAt: new Date().toISOString(),
  }),
  preview: {
    select: {
      title: 'title', // 優先顯示中文標題
      subtitle: 'page',
      date: 'date',
      country: 'country',
    },
    prepare({title, subtitle, date, country}) {
      const sub = [subtitle, date, country].filter(Boolean).join(' · ')
      return {title: title || '(未指定標題)', subtitle: sub}
    },
  },
})