// components/HeroCarousel.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules'
import { useEffect, useMemo, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

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
  { img: '/images/hero3.jpg' },
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
            img: d?.image ? urlFor(d.image).width(1920).height(1080).quality(90).url() : '',
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

  const data = useMemo<HeroSlide[]>(() => {
    if (slides?.length) return slides
    if (remoteSlides === null) return []
    if (remoteSlides.length) return remoteSlides
    return fallbackSlides
  }, [slides, remoteSlides])

  const hasMultiple = data.length > 1

  return (
    // ✅ 容器設定：
    // 手機版 (default)：維持 aspect-video (16:9)，確保圖片完美填滿，不再有巨大留白。
    // 電腦版 (md/lg)：維持固定高度 h-[75vh]，展現大氣感。
    <div className="relative w-full aspect-video md:aspect-auto md:h-[75vh] lg:h-[80vh] overflow-hidden bg-[#F7F5F2]">
      
      {data.length > 0 && (
        <Swiper
          key={`ready-${data.length}`} // 確保資料載入後重新渲染
          className="h-full w-full group"
          modules={[Autoplay, EffectFade, Pagination, Navigation]}
          slidesPerView={1}
          effect="fade" // 使用淡入淡出效果
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={1500} // 轉場時間 1.5 秒
          autoplay={
            hasMultiple
              ? {
                  delay: 6000, // 停留 6 秒後自動換下一張
                  disableOnInteraction: false,
                }
              : false
          }
          pagination={{ clickable: true }} // 顯示下方小白點
          navigation={hasMultiple} // 顯示左右箭頭
        >
          {data.map(({ img, title, subtitle }, idx) => (
            <SwiperSlide key={`${idx}-${img}`}>
              <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
                
                {/* --- [背景層：模糊濾鏡] --- */}
                {/* 讓圖片模糊放大當作背景，增加氛圍感 */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover blur-xl scale-110 opacity-60" 
                  />
                  <div className="absolute inset-0 bg-[#F7F5F2]/40 mix-blend-overlay" />
                  <div className="absolute inset-0 bg-white/10" />
                </div>

                {/* --- [主圖層] --- */}
                {/* 手機版 p-0 (無邊距)，電腦版 p-8 (有邊距) */}
                <div className="relative z-10 h-full w-full p-0 md:p-8 flex items-center justify-center">
                  <img
                    src={img}
                    alt={title || 'Banner'}
                    className="h-full w-auto max-w-full object-contain shadow-sm md:shadow-2xl md:rounded-sm"
                  />
                  
                  {/* 文字層 (如果有標題的話) */}
                  {(title || subtitle) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <div className="bg-black/20 backdrop-blur-sm p-4 md:p-10 rounded-sm max-w-[90%] md:max-w-3xl animate-fade-in-up">
                        {title && (
                          <h1 className="text-xl md:text-4xl lg:text-6xl font-serif font-bold text-white tracking-widest leading-tight drop-shadow-md">
                            {title}
                          </h1>
                        )}
                        {subtitle && (
                          <p className="text-xs md:text-lg text-white/90 font-medium tracking-[0.2em] uppercase mt-2 md:mt-4 drop-shadow-md">
                            {subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* 自定義 Swiper 樣式：小白點與箭頭 */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5 !important;
          width: 8px !important;
          height: 8px !important;
          margin: 0 4px !important;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: white !important;
          transform: scale(1.2);
        }

        .swiper-button-next,
        .swiper-button-prev {
          color: white !important;
          opacity: 0; /* 預設隱藏，滑鼠移過去才顯示 */
          transition: opacity 0.3s ease;
          width: 48px !important;
          height: 48px !important;
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(4px);
          border-radius: 50%;
          z-index: 20; 
        }
        
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 20px !important;
          font-weight: bold;
        }

        /* 電腦版 hover 時顯示箭頭 */
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: #1E1B4B !important;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out 0.3s forwards;
        }
        
        /* 手機版強制隱藏左右箭頭，避免擋住圖片 */
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}