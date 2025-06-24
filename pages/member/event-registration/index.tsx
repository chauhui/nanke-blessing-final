'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import type { Event as EventType } from '../../../types/event';
import { Calendar, MapPin, Pencil, Clock } from 'lucide-react';
import { client, fetchQuery, getOptimizedImage } from '../../../lib/sanity.client';
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
        const query = `*[_type == "event"] | order(date asc) { _id, title, date, endDate, location, content, "image": image, registrationUrl }`;
        const data = await fetchQuery(query);

        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid data format');
        }

        const formattedEvents = data.map((event: any) => ({
          ...event,
          _rawDateObj: event.date ? new Date(event.date) : null,
          _rawEndDateObj: event.endDate ? new Date(event.endDate) : null,
          displayDate: event.date
            ? new Date(event.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
            : '無日期',
        }));

        if (isMounted) {
          setEvents(formattedEvents);
          setLoading(false);
        }

        // 初始化所有活動的報名人數為 null
        const initialCounts: Record<string, number | null> = {};
        data.forEach((event: any) => {
          initialCounts[event._id] = null;
        });
        if (isMounted) setRegistrationCounts(initialCounts);

        // 並行查詢所有活動的報名人數
        const countPromises = data.map(async (event: any) => {
          const apiUrl = `/api/member/event-registration/count?eventId=${encodeURIComponent(event._id)}`;
          const response = await fetch(apiUrl, { method: 'GET', credentials: 'same-origin' });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          return { eventId: event._id, count: result.success ? result.count ?? 0 : 0 };
        });

        const results = await Promise.all(countPromises);
        if (isMounted) {
          const updated = { ...initialCounts };
          results.forEach(r => {
            updated[r.eventId] = r.count;
          });
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
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-700 my-4">{children}</blockquote>
      ),
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

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse flex space-x-4"><div className="h-4 w-4 bg-blue-400 rounded-full"></div><div className="h-4 w-4 bg-blue-400 rounded-full delay-100"></div><div className="h-4 w-4 bg-blue-400 rounded-full delay-200"></div></div></div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto pb-24 pt-32 relative z-10">
          {events.length > 0 ? events.map(event => (
            <div key={event._id} className="mb-12">
              <div className="backdrop-blur-lg bg-white/70 rounded-2xl shadow-xl overflow-hidden border border-white/20 transition-shadow hover:shadow-2xl">
                <div className="md:flex items-stretch">
                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <Calendar className="w-8 h-8 text-pink-500" />
                      <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">{event.title}</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-600"><Calendar className="w-4 h-4 mr-2" /><span>{event.displayDate}</span></div>
                      <div className="flex items-center text-gray-600"><MapPin className="w-4 h-4 mr-2" /><span>{event.location}</span></div>
                      <div className="flex items-center text-blue-700 font-bold mt-2">目前報名人數：<span className="ml-2">{registrationCounts[event._id] ?? '查詢中...'}</span></div>
                      {event.content && <PortableText value={event.content} components={portableTextComponents} />}
                    </div>
                    <button onClick={() => setSelectedEvent({ id: event._id, title: event.title })} className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full hover:opacity-90 transition">報名參加</button>
                  </div>
                  {event.image?.asset?._ref && (
                    <div className="hidden md:block md:w-2/5 relative pr-8">
                      <div className="relative w-full h-48 md:h-56 lg:h-64">
                        <img
                          src={getOptimizedImage(event.image.asset._ref, 800, 450, 80)}
                          alt={event.title}
                          className="absolute inset-0 w-full h-full object-cover object-left hover:scale-105 transition-transform duration-700"
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
      <Footer />
      {selectedEvent && (
        <EventRegistrationForm
          eventId={selectedEvent.id}
          eventTitle={selectedEvent.title}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .prose ul { list-style: disc; margin-left: 1.5em; }
        .prose ol { list-style: decimal; margin-left: 1.5em; }
        .prose h1, .prose h2 { margin-top: 1.5em; margin-bottom: 0.5em; }
        .prose strong { color: #db2777; }
        .prose a { color: #2563eb; text-decoration: underline; }
        .prose blockquote { border-left: 4px solid #60a5fa; color: #64748b; }
      `}</style>
    </>
  );
}
