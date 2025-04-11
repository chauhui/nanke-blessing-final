export const bannerQuery = `*[_type == "banner"]{
  _id,
  title,
  subtitle,
  link,
  "imageUrl": image.asset->url
} | order(_createdAt desc)`

export const eventQuery = `*[_type == "event"]{
  _id,
  title,
  date,
  summary,
  "imageUrl": image.asset->url
} | order(date desc)[0...3]`
