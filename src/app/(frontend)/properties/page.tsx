import Image from 'next/image'
import Link from 'next/link'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { SiteFooter } from '@/components/SiteFooter'
// import { getPayloadClient } from '@/lib/payload'

const fallback = 'https://images.unsplash.com/photo-1787704113747-c1a65d1a6a62?auto=format&fit=crop&w=1600&q=88'

export default async function PropertiesPage() {
  const localPreview = process.env.LOCAL_PREVIEW === 'true'

  const docs = localPreview
    ? []
    : await (async () => {
        const { getPayloadClient } = await import('@/lib/payload')
        const payload = await getPayloadClient()

        const result = await payload.find({
          collection: 'properties',
          limit: 24,
          depth: 1,
          overrideAccess: false,
        })

        return result.docs
      })()

  return (
    <>
      <main>
        <PageHero eyebrow="Residences" title="Homes with room for every chapter." description="Explore detached villas available to rent or buy, each with a private half-acre setting, ample parking and dedicated servant quarters." image={fallback} />
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-7 md:grid-cols-2">
              {docs.length ? docs.map((property) => {
                const media = typeof property.featuredImage === 'object' ? property.featuredImage : null
                return (
                  <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white" key={property.id}>
                    <div className="relative aspect-[16/10]">
                      <Image alt={media?.alt ?? property.title} className="object-cover" fill sizes="(max-width: 768px) 100vw, 50vw" src={media?.url ?? fallback} />
                      <div className="absolute left-5 top-5 flex gap-2"><span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider">{property.listingType === 'sale' ? 'For sale' : 'For rent'}</span><span className="rounded-full bg-emerald-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">{property.availability}</span></div>
                    </div>
                    <div className="p-8">
                      <h2 className="font-serif text-4xl">{property.title}</h2>
                      <p className="mt-4 leading-7 text-slate-600">{property.description}</p>
                      <div className="mt-6 flex flex-wrap gap-4 text-sm font-medium text-slate-500"><span>{property.bedrooms} bedrooms</span><span>{property.bathrooms} bathrooms</span><span>{property.landSize}</span></div>
                      <div className="mt-8 flex flex-col justify-between gap-5 border-t border-slate-200 pt-6 sm:flex-row sm:items-center"><p className="text-xl font-bold text-emerald-900">KES {property.price.toLocaleString()} <span className="text-sm font-normal text-slate-500">{property.priceSuffix}</span></p><a className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800" href="tel:+254722200987">Arrange a viewing <Icon className="size-4" name="arrow" /></a></div>
                    </div>
                  </article>
                )
              }) : (
                <div className="col-span-full rounded-3xl bg-[#f4f5f2] px-8 py-20 text-center"><h2 className="font-serif text-4xl">New listings are being prepared.</h2><p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">Contact our team for current rental and purchase availability, pricing and private viewing appointments.</p><a className="mt-7 inline-flex rounded-full bg-emerald-900 px-7 py-4 text-sm font-bold text-white" href="tel:+254722200987">Call +254 722 200 987</a></div>
              )}
            </div>
          </div>
        </section>
        <section className="bg-[#102a24] px-6 py-20 text-white lg:px-10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center"><div><h2 className="font-serif text-5xl">Already moving in?</h2><p className="mt-4 text-white/65">Create your resident account to access documents, services and your new community.</p></div><Link className="inline-flex w-fit items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-slate-900" href="/register">Register your household <Icon className="size-4" name="arrow" /></Link></div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
