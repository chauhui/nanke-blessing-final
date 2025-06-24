// studio/scripts/clearUserRefs.js
require('dotenv').config()
const { createClient } = require('@sanity/client')

// 与 sanity.config.ts 保持一致
const client = createClient({
  projectId: 'von9yh08',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN, // 确保 .env 里有此变量
  useCdn: false,
})

// 要删除的 userRegistration 文档 ID
const userId = 'gnJeqIUmT5gWK5E6lfTxvr'  // ← 替成要删除的 userRegistration ID

async function run() {
  // 查询所有引用到该 userRegistration 的文档
  const refs = await client.fetch(
    `*[_type in ["registration", "groupReport"] && references($userId)]{_id, _type}`,
    { userId }
  )
  console.log(`Found ${refs.length} docs referencing user ${userId}:`)
  refs.forEach(r => console.log(`  • ${r._type} (${r._id})`))

  for (const { _id, _type } of refs) {
    if (_type === 'registration') {
      // 假设 registration schema 里关联字段名为 user (请按实际修改)
      await client.patch(_id).unset(['user']).commit()
      console.log(`  → Cleared registration.user in ${_id}`)
    } else if (_type === 'groupReport') {
      // groupReport 中 reports 数组里可能也引用了 userRegistration
      await client
        .patch(_id)
        .unset([`reports[_ref == "${userId}"]`])
        .commit({ autoGenerateArrayKeys: true })
      console.log(`  → Cleared groupReport.reports in ${_id}`)
    } else {
      console.log(`  → Skipped ${_type} (${_id}),请手动清理`)  
    }
  }

  console.log('✅ All userRegistration references cleared.')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
