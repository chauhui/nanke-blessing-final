import { sanity } from './sanityClient'

export async function getBanners() {
  const query = `*[_type == "banner"] | order(_createdAt desc){
    _id,
    title,
    description,
    image{
      asset->{url}
    }
  }`
  return await sanity.fetch(query)
}