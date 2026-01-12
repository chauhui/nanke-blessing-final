import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sundayService',
  title: '主日信息 (Sunday Service)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '信息主題 (Title)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: '講員 (Speaker)',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: '日期 (Date)',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube 連結',
      type: 'url',
      description: '請貼上完整的 YouTube 影片網址 (例如：https://www.youtube.com/watch?v=xxxxx)',
    }),
    defineField({
      name: 'slides',
      title: '信息簡報 (PDF/PPT)',
      type: 'file',
      description: '請上傳當週信息的簡報檔案 (支援 PDF, PPT, PPTX)',
      options: {
        accept: '.pdf,.ppt,.pptx,.key'
      }
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
})