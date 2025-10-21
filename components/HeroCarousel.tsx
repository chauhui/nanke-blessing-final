// components/HeroCarousel.tsx
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { useEffect, useMemo, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

// 後台（Sanity）
import { fetchQuery, urlFor } from '@/lib/sanity'

export type HeroSlide = {
  img: string
  title?: string
  subtitle?: string
}

type Props = { slides?: HeroSlide[] }

const fallbackSlides: HeroSlide[] = [
  { img: '/images/hero1.jpg', title: '歡迎您來到南科福氣教會！', subtitle: '耶穌愛您，上帝祝福您！' },
  { img: '/images/hero2.jpg' },
  { img: '/images/hero3.jpg', title: '南科福氣教會', subtitle: '在這裡經歷信仰、盼望與愛的同在' },
]

export default function HeroCarousel({ slides }: Props) {
  const [remoteSlides, setRemoteSlides] = useState<HeroSlide[] | null>(null)

  // 沒傳入 slides 才抓後台：依 order、_createdAt 由小到大
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
            img: d?.image ? urlFor(d.image).width(1920).height(1080).quality(80).url() : '',
            title: d?.title || '',
            subtitle: d?.subtitle || '',
          }))?.filter((s) => s.img) || []
        setRemoteSlides(mapped.length ? mapped : null)
      } catch (err) {
        console.error('Fetch hero slides failed:', err)
        setRemoteSlides(null)
      }
    })()
  }, [slides])

  // 使用後台 > 傳入 > 預設
  const data = useMemo<HeroSlide[]>(
    () => (remoteSlides?.length ? remoteSlides : slides?.length ? slides : fallbackSlides),
    [slides, remoteSlides]
  )
  const hasMultiple = data.length > 1

  // —— 產生自然汽水泡泡（隨機尺寸、延遲、速度、水平擺動、輕微模糊/透明）——
  const bubbles = useMemo(() => {
    const arr: {
      left: number
      size: number
      startX: number
      delay: number
      duration: number
      amp: number
      blur: number
      opacity: number
    }[] = []
    const COUNT = 28
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        left: Math.random() * 100,               // 0~100%
        size: 3 + Math.random() * 7,             // 3~10px
        startX: (Math.random() - 0.5) * 12,      // 初始左右位移
        delay: Math.random() * 6,                // 0~6s
        duration: 9 + Math.random() * 9,         // 9~18s
        amp: 4 + Math.random() * 10,             // 左右擺幅
        blur: Math.random() < 0.6 ? Math.random() * 2 : 0,
        opacity: 0.35 + Math.random() * 0.45,    // 0.35~0.8
      })
    }
    return arr
  }, [])

  return (
    <div className="relative w-full h-[56.25vw] md:h-auto md:aspect-[16/9] overflow-hidden">
      <Swiper
        key={`ready-${data.length}`}
        className="h-full w-full"
        modules={[Autoplay, EffectFade, Pagination]}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={false}
        rewind={hasMultiple}
        speed={650}
        observer
        observeParents
        observeSlideChildren
        autoplay={
          hasMultiple
            ? {
                delay: 5000,
                disableOnInteraction: false,
                stopOnLastSlide: false,
                waitForTransition: false,
              }
            : false
        }
        pagination={{ clickable: true }}
        onInit={(swiper) => {
          try { if (hasMultiple && !swiper.autoplay.running) swiper.autoplay.start() } catch {}
        }}
        onSlideChangeTransitionEnd={(swiper) => {
          try { if (hasMultiple && !swiper.autoplay.running) swiper.autoplay.start() } catch {}
        }}
      >
        {data.map(({ img, title, subtitle }, idx) => (
          <SwiperSlide key={`${idx}-${img}`}>
            <div className="relative h-full w-full">
              <img
                src={img}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* —— 旌旗感的柔和遮罩：不洗白、只提亮 —— */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/0" />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(45% 30% at 20% 85%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)',
                  mixBlendMode: 'overlay',
                }}
              />

              {/* —— 文字 —— */}
              <div className="relative z-20 flex h-full items-center justify-center text-center px-6">
                <div className="max-w-2xl">
                  {title ? (
                    <h1 className="text-white text-2xl md:text-5xl font-bold mb-3 leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                      {title}
                    </h1>
                  ) : null}
                  {subtitle ? (
                    <p className="text-white/95 text-base md:text-2xl drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
                      {subtitle}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* —— 氣泡動畫（自然上飄＋左右擺動） —— */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-30">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              left: `${b.left}%`,
              bottom: '-16px',
              transform: `translateX(${b.startX}px)`,
              animation: `bubbleWiggle ${b.duration * 0.85}s ease-in-out ${b.delay / 2}s infinite`,
              // @ts-ignore
              '--amp': `${b.amp}px`,
            } as React.CSSProperties}
          >
            <span
              className="block rounded-full"
              style={{
                width: `${b.size}px`,
                height: `${b.size}px`,
                background: 'rgba(255,255,255,0.55)',
                filter: b.blur ? `blur(${b.blur}px)` : 'none',
                opacity: b.opacity,
                boxShadow: '0 0 0 0.5px rgba(255,255,255,0.45)',
                animation: `floatUpVH ${b.duration}s linear ${b.delay}s infinite`,
                willChange: 'transform, opacity',
                display: 'block',
              }}
            />
          </span>
        ))}
      </div>

      {/* 動畫寫在元件裡，不用改 tailwind */}
      <style jsx global>{`
        @keyframes floatUpVH {
          0%   { transform: translateY(0);       opacity: var(--op, 0.85); }
          100% { transform: translateY(-115vh);  opacity: 0; }
        }
        @keyframes bubbleWiggle {
          0%   { transform: translateX(0); }
          22%  { transform: translateX(calc(var(--amp) * -1)); }
          50%  { transform: translateX(calc(var(--amp) * 0.7)); }
          78%  { transform: translateX(calc(var(--amp) * -0.8)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}
