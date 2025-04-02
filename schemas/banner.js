// schemas/banner.js

export default {
  name: 'banner',
  title: '首頁 Banner',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '標題',
      type: 'string',
    },
    {
      name: 'image',
      title: '圖片',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'link',
      title: '連結',
      type: 'url',
    },
    {
      name: 'order',
      title: '排序',
      type: 'number',
    },
  ],
  orderings: [
    {
      title: '排序由小到大',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
}
