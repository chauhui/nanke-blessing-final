// schemas/pageViewLog.ts
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pageViewLog',
  type: 'document',
  title: '頁面瀏覽紀錄',
  fields: [
    defineField({ name: 'page', type: 'string', title: '頁面路徑' }),
    defineField({ name: 'date', type: 'date', title: '日期' }),
    defineField({ name: 'ip', type: 'string', title: 'IP' }),
    defineField({ name: 'userAgent', type: 'string', title: '裝置資訊' }),
    defineField({ name: 'referer', type: 'string', title: '來源' }),
    defineField({ name: 'country', type: 'string', title: '國家' }),
  ]
})
