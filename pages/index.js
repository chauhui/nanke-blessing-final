import Link from 'next/link'
import { Calendar, Video, Users, BookOpen, Quote } from 'lucide-react'
import { sanityClient } from '../lib/sanity'
import { bannerQuery, eventQuery, newsQuery } from '../lib/queries'
import Banner from '../components/Banner'
import EventList from '../components/EventList'

export default function Home({ banners, events, newsList }) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-surface to-white px-6 py-16 text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* CMS Banner 區塊 */}
        <Banner banners={banners} />

        {/* 歡迎區塊 */}
        <section className="text-center space-y-4">
          <h1 className="text-2xl md:text-5xl font-bold text-blue-900 whitespace-nowrap overflow-hidden text-ellipsis">歡迎來到南科福氣教會</h1>
          <p className="text-lg md:text-xl text-brand">我們是一個在台南科學園區的基督教會，渴望成為祝福的出口。</p>
          <p className="italic text-gray-600">「你要專心仰賴耶和華，不可倚靠自己的聰明」 - 箴言 3:5</p>
        </section>

        {/* 快速導航區塊 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Link href="/about" className="p-6 rounded-2xl shadow-card bg-white hover:bg-brand/20">
            <Users className="mx-auto h-8 w-8 text-blue-700" />
            <h3 className="mt-2 font-semibold">關於我們</h3>
          </Link>
          <Link href="/media" className="p-6 rounded-2xl shadow-card bg-white hover:bg-brand/20">
            <Video className="mx-auto h-8 w-8 text-blue-700" />
            <h3 className="mt-2 font-semibold">影音資源</h3>
          </Link>
          <Link href="/events" className="p-6 rounded-2xl shadow-card bg-white hover:bg-brand/20">
            <Calendar className="mx-auto h-8 w-8 text-blue-700" />
            <h3 className="mt-2 font-semibold">教會活動</h3>
          </Link>
          <Link href="/offering" className="p-6 rounded-2xl shadow-card bg-white hover:bg-brand/20">
            <BookOpen className="mx-auto h-8 w-8 text-blue-700" />
            <h3 className="mt-2 font-semibold">奉獻方式</h3>
          </Link>
        </section>

        {/* 每週經文 */}
        <section className="bg-white p-6 rounded-2xl shadow-card text-center">
          <Quote className="mx-auto text-blue-600 h-6 w-6" />
          <p className="text-xl text-gray-700 italic mt-2">
            「祂的慈愛存到永遠，祂的信實直到萬代。」 - 詩篇 100:5
          </p>
        </section>

        {/* 見證分享區 */}
        <section>
          <h2 className="text-2xl font-bold text-blue-900 mb-4">見證分享</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-card">
              <p className="text-gray-700">「感謝神在我困難中供應一切，讓我看見祂的信實！」</p>
              <p className="mt-2 text-sm text-gray-500">— 小組姊妹</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-card">
              <p className="text-gray-700">「透過服事，我更加認識神的愛，也更願意委身。」</p>
              <p className="mt-2 text-sm text-gray-500">— 敬拜團弟兄</p>
            </div>
          </div>
        </section>

        {/* CMS 活動區塊 */}
        <EventList events={events} />

      </div>
    </main>
  )
}

export async function getStaticProps() {
  const sanity = await import('../lib/sanity');
  const banners  = await sanity.client.fetch(bannerQuery);
  const events   = await sanity.client.fetch(eventQuery);
  const newsList = await sanity.client.fetch(newsQuery);
  return { props: { banners, events, newsList }, revalidate: 1 };
}
