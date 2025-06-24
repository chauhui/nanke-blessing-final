require('dotenv').config()
const { createClient } = require('@sanity/client')

// 設定
const client = createClient({
  projectId: 'von9yh08',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

// 你想刪除的 userRegistration id
const userId = 'gnJeqIUmT5gWK5E6lfTxvr'

async function run() {
  // 查出所有含有 _ref 指到這個 user 的文件（不限型別）
  const docs = await client.fetch(`
    *[references($userId)]{
      _id, _type, 
      ...,
    }
  `, { userId })

  console.log(`共找到 ${docs.length} 個文件 reference 到這個 user。`)

  for (const doc of docs) {
    let changed = false;
    // 遍歷所有欄位，找出是 reference 而且 _ref 指向 userId
    function patchRefs(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(patchRefs)
      } else if (typeof obj === 'object' && obj !== null) {
        for (const key of Object.keys(obj)) {
          const v = obj[key]
          if (
            v &&
            typeof v === 'object' &&
            v._ref === userId &&
            v._type === 'reference' &&
            !v._weak
          ) {
            obj[key] = { ...v, _weak: true }
            changed = true
          } else {
            patchRefs(v)
          }
        }
      }
    }

    patchRefs(doc)
    if (changed) {
      await client.patch(doc._id).set(doc).commit()
      console.log(`→ Patched ${doc._type} ${doc._id} 的 reference 為弱引用`)
    }
  }
  console.log('✅ 所有引用該 user 的 reference 都已強制 patch 成弱引用')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})
