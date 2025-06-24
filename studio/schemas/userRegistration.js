export default {
  name: 'userRegistration',
  title: '用戶註冊',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '姓名',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'email',
      title: '電子郵件',
      type: 'string',
      validation: Rule => Rule.required().email()
    },
    {
      name: 'phone',
      title: '電話',
      type: 'string'
    },
    {
      name: 'password',
      title: '密碼 (已加密)',
      type: 'string',
      readOnly: true
    },
    {
      name: 'isApproved',
      title: '已審核',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'createdAt',
      title: '註冊時間',
      type: 'datetime',
      readOnly: true,
      initialValue: (new Date()).toISOString()
    }
  ],
  orderings: [
    {
      title: '註冊時間 (新到舊)',
      name: 'createdAtDesc',
      by: [
        {field: 'createdAt', direction: 'desc'}
      ]
    },
    {
      title: '註冊時間 (舊到新)',
      name: 'createdAtAsc',
      by: [
        {field: 'createdAt', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'image'
    }
  }
}
