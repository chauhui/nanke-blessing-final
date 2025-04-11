
import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';

export default function Banner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const query = `*[_type == "banner"] | order(_createdAt desc){ _id, image }`;
      const result = await client.fetch(query);
      setBanners(result);
    };
    fetchBanners();
  }, []);

  if (!banners || banners.length === 0) return null;

  return (
    <section className="space-y-6">
      {banners.map((banner) => (
        banner.image?.asset && (
          <div key={banner._id} className="rounded-xl overflow-hidden shadow">
            <img
              src={urlFor(banner.image).width(1200).url()}
              alt=""
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>
        )
      ))}
    </section>
  );
}
