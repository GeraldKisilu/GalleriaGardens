type CollectionSlug = 'properties' | 'amenities' | 'bookings' | 'service_requests' | 'messages' | 'careers' | 'users'

type FindOptions = {
  collection: string
  limit?: number
  depth?: number
  where?: Record<string, { equals?: string | number | boolean }>
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function getPayloadClient() {
  return {
    async find({ collection, limit = 10, where }: FindOptions) {
      const collectionPath = collection === 'amenities' ? 'properties/amenities' : collection
      const url = new URL(`${API_BASE}/${collectionPath}`)
      url.searchParams.set('limit', String(limit))

      if (where) {
        Object.entries(where).forEach(([key, value]) => {
          if (value && typeof value === 'object' && 'equals' in value) {
            url.searchParams.set(key, String(value.equals))
          }
        })
      }

      try {
        const response = await fetch(url.toString(), {
          cache: 'no-store',
          headers: { Accept: 'application/json' },
        })

        if (!response.ok) {
          return { docs: [], totalDocs: 0, limit, totalPages: 0, page: 1 }
        }

        const data = await response.json()
        const docs = Array.isArray(data.docs) ? data.docs : Array.isArray(data) ? data : []
        return {
          docs,
          totalDocs: docs.length,
          totalPages: 1,
          page: 1,
          limit,
          paging: { limit, total: docs.length, page: 1 },
        }
      } catch {
        return { docs: [], totalDocs: 0, limit, totalPages: 0, page: 1 }
      }
    },
  }
}

export async function findBySlug<T extends CollectionSlug>(
  collection: T,
  slug: string,
  _options?: { draft?: boolean; depth?: number },
): Promise<any | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection,
    limit: 1,
    where: { slug: { equals: slug } },
  })

  return result.docs[0] ?? null
}

export async function findByField<T extends CollectionSlug>(
  collection: T,
  field: string,
  value: string,
  _options?: { draft?: boolean; depth?: number },
): Promise<any | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection,
    limit: 1,
    where: { [field]: { equals: value } },
  })

  return result.docs[0] ?? null
}
