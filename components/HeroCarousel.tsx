// components/HeroCarousel.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { fetchQuery, urlFor } from '@/lib/sanity'

export type HeroSlide = {
  img: string
  title?: string
  subtitle?: string
}

type Props = { slides?: HeroSlide[] }

const fallbackSlides: HeroSlide[] = [
  { img: '/images/hero1.jpg', title: '歡迎回家', subtitle: '經歷信仰、盼望與愛的同在' },
  { img: '/images/hero2.jpg', title: '建造榮耀教會', subtitle: '在真理中扎根，在愛中成長' },
  { img: '/images/hero3.jpg', title: '充滿活力的敬拜', subtitle: '用心靈與誠實敬拜' },
]

export default function HeroCarousel({ slides }: Props) {
  const [remoteSlides, setRemoteSlides] = useState<HeroSlide[] | null>(null)

  useEffect(() => {
    if (slides?.length) return
    ;(async () => {
      try {
        const docs: any[] = await fetchQuery(
          `*[_type=="heroSlide"] | order(order asc, _createdAt asc){
            title, subtitle, image
          }`
        )
        const mapped: HeroSlide[] =
          docs?.map((d) => ({
            img: d?.image ? urlFor(d.image).width(1200).height(675).quality(90).url() : '',
            title: d?.title || '',
            subtitle: d?.subtitle || '',
          }))?.filter((s) => s.img) || []
        setRemoteSlides(mapped)
      } catch (err) {
        console.error('Fetch hero slides failed:', err)
        setRemoteSlides([])
      }
    })()
  }, [slides])

  // 整理資料
  const originalData = useMemo<HeroSlide[]>(() => {
    if (slides?.length) return slides
    if (remoteSlides === null) return []
    if (remoteSlides.length) return remoteSlides
    return fallbackSlides
  }, [slides, remoteSlides])

  // 為了達成「無限循環」，我們需要將資料複製一份接在後面
  // 如果圖片太少(少於4張)，建議複製更多次以填滿寬螢幕
  const marqueeData = useMemo(() => {
    if (originalData.length === 0) return []
    // 至少複製 4 次確保夠長，形成無縫循環
    return [...originalData, ...originalData, ...originalData, ...originalData]
  }, [originalData])

  return (
    // ✅ 容器高度：
    // 手機版：h-[50vh] (一半螢幕高)
    // 電腦版：h-[85vh] (高度撐高，讓 16:9 圖片能依比例放大)
    <div className="relative w-full h-[50vh] md:h-[85vh] bg-[#1E1B4B] overflow-hidden flex items-center group">
      
      {/* 跑馬燈軌道 */}
      <div className="flex animate-marquee hover:pause-animation">
        {marqueeData.map((slide, index) => (
          <div 
            key={`${index}-${slide.img}`} 
            className="relative h-[50vh] md:h-[85vh] shrink-0 flex items-center"
          >
             {/* 圖片容器 
                aspect-video: 強制保持 16:9 比例
                h-full: 高度跟隨父容器
                w-auto: 寬度自動根據高度調整 (這就是不裁切的關鍵!)
             */}
             <div className="relative h-full aspect-video border-r-[8px] md:border-r-[12px] border-[#F7F5F2] box-content overflow-hidden">
                <img 
                  src={slide.img} 
                  alt={slide.title || 'Banner'}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* 文字遮罩 (滑鼠移上去才顯示，保持畫面乾淨) */}
                {(slide.title || slide.subtitle) && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-4">
                     <h3 className="text-xl md:text-4xl font-serif font-bold text-white mb-2 drop-shadow-md">
                       {slide.title}
                     </h3>
                     <p className="text-xs md:text-lg text-white/90 tracking-widest uppercase">
                       {slide.subtitle}
                     </p>
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>

      {/* CSS 動畫設定 */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } /* 移動 50% 因為我們複製了數據 */
        }

        .animate-marquee {
          display: flex;
          width: max-content; /* 讓寬度根據內容自動延伸 */
          animation: marquee 60s linear infinite; /* 60秒跑完一輪，數值越大越慢 */
        }

        /* 手機版可以跑快一點 */
        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 40s;
          }
        }

        /* 滑鼠懸停時暫停 */
        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}