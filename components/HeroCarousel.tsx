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

  const originalData = useMemo<HeroSlide[]>(() => {
    if (slides?.length) return slides
    if (remoteSlides === null) return []
    if (remoteSlides.length) return remoteSlides
    return fallbackSlides
  }, [slides, remoteSlides])

  const marqueeData = useMemo(() => {
    if (originalData.length === 0) return []
    return [...originalData, ...originalData, ...originalData, ...originalData]
  }, [originalData])

  return (
    // ✅ 容器修正 (Japandi 風格)：
    // 1. border-y-[20px]: 上下加厚邊框。
    // 2. border-[#F7F5F2]: 邊框顏色 = 網頁背景色 (暖米灰)。
    //    這創造了一種「軌道嵌入牆面」的感覺，而不是畫一條黑線。
    // 3. shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]: 加入「內陰影」，增加深度感。
    <div className="relative w-full h-[50vh] md:h-[85vh] bg-[#1E1B4B] border-y-[20px] md:border-y-[32px] border-[#F7F5F2] shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] overflow-hidden flex items-center group z-10 box-border">
      
      {/* 跑馬燈軌道 */}
      <div className="flex animate-marquee hover:pause-animation">
        {marqueeData.map((slide, index) => (
          <div 
            key={`${index}-${slide.img}`} 
            // 上下內距保持，讓圖片懸浮
            className="relative h-[50vh] md:h-[85vh] shrink-0 flex items-center py-4 md:py-8"
          >
             {/* ✅ 圖片與分隔線修正：
                1. border-r-[#F7F5F2]: 分隔線使用暖米灰，與背景融合。
                2. shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)]: 
                   陰影變得更「柔和」，像自然光下的層次，不再是生硬的黑影。
             */}
             <div className="relative h-full aspect-video border-r-[12px] md:border-r-[16px] border-[#F7F5F2] shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)] box-content overflow-hidden rounded-[2px]">
                <img 
                  src={slide.img} 
                  alt={slide.title || 'Banner'}
                  className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />

                {/* 文字遮罩 */}
                {(slide.title || slide.subtitle) && (
                  <div className="absolute inset-0 bg-[#1E1B4B]/40 opacity-0 hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-center p-4 backdrop-blur-[2px]">
                     <h3 className="text-xl md:text-4xl font-serif font-bold text-white mb-3 drop-shadow-md">
                       {slide.title}
                     </h3>
                     <div className="w-10 h-[1px] bg-[#B45309] mb-3"></div>
                     <p className="text-xs md:text-lg text-white/90 tracking-widest uppercase font-medium">
                       {slide.subtitle}
                     </p>
                  </div>
                )}
             </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 60s linear infinite;
        }

        @media (max-width: 768px) {
          .animate-marquee {
            animation-duration: 40s;
          }
        }

        @media (hover: hover) {
          .hover\:pause-animation:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  )
}