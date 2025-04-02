import Image from 'next/image'
import { getBanners } from '../lib/queries_getBanners'

export async function getStaticProps() {
  const banners = await getBanners()
  return {
    props: { banners }
  }
}

export default function Home({ banners }) {
  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>首頁 Banner</h1>
      <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
        {banners.map((b) => (
          <div key={b._id} style={{ background: '#000', color: '#fff', padding: '1rem', borderRadius: '12px' }}>
            {b.image?.asset?.url && (
              <Image src={b.image.asset.url} alt={b.title} width={300} height={200} style={{ borderRadius: '8px' }} />
            )}
            <h2>{b.title}</h2>
            <p>{b.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}