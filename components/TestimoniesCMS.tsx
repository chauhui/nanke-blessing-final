// components/TestimoniesCMS.tsx
import React from 'react'
import type { Testimony } from '@/lib/queries' // ← 修正路徑：從 lib/queries 匯入

function extractYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.replace('/', '')
    }
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname === '/watch') return u.searchParams.get('v')
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/')[2]
      if (u.pathname.startsWith('/shorts/')) return u.pathname.split('/')[2]
    }
    return null
  } catch {
    return null
  }
}

export default function TestimoniesCMS({ items }: { items: Testimony[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold tracking-tight mb-2">生命見證</h2>
      <p className="text-gray-600 mb-8">聆聽弟兄姊妹分享他們的生命故事。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((t) => {
          const vid = extractYouTubeId(t.youtubeUrl)
          const embedSrc = vid ? `https://www.youtube.com/embed/${vid}` : t.youtubeUrl
          return (
            <article key={t._id} className="rounded-2xl shadow-sm border border-gray-200 bg-white overflow-hidden">
              <div className="p-4 pb-0">
                <div className="flex items-center gap-2 mb-3">
                  {t.tag ? (
                    <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1">
                      {t.tag}
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                </div>
              </div>

              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={embedSrc}
                  title={t.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {t.description ? (
                <div className="p-4 text-gray-700 leading-relaxed">
                  {t.description}
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
