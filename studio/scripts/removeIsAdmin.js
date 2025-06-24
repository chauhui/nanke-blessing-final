// studio/scripts/removeIsAdmin.js
require('dotenv').config()
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'von9yh08',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,  // ← 确保这里读的是你在方案 A/B 中准备的变量
  useCdn: false,
})

async function remove() {
  const docs = await client.fetch(
    '*[_type == "userRegistration" && defined(isAdmin)]{_id}'
  )
  console.log(`Found ${docs.length} docs with isAdmin.`)

  for (const { _id } of docs) {
    await client.patch(_id).unset(['isAdmin']).commit()
    console.log(`  → Removed isAdmin from ${_id}`)
  }
  console.log('✅ Done.')
}

remove().catch(err => {
  console.error(err)
  process.exit(1)
})
