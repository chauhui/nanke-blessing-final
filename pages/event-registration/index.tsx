// pages/event-registration/index.tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Calendar, MapPin, User, ArrowRight, Clock } from 'lucide-react';
import { fetchQuery } from '@/lib/sanity.client';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

const EventRegistrationForm = dynamic(
  () => import('@/components/EventRegistrationForm'),
  { ssr: false }
);

export async function getServerSideProps(ctx: any) {
  return { props: {} }
}

export default function EventRegistration() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string } | null>(null);
  const [registrationCounts, setRegistrationCounts] = useState<{ [key: string]: number | null }>({});

  useEffect(() => {
    let isMounted = true;
    
    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event"] | order(date asc) { _id, title, date, endDate, location, content, "image": image, registrationUrl }`;
        const data = await fetchQuery(query);

        if (!data || !Array.isArray(data)) return;

        const formattedEvents = data.map((event: any) => ({
          ...event,
          displayDate: event.date
            ? new Date(event.date).toLocaleDateString('zh-TW', { year: 'numeric', month: '2-digit', day: '2-digit' })
            : 'TBD',
          displayDay: event.date ? new Date(event.date).getDate() : '--',
          displayMonth: event.date
            ? new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
            : 'DEC',
          weekday: event.date 
            ? new Date(event.date).toLocaleDateString('zh-TW', { weekday: 'long' }) 
            : '',
        }));

        if (isMounted) {
          setEvents(formattedEvents);
          setLoading(false);
        }

        const initialCounts: Record<string, number | null> = {};
        data.forEach((event: any) => { initialCounts[event._id] = null; });
        if (isMounted) setRegistrationCounts(initialCounts);

        const countPromises = data.map(async (event: any) => {
          try {
            const apiUrl = `/api/member/event-registration/count?eventId=${encodeURIComponent(event._id)}`;
            const response = await fetch(apiUrl);
            const result = await response.json();
            return { eventId: event._id, count: result.success ? result.count ?? 0 : 0 };
          } catch {
            return { eventId: event._id, count: 0 };
          }
        });

        const results = await Promise.all(countPromises);
        if (isMounted) {
          const updated = { ...initialCounts };
          results.forEach(r => { updated[r.eventId] = r.count; });
          setRegistrationCounts(updated);
        }
      } catch (err: any) {
        if (isMounted) setLoading(false);
      }
    };

    fetchEvents();
    return () => { isMounted = false; };
  }, []);

  const portableTextComponents = {
    block: {
      normal: ({ children }: any) => <p className="mb-2 text-[#475569] text-sm leading-relaxed">{children}</p>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-4 mb-2 text-[#475569] text-sm">{children}</ul>,
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="text-[#1E1B4B] font-serif animate-pulse tracking-widest">LOADING EVENTS...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F2] text-[#1E1B4B] font-sans selection:bg-[#FFE4E6] selection:text-[#9F1239]">
      <NavBar />
      
      {/* ✅ 修正 1: 頂部 pt-28 (防剪裁)，底部 pb-12 */}
      <main className="flex-grow pt-28 md:pt-32 lg:pt-40 pb-12 md:pb-24">
        <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
          
          {/* --- Header: 標題區 (統一風格修正) --- */}
          {/* ✅ 修正 2: 結構與 Implementation 頁面完全一致 */}
          <div className="border-b border-[#D4C5B5] pb-6 md:pb-10 mb-8 md:mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
              <div>
                {/* 移除裝飾線，改用純文字標籤 */}
                <span className="block text-[10px] md:text-xs font-bold tracking-[0.25em] text-[#94A3B8] mb-2 md:mb-4 uppercase">
                  Upcoming Events
                </span>
                {/* 手機版標題 text-3xl */}
                <h1 className="text-3xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1E1B4B] leading-tight">
                  活動報名
                </h1>
              </div>
              
              {/* 文字對齊：手機靠右 text-right，電腦靠左 md:text-left */}
              <p className="max-w-md text-[#475569] font-medium leading-relaxed text-sm md:text-base pb-1 text-right md:text-left">
                探索教會近期的聚會與特別活動，<br/>邀請您一同參與，連結彼此，經歷神。
              </p>
            </div>
          </div>

          {/* --- Events List --- */}
          <div className="space-y-8 md:space-y-8">
            {events.length > 0 ? events.map(event => (
              <div key={event._id} className="group bg-white rounded-sm shadow-sm border border-[#E2E8F0] hover:border-[#9F1239] hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col md:flex-row relative">
                
                {/* 1. 手機版：滿版圖片 + 懸浮日期 */}
                <div className="md:hidden relative h-48 w-full bg-gray-100">
                  {event.image ? (
                    <img 
                      src={urlFor(event.image).width(600).height(400).url()} 
                      alt={event.title} 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#CBD5E1]">
                      <Calendar className="w-10 h-10" />
                    </div>
                  )}
                  
                  {/* 懸浮日期 Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-sm shadow-md border border-white/50 flex flex-col items-center leading-none text-[#1E1B4B]">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-[#9F1239] mb-0.5">{event.displayMonth}</span>
                    <span className="text-xl font-serif font-bold">{event.displayDay}</span>
                  </div>
                </div>

                {/* 2. 電腦版：左側日期條 */}
                <div className="hidden md:flex bg-[#1E1B4B] text-white p-6 w-32 flex-col items-center justify-center gap-1 shrink-0">
                  <span className="text-xs font-bold tracking-widest opacity-60 uppercase">{event.displayMonth}</span>
                  <span className="text-4xl font-serif font-bold">{event.displayDay}</span>
                  <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">{event.weekday}</span>
                </div>

                {/* 3. 內容區塊 */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center border-b md:border-b-0 md:border-r border-dashed border-[#E2E8F0]">
                  <div className="mb-3 md:mb-4">
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1E1B4B] group-hover:text-[#9F1239] transition-colors mb-2">
                      {event.title}
                    </h2>
                    
                    <div className="flex flex-wrap gap-3 md:gap-4 text-xs md:text-sm text-[#64748B]">
                      <div className="flex items-center gap-1.5 md:hidden">
                        <Calendar className="w-3.5 h-3.5 text-[#9F1239]" />
                        <span>{event.weekday}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F1239]" />
                        <span>{event.displayDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#9F1239]" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {event.content && <div className="line-clamp-2 text-[#475569] text-xs md:text-sm"><PortableText value={event.content} components={portableTextComponents} /></div>}
                </div>

                {/* 4. 電腦版圖片 & 按鈕區 */}
                <div className="md:w-72 flex flex-col">
                  {event.image ? (
                    <div className="h-32 hidden md:flex items-center justify-center bg-[#F1F5F9] relative overflow-hidden">
                      <img src={urlFor(event.image).width(600).height(400).url()} alt={event.title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-700" />
                    </div>
                  ) : (
                    <div className="h-32 hidden md:block bg-[#F1F5F9] flex items-center justify-center text-[#CBD5E1]"><Calendar className="w-12 h-12" /></div>
                  )}
                  
                  <div className="flex-1 bg-[#F8FAFC] p-5 md:p-6 flex flex-col justify-center items-center gap-3 border-t md:border-t-0 border-[#E2E8F0]">
                    <div className="text-xs font-bold text-[#64748B] flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      已報名：<span className="text-[#1E1B4B] text-sm md:text-base">{registrationCounts[event._id] ?? '-'}</span> 人
                    </div>
                    <button onClick={() => setSelectedEvent({ id: event._id, title: event.title })} className="w-full py-3 md:py-2.5 bg-[#1E1B4B] text-white text-xs md:text-sm font-bold tracking-widest uppercase rounded-sm hover:bg-[#9F1239] transition-colors shadow-sm flex items-center justify-center gap-2 group/btn">
                      立即報名 <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

              </div>
            )) : (
              <div className="text-center py-16 md:py-20 bg-white border border-dashed border-[#D4C5B5] rounded-sm">
                <p className="text-[#94A3B8] font-serif text-base md:text-lg">目前沒有開放報名的活動</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      {selectedEvent && (
        <EventRegistrationForm eventId={selectedEvent.id} eventTitle={selectedEvent.title} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}