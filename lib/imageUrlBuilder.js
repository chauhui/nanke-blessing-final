
import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: 'p4osbiim',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
