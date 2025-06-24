'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

const slides = [
  {
    img: '/images/hero1.jpg',
    title: '歡迎您來到南科福氣教會！',
    subtitle: '耶穌愛您，上帝祝福您！',
    buttonText: '加入我們'
  },
  {
    img: '/images/hero2.jpg',
    title: '',
    subtitle: '',
    buttonText: ''
  },
  {
    img: '/images/hero3.jpg',
    title: '南科福氣教會',
    subtitle: '在這裡經歷信仰、盼望與愛的同在',
    buttonText: '線上報名'
  }

]

export default function HeroCarousel() {
  return (
    <div className="w-screen h-[56.25vw] md:h-auto md:aspect-[16/9] aspect-auto relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <Swiper className="max-h-full max-w-full w-full" 
                  modules={[Autoplay, Pagination]}
                  loop 
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }} 
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                >
                  {slides.map((s) => (
                    <SwiperSlide key={s.img}>
                      <div className="h-full w-full relative">
                        <img 
                          src={s.img} 
                          className="w-full h-full object-cover object-center"
                          alt="輪播圖片"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-br" style={{background: 'linear-gradient(135deg, #7f8fdc 0%, #e5e7fa 60%, #f5d3e6 100%)', opacity: 0.38}} />
                          <div className="absolute inset-0" style={{background: 'rgba(127,143,220,0.07)'}} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center text-white z-10 max-w-2xl px-4 pt-8 md:pt-0">
                            <h1 className="text-xl md:text-5xl font-bold mb-4 whitespace-nowrap">{s.title}</h1>
                            <p className="text-base md:text-2xl mb-8">{s.subtitle}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
        </Swiper>
      </div>
    </div>
  )
}