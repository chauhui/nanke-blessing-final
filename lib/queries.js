export const bannerQuery = `*[_type == "banner"]{
  _id,
  image
} | order(_createdAt desc)`

export const eventQuery = `*[_type == "event"]{
  _id,
  title,
  date,
  summary,
  "imageUrl": image.asset->url
} | order(date desc)[0...3]`

export const newsQuery = `*[_type == "latestNews"] | order(_createdAt desc)[0...6]{
  _id,
  title,
  summary,
  "imageUrl": image.asset->url
}`
