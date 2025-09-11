'use client';

import Link from 'next/link';
import { Clock, MapPin } from 'lucide-react';

type CardType = {
  title: string;
  img: string;
  time?: string;
  location: string;
  href?: string;
};

const cards: CardType[] = [
  { title: '主日聚會', time: '每週日 10:00~12:00', location: '南科育成中心 國際會議廳', img: '/images/worship.jpg' },
  { title: '兒童主日學', time: '每週日 10:00~12:00', location: '南科育成中心 B104', img: '/images/youth.jpg' },
  { title: '兒童品格班', time: '每週三 19:00~20:30', location: '善化區小新營56-65號', img: '/images/community.jpg' },
  { title: '小組團契', location: '點擊查看詳情', img: '/images/smallgroup.jpg', href: '/about/groups' },
];

export default function MinistriesPreview() {
  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card) => (
            <article
              key={card.title}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="overflow-hidden rounded-t-xl border-b border-gray-200">
                <img src={card.img} alt={card.title} className="w-full aspect-[16/9] object-cover" />
              </div>

              <div className="p-5 md:p-6">
                {/* 標題：藍（易於區分） */}
                <h3 className="text-[18px] md:text-[19px] font-semibold text-sky-800">{card.title}</h3>

                <ul className="mt-3 space-y-1.5 text-[15px]">
                  {card.time && (
                    <li className="flex items-center gap-2">
                      {/* 時間：琥珀色 */}
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span className="text-amber-700">{card.time}</span>
                    </li>
                  )}
                  <li className="flex items-center gap-2">
                    {/* 位置：翠綠色 */}
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    {card.href ? (
                      <Link href={card.href} className="text-emerald-700 hover:text-emerald-800">
                        {card.location}
                      </Link>
                    ) : (
                      <span className="text-emerald-700">{card.location}</span>
                    )}
                  </li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
