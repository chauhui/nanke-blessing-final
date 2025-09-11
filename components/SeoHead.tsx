import Head from 'next/head'

// 站台網址（保持可配置）
const SITE_URL = 'https://nanke-blessing.vercel.app'

export default function SeoHead() {
  const siteTitle = '南科福氣教會'
  const siteDescription = '歡迎來到南科福氣教會，與我們一起經歷信仰、盼望與愛的同在'
  const siteUrl = SITE_URL

  // 使用公開可訪問的圖片 URL
  const siteImage = `${SITE_URL}/images/og-image-1.jpg`
  const siteImageWidth = '1200'
  const siteImageHeight = '630'
  const siteImageAlt = '南科福氣教會'

  // 確保圖片 URL 是完整絕對路徑
  const fullImageUrl =
    siteImage.startsWith('http')
      ? siteImage
      : `${SITE_URL}${siteImage.startsWith('/') ? '' : '/'}${siteImage}`

  return (
    <Head>
      {/* 基本 */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:secure_url" content={fullImageUrl} />
      <meta property="og:image:width" content={siteImageWidth} />
      <meta property="og:image:height" content={siteImageHeight} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content={siteImageAlt} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="zh_TW" />
      {/* 若在 SSR 場景不想造成每次輸出不同，可拿掉 updated_time；保留不會壞功能 */}
      <meta property="og:updated_time" content={new Date().toISOString()} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={siteImageAlt} />
      <meta name="twitter:site" content="@nanke_blessing" />
      <meta name="twitter:creator" content="@nanke_blessing" />

      {/* OS / 瀏覽器外觀 */}
      <meta name="theme-color" content="#ffffff" />

      {/* LINE（如需） */}
      {/* <meta name="line:app_id" content="YOUR_LINE_APP_ID" />
      <meta name="line:share:image" content={fullImageUrl} /> */}
    </Head>
  )
}
