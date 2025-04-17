import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import { urlFor } from '../lib/sanity';

export default function Banner({ banners = [] }) {
  if (!banners.length) return null;

  return (
    <section className="rounded-xl overflow-hidden shadow">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {banners.map((b) => (
          b.image?.asset && (
            <SwiperSlide key={b._id}>
              <Image
                src={urlFor(b.image).width(1600).height(700).url()}
                alt=""
                width={1600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </SwiperSlide>
          )
        ))}
      </Swiper>
    </section>
  );
}
