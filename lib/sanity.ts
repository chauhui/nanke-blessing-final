import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'von9yh08',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

export const fetchQuery = async (query: string) => {
  try {
    const result = await client.fetch(query);
    return result;
  } catch (error) {
    console.error('Sanity query error:', error);
    throw error;
  }
};
