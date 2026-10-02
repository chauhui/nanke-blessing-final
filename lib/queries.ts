// lib/queries.ts
import { groq } from 'next-sanity'

// --- 現有：Hero 區塊查詢 ---
export const heroQuery = `*[_type == "hero"][0]{
  title,
  subtitleZh,
  subtitleEn,
  verseRef,
  overlay,
  bgImage
}`

// --- 新增：生命見證查詢 ---
export const testimoniesQuery = groq`
*[_type == "testimony" && isPublished == true]
| order(order asc, _createdAt desc) {
  _id,
  title,
  tag,
  description,
  youtubeUrl,
  "thumbUrl": coalesce(thumbnail.asset->url, "")
}
`

export type Testimony = {
  _id: string
  title: string
  tag?: string
  description?: string
  youtubeUrl: string
  thumbUrl?: string
}

export const memberResourcesQuery = groq`
*[_type == "memberResource" && isPublished == true]
| order(isFeatured desc, order asc, publishedAt desc) {
  _id,
  title,
  description,
  category,
  resourceType,
  url,
  publishedAt,
  isFeatured,
  "fileUrl": file.asset->url,
  "fileName": file.asset->originalFilename,
  "fileSize": file.asset->size,
  "mimeType": file.asset->mimeType
}
`

export type MemberResource = {
  _id: string
  title: string
  description?: string
  category: string
  resourceType: 'file' | 'link'
  url?: string
  publishedAt: string
  isFeatured?: boolean
  fileUrl?: string
  fileName?: string
  fileSize?: number
  mimeType?: string
}
