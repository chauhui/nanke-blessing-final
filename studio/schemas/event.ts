import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'event',
  title: '活動',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: '標題', 
      type: 'string', 
      validation: Rule => Rule.required(),
    }),

    defineField({ 
      name: 'content', 
      title: '備註', 
      type: 'array', 
      of: [{ type: 'block' }],
    }),
    defineField({ 
      name: 'date', 
      title: '開始日期', 
      type: 'datetime',
    }),
    defineField({ 
      name: 'endDate', 
      title: '結束日期', 
      type: 'datetime',
    }),
    defineField({ 
      name: 'image', 
      title: '圖片', 
      type: 'image', 
      options: { hotspot: true },
    }),
    defineField({ 
      name: 'location', 
      title: '地點', 
      type: 'string',
    }),
    // 你還可以加更多欄位，例如報名人數、報名截止等
  ]
})