// components/MonthlyTheme.tsx
import { getMonthlyPlan } from '@/lib/queries'
import { client } from '@/lib/sanity.client' // 若這行編譯錯，改成：import { sanity as client } from '@/lib/sanity'

export default async function MonthlyTheme() {
  const data: any = await getMonthlyPlan(client)
  if (!data) return <section><h2>本月主題</h2><div>尚無資料</div></section>

  return (
    <section>
      <h2>本月主題</h2>
      <h3>{data.theme}</h3>
      <ul>
        {data.weeks?.map((w: any) => {
          const md = new Date(w.date).toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' })
          return <li key={w._key}>{md}　{w.title || '主題待公布'}</li>
        })}
      </ul>
    </section>
  )
}
