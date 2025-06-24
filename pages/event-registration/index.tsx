'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import type { Event as EventType } from '../../types/event';
import { Calendar, MapPin, Pencil, Clock } from 'lucide-react';
import { client, fetchQuery, getOptimizedImage } from '../../lib/sanity.client';
import { PortableText } from '@portabletext/react';

// 動態載入表單組件，禁用 SSR
const EventRegistrationForm = dynamic(
  () => import('@/components/EventRegistrationForm'),
  { ssr: false }
);

type Event = EventType;

export default function EventRegistration() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<{ id: string; title: string } | null>(null);
  const [error, setError] = useState('');
  // 報名人數（map: eventId -> count）
  const [registrationCounts, setRegistrationCounts] = useState<{ [key: string]: number | null }>({});

  useEffect(() => {
    let isMounted = true;

    const fetchEvents = async () => {
      try {
        const query = `*[_type == "event"] | order(date asc) {
          _id,
          title,
          date,
          endDate,
          location,
          description,
          content,
          "image": image,
          registrationUrl,
          category
        }`;

        const data = await fetchQuery(query);
        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        const formatted = data.map((e: any) => ({
          ...e,
          _rawDateObj: e.date ? new Date(e.date) : null,
          _rawEndDateObj: e.endDate ? new Date(e.endDate) : null,
          displayDate: e.date
            ? new Date(e.date).toLocaleDateString('zh-TW', {
                year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
              })
            : '無日期',
        }));

        if (isMounted) {
          setEvents(formatted);
          setLoading(false);
        }

        // 初始化報名人數為 null
        const initCounts: Record<string, number | null> = {};
        data.forEach((e: any) => { initCounts[e._id] = null; });
        if (isMounted) setRegistrationCounts(initCounts);

        // 並行查詢各活動人數
        const promises = data.map(async (e: any) => {
          const url = `/api/event-registration-count?eventId=${encodeURIComponent(e._id)}`;
          const res = await fetch(url);
          const json = await res.json();
          return { id: e._id, count: json.success ? json.count ?? 0 : 0 };
        });
        const results = await Promise.all(promises);
        if (isMounted) {
          const updated = { ...initCounts };
          results.forEach(r => { updated[r.id] = r.count; });
          setRegistrationCounts(updated);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(`無法載入活動資訊 (${err.message})`);
          setLoading(false);
        }
      }
    };

    fetchEvents();
    return () => { isMounted = false; };
  }, []);

  const portableTextComponents = {
    block: {
      h1: ({ children }: any) => <h1 className="text-2xl font-bold mt-4 mb-2 text-pink-700">{children}</h1>,
      h2: ({ children }: any) => <h2 className="text-xl font-semibold mt-3 mb-2 text-blue-700">{children}</h2>,
      normal: ({ children }: any) => <p className="mb-3">{children}</p>,
      blockquote: ({ children }: any) => <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-700 my-4">{children}</blockquote>,
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-3">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-3">{children}</ol>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-pink-600">{children}</strong>,
      em: ({ children }: any) => <em className="italic">{children}</em>,
      underline: ({ children }: any) => <span className="underline">{children}</span>,
      link: ({ children, value }: any) => (
        <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-pink-600">{children}</a>
      ),
    },
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse flex space-x-4"><div className="h-4 w-4 bg-blue-400 rounded-full"></div><div className="h-4 w-4 bg-blue-400 rounded-full delay-100"></div><div className="h-4 w-4 bg-blue-400 rounded-full delay-200"></div></div></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto pb-24 pt-32 relative z-10">
          {events.length > 0 ? events.map(event => (
            <div key={event._id} className="mb-12">
              <div className="backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl overflow-hidden border border-white/20 transition-shadow hover:shadow-2xl">
                <div className="md:flex">
                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <Calendar className="w-8 h-8 text-pink-500" />
                      <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">{event.title}</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600"><Clock className="w-4 h-4 mr-2" /><span>{event.displayDate}</span></div>
                      <div className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2" /><span>{event.location}</span></div>
                      <div className="flex items-center text-blue-700 font-bold">目前報名人數：<span className="ml-2">{registrationCounts[event._id] ?? '查詢中...'}</span></div>
                      <p className="text-gray-700 mt-2">{event.description}</p>
                      {event.content && <PortableText value={event.content} components={portableTextComponents} />}
                    </div>
                    <button onClick={() => setSelectedEvent({ id: event._id, title: event.title })} className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full hover:opacity-90 transition">報名參加</button>
                  </div>
                  {event.image && (
                    <div className="hidden md:block md:w-2/5 relative pr-8">
                      <div className="relative w-full h-64">
                        <img
                          src={getOptimizedImage((event.image.asset as { _ref: string })._ref, 800, 450, 80)}
                          alt={event.title}
                          className="absolute inset-0 w-full h-full object-cover object-left hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) : <p className="text-center text-gray-600 py-12">目前沒有活動</p>}
        </div>
      </main>
      {selectedEvent && <EventRegistrationForm eventId={selectedEvent.id} eventTitle={selectedEvent.title} onClose={() => setSelectedEvent(null)} />}
    </>
  );
}
