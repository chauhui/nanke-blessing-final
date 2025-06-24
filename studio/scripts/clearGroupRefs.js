// studio/scripts/clearGroupRefs.js
require('dotenv').config()
const { createClient } = require('@sanity/client')

// 与 sanity.config.ts 保持一致
const client = createClient({
  projectId: 'von9yh08',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN, // 确保 .env 中有此变量
  useCdn: false,
})

// 要删除的 group 文档 ID
const groupId = 'gnJeqIUmT5gWK5E6lfTxvr'

async function run() {
  // 查出所有 groupReport 文档里引用此 group 的记录
  const docs = await client.fetch(
    '*[_type == "groupReport" && references($groupId)]{_id}',
    { groupId }
  )
  console.log(`Found ${docs.length} groupReport docs referring to group ${groupId}.`)

  // 逐个清除 groupReport 中的 group 引用
  for (const { _id } of docs) {
    await client
      .patch(_id)
      .unset(['group'])
      .commit({ autoGenerateArrayKeys: true })
    console.log(`  → Cleared group reference in groupReport ${_id}`)
  }

  console.log('✅ All groupReport references cleared.')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
