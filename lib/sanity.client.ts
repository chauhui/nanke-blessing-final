import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// 前端 fetch 公開 Sanity 資料，千萬不要加 token
export const client = createClient({
  projectId: 'von9yh08',        // 使用舊的專案 ID
  dataset: 'production',        // 資料集
  apiVersion: '2024-01-01',
  useCdn: true                  // 公開資料建議設 true，抓 CDN
  // 不要加 token
})

// 初始化圖片 URL 構建器
const builder = imageUrlBuilder(client)

// 圖片源類型
type ImageSource = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}

// 為圖片生成 URL
export function urlFor(source: ImageSource) {
  return builder.image(source)
}

// 獲取優化後的圖片 URL
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

// 執行查詢
export async function fetchQuery<T = any>(query: string, params: Record<string, any> = {}): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params)
    return result
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
}
