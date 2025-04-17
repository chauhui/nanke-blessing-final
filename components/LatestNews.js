
import { urlFor } from '../lib/sanity';

export default function LatestNews({ newsList }) {
  if (!newsList || newsList.length === 0) return null;

  return (
    <section className="px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">最新消息</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newsList.map((item, idx) => (
          item.image?.asset && (
            <div key={idx} className="overflow-hidden rounded-xl shadow">
              <img
                src={urlFor(item.image).width(800).url()}
                alt=""
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          )
        ))}
      </div>
    </section>
  );
}
