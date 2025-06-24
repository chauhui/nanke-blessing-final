// studio/scripts/findAllRefsToGroup.js
require('dotenv').config()
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'von9yh08',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const groupId = 'gnJeqIUmT5gWK5E6lfTxvr'

async function run() {
  const docs = await client.fetch(`*[references($groupId)]{_id, _type}`, { groupId })
  if (!docs.length) {
    console.log('✅ 沒有任何文件引用這個 group。')
  } else {
    console.log('有下列文件引用這個 group：')
    docs.forEach(d => console.log(`${d._type}: ${d._id}`))
  }
}
run().catch(console.error)
