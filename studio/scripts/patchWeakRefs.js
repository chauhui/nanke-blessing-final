// studio/scripts/patchWeakRefs.js
require('dotenv').config()
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'von9yh08',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

async function run() {
  // 找出所有 groupReport 文件
  const docs = await client.fetch('*[_type == "groupReport" && defined(group) && !group._weak]{_id, group}')

  console.log(`找到 ${docs.length} 個 groupReport 文件含強引用 group。`)
  for (const { _id, group } of docs) {
    if (!group || group._weak) continue;
    await client
      .patch(_id)
      .set({ group: { ...group, _weak: true } })
      .commit()
    console.log(`→ Patched groupReport ${_id} 的 group ref 為弱引用`)
  }
  console.log('✅ 所有 groupReport 強引用已補強為弱引用')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
