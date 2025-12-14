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
    // 容器維持 Japandi 風格設定
    <div className="relative w-full h-[50vh] md:h-[85vh] bg-[#1E1B4B] border-y-[20px] md:border-y-[32px] border-[#F7F5F2] shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] overflow-hidden flex items-center group z-10 box-border">
      
      {/* ✅ 關鍵修正點 1：
         移除了原本的 `hover:pause-animation`。
         改用自定義 class `marquee-track`。
         這樣可以完全控制暫停行為，不受 Tailwind 預設行為干擾。
      */}
      <div className="flex animate-marquee marquee-track">
        {marqueeData.map((slide, index) => (
          <div 
            key={`${index}-${slide.img}`} 
            className="relative h-[50vh] md:h-[85vh] shrink-0 flex items-center py-4 md:py-8"
          >
             <div className="relative h-full aspect-video border-r-[12px] md:border-r-[16px] border-[#F7F5F2] shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.3)] box-content overflow-hidden rounded-[2px]">
                <img 
                  src={slide.img} 
                  alt={slide.title || 'Banner'}
                  className="w-full h-full object-cover transform transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />

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

        /* ✅ 關鍵修正點 2：嚴格限制暫停條件
           (hover: hover) -> 裝置支援滑鼠懸停
           (pointer: fine) -> 裝置是指標類型（如滑鼠），而非觸控
           
           只有同時滿足這兩個條件（也就是電腦版），滑鼠放上去才會暫停。
           手機版（觸控）完全忽略這條規則，所以點擊後不會卡住。
        */
        @media (hover: hover) and (pointer: fine) {
          .marquee-track:hover {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  )
}