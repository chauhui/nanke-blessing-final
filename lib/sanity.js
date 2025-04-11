
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'p4osbiim',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
