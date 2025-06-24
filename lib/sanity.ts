import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';

export const client = createClient({
  projectId: 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

// 建立 image-url builder
const builder = imageUrlBuilder(client);

/**
 * 將 SanityImageSource 轉為可用的圖片 URL，
 * 使用方式： urlFor(source).width(600).height(400).url()
 */
export const urlFor = (source: SanityImageSource) => builder.image(source);

export const fetchQuery = async (query: string) => {
  try {
    const result = await client.fetch(query);
    return result;
  } catch (error) {
    console.error('Sanity query error:', error);
    throw error;
  }
};
