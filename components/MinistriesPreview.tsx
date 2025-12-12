// components/MinistriesPreview.tsx
'use client'

import Link from 'next/link'

const ministries = [
  {
    id: 1,
    title: '主日聚會',
    image: '/images/worship.jpg', 
    time: '每週日 10:00~12:00',
    location: '南科育成中心 國際會議廳',
    link: '/about/gatherings',
  },
  {
    id: 2,
    title: '兒童主日學',
    image: '/images/youth.jpg', 
    time: '每週日 10:00~12:00',
    location: '南科育成中心 B104',
    link: '/about/gatherings',
  },
  {
    id: 3,
    title: '兒童品格班',
    image: '/images/community.jpg', 
    time: '每週三 19:00~20:30',
    location: '善化區小新營56-65號',
    link: '/courses/children-character',
  },
  {
    id: 4,
    title: '小組團契',
    image: '/images/smallgroup.jpg', 
    time: '週間聚會',
    location: '點擊查看詳情',
    link: '/about/groups',
  },
]

export default function MinistriesPreview() {
  return (
    // ✅ 修改 1：手機版間距變小 (gap-3)，電腦版維持 gap-6
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {ministries.map((item) => (
        <Link href={item.link} key={item.id} className="group block">
          <article 
            className="
              h-full bg-white border border-[#D4C5B5] rounded-sm 
              transition-all duration-300 
              hover:border-[#1E1B4B] hover:shadow-xl hover:shadow-[#1E1B4B]/5 hover:-translate-y-1
              flex flex-col
            "
          >
            {/* 圖片區 */}
            {/* ✅ 修改 2：手機版內距變小 (p-2)，電腦版維持 p-3 */}
            <div className="p-2 pb-0 md:p-3 md:pb-0">
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-[#F7F5F2] flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-[#1E1B4B]/0 group-hover:bg-[#1E1B4B]/5 transition-colors duration-300"></div>
              </div>
            </div>

            {/* 內容區 */}
            {/* ✅ 修改 3：手機版內距 p-3，電腦版 p-5 (讓卡片變矮) */}
            <div className="p-3 md:p-5 flex-1 flex flex-col">
              {/* ✅ 修改 4：手機版標題變小 (text-base/text-lg)，電腦版 text-xl */}
              <h3 className="text-base md:text-xl font-serif font-bold text-[#1E1B4B] mb-2 md:mb-4 group-hover:text-[#B45309] transition-colors">
                {item.title}
              </h3>
              
              {/* ✅ 修改 5：手機版行距變緊 (space-y-1.5)，電腦版 space-y-2.5 */}
              <div className="mt-auto space-y-1.5 md:space-y-2.5">
                {/* 時間 */}
                <div className="flex items-start gap-2 md:gap-2.5">
                  {/* 圖示也稍微縮小 */}
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#B45309] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {/* ✅ 修改 6：手機版文字變細 (text-xs)，電腦版 text-[13px] */}
                  <span className="text-xs md:text-[13px] text-[#475569] font-medium leading-tight">
                    {item.time}
                  </span>
                </div>

                {/* 地點 */}
                <div className="flex items-start gap-2 md:gap-2.5">
                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#B45309] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs md:text-[13px] text-[#475569] font-medium leading-tight">
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  )
}