// schemas/donation.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'donation',
  title: '奉獻資訊',
  type: 'document',
  fields: [
    defineField({
      name: 'amount',
      title: '奉獻金額（元）',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'name',
      title: '姓名（奉獻編號）',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'type',
      title: '奉獻用途',
      type: 'string',
      options: {
        list: [
          { title: '十一', value: '十一' },
          { title: '建堂', value: '建堂' },
          { title: '宣教', value: '宣教' },
          { title: '慈惠', value: '慈惠' },
          { title: '其他', value: '其他' },
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'note',
      title: '用途說明（如選其他）',
      type: 'string'
    }),
    defineField({
      name: 'createdAt',
      title: '送出時間',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    })
  ]
})
