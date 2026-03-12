// components/MonthlyTheme.tsx
import { client } from '@/lib/sanity.client' // 若這行編譯錯，改成：import { sanity as client } from '@/lib/sanity'

// 1. 撰寫新的 GROQ 語法：抓取「最新建立」且「設定為顯示(isActive)」的一筆重點事工
const query = `*[_type == "monthlyPlan" && isActive == true] | order(_createdAt desc)[0] {
  title,
  "imageUrl": poster.asset->url,
  description
}`

export default async function MonthlyTheme() {
  // 2. 向 Sanity 後台請求資料
  const data: any = await client.fetch(query)

  // 3. 防呆機制：如果後台還沒建立資料，或是沒上傳圖片，顯示預設畫面
  if (!data || !data.imageUrl) {
    return (
      <section style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#333' }}>
          近期重點事工
        </h2>
        <div style={{ color: '#888' }}>目前尚無重點事工宣傳</div>
      </section>
    )
  }

  // 4. 正常顯示海報與內容
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem', border: '1px solid #eaeaea', borderRadius: '8px', backgroundColor: '#fff' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', borderBottom: '2px solid #f3f4f6', paddingBottom: '0.5rem', margin: 0 }}>
        近期重點事工
      </h2>
      
      {/* 顯示海報圖片 */}
      <div style={{ width: '100%' }}>
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
        />
      </div>

      {/* 顯示標題與說明 */}
      <div style={{ marginTop: '0.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', margin: '0 0 0.5rem 0' }}>
          {data.title}
        </h3>
        {data.description && (
          <p style={{ color: '#4b5563', lineHeight: '1.6', whiteSpace: 'pre-wrap', margin: 0 }}>
            {data.description}
          </p>
        )}
      </div>
    </section>
  )
}