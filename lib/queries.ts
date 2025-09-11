// lib/queries.ts
import { groq } from 'next-sanity'
import type { SanityClient } from '@sanity/client'

// --- 現有：Hero 區塊查詢 ---
export const heroQuery = `*[_type == "hero"][0]{
  title,
  subtitleZh,
  subtitleEn,
  verseRef,
  overlay,
  bgImage
}`

// --- 新增：本月主題（使用 themeTitle 與 entries[]） ---
export const qMonthlyPlan = groq`*[_type=="monthlyPlan" && month==$ym][0]{
  "theme": coalesce(themeTitle, theme),
  "weeks": entries[] | order(date asc){ _key, title, date, note }
}`

// 產生 YYYY-MM（例如 2025-08）
export const ym = (d: Date = new Date()) =>
  new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit' }).format(d)

// 提供給前端呼叫的函式（下一步會在頁面/元件接這個函式）
export async function getMonthlyPlan(client: SanityClient, d: Date = new Date()) {
  return client.fetch(qMonthlyPlan, { ym: ym(d) })
}
