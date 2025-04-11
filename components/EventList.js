import Image from 'next/image'

export default function EventList({ events }) {
  if (!events?.length) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">近期活動</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {events.map(event => (
          <div key={event._id} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            {event.imageUrl && (
              <Image
                src={event.imageUrl}
                alt={event.title}
                width={600}
                height={300}
                className="rounded mb-3 object-cover"
              />
            )}
            <h3 className="text-lg font-semibold text-blue-900">{event.title}</h3>
            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-gray-700 mt-1">{event.summary}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
