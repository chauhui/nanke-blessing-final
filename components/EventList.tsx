// components/EventList.tsx
import React from 'react'

type EventItem = {
  id?: string
  title: string
  url?: string
  start: string // ISO
  end?: string
  allDay?: boolean
  location?: string
}

type Props = { events?: EventItem[] } // ← 允許未傳入

const TZ = 'Asia/Taipei'
const WEEKDAY = ['週日','週一','週二','週三','週四','週五','週六']
const fMD = new Intl.DateTimeFormat('zh-TW', { month: 'numeric', day: 'numeric', timeZone: TZ })
const fHM = new Intl.DateTimeFormat('zh-TW', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: TZ })

function leftDateBlock(date: Date) {
  const day = new Intl.DateTimeFormat('zh-TW', { day: '2-digit', timeZone: TZ }).format(date)
  const month = `${date.toLocaleDateString('zh-TW', { month: 'numeric', timeZone: TZ })}月`
  const year = date.toLocaleDateString('zh-TW', { year: 'numeric', timeZone: TZ })
  return (
    <div className="w-20 shrink-0 rounded-md border border-gray-200 bg-gray-50 text-center px-1 py-2">
      <div className="text-3xl font-extrabold leading-none tracking-tight text-gray-800">{day}</div>
      <div className="mt-1 text-[11px] leading-none text-gray-500">{month}, {year}</div>
    </div>
  )
}

function MetaRow({ start, end, allDay }: { start: Date; end?: Date; allDay?: boolean }) {
  const wd = WEEKDAY[start.getDay()]
  const md = fMD.format(start)
  const timeLabel = allDay
    ? 'All Day'
    : end
      ? `${fHM.format(start)}–${fHM.format(end)}`
      : fHM.format(start)
  return (
    <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
      <span className="inline-flex items-center gap-1">
        <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70"><path fill="currentColor" d="M7 2h2v2h6V2h2v2h3a1 1 0 0 1 1 1v15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h3V2zm13 7H4v11a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9z"/></svg>
        {wd}，{md}
      </span>
      <span className="inline-flex items-center gap-1">
        <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-70"><path fill="currentColor" d="M12 1a11 11 0 1 1 0 22A11 11 0 0 1 12 1m1 6h-2v6l5 3l1-1.73l-4-2.27V7z"/></svg>
        {timeLabel}
      </span>
    </div>
  )
}

export default function EventList({ events = [] }: Props) { // ← 預設空陣列
  // 若沒有資料，顯示空狀態，避免 .map on undefined
  if (!Array.isArray(events) || events.length === 0) {
    return <div className="text-sm text-gray-500">目前沒有即將舉行的活動</div>
  }

  return (
    <div className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white shadow-sm">
      {events
        .filter((ev) => ev && ev.start) // 保險：過濾掉不完整資料
        .map((ev, idx) => {
          const start = new Date(ev.start)
          const end = ev.end ? new Date(ev.end) : undefined
          return (
            <article key={ev.id ?? `${start.toISOString()}-${idx}`} className="flex gap-4 p-4 md:p-5 hover:bg-gray-50/60 transition">
              {leftDateBlock(start)}
              <div className="min-w-0 flex-1">
                {ev.url ? (
                  <a href={ev.url} className="text-[17px] md:text-[18px] font-semibold text-sky-700 hover:text-sky-800 line-clamp-2">
                    {ev.title}
                  </a>
                ) : (
                  <h3 className="text-[17px] md:text-[18px] font-semibold text-gray-800 line-clamp-2">
                    {ev.title}
                  </h3>
                )}
                <MetaRow start={start} end={end} allDay={ev.allDay} />
                {ev.location && (
                  <div className="mt-1 text-sm text-gray-500">
                    <svg width="16" height="16" viewBox="0 0 24 24" className="mr-1 inline opacity-70"><path fill="currentColor" d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7m0 9.5A2.5 2.5 0 1 0 12 6.5a2.5 2.5 0 0 0 0 5Z"/></svg>
                    {ev.location}
                  </div>
                )}
              </div>
            </article>
          )
        })}
    </div>
  )
}
