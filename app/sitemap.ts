import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.gulffiber.co'
  const lastModified = new Date()

  const routes = [
    '',
    '/company',
    '/products',
    '/services',
    '/quality',
    '/sustainability',
    '/gallery',
    '/contact',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
