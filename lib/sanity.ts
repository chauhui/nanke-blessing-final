import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!, // ← 前端專用
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-05-03', // 建議跟 auth 端一致
  useCdn: true, // 前端查詢資料建議用 CDN
  // 前端**不要**帶 token
})

// 建立 image-url builder
const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)

export const fetchQuery = async (query: string) => {
  try {
    return await client.fetch(query)
  } catch (error) {
    console.error('Sanity query error:', error)
    throw error
  }
}
