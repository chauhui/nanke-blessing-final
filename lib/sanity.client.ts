import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 前端 fetch 公開 Sanity 資料，千萬不要加 token！
// 只能查公開內容，不能查會員資料、草稿、私有內容
export const client = createClient({
  projectId: 'von9yh08',       // 你的 Sanity Project ID
  dataset: 'production',       // 資料集
  apiVersion: '2023-05-03',    // 建議全專案統一版本
  useCdn: true,                // 公開內容用 CDN
  // 請勿加 token
})

// 初始化圖片 URL 構建器
const builder = imageUrlBuilder(client)

// 圖片源型別
type ImageSource = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

// 建立圖片 URL
export function urlFor(source: ImageSource) {
  return builder.image(source)
}

// 取得優化過的圖片 URL
export function getOptimizedImage(
  source: ImageSource,
  width: number = 1200,
  height: number = 675,
  quality: number = 75
): string {
  return builder
    .image(source)
    .width(width)
    .height(height)
    .quality(quality)
    .fit('crop')
    .auto('format')
    .url() || ''
}

// 前端僅能查公開內容（不可查會員等私有資料）
export async function fetchQuery<T = any>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params)
    return result
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}
