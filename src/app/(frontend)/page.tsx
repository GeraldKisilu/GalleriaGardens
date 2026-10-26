import Image from 'next/image'
import Link from 'next/link'
// import { getPayloadClient } from '@/lib/payload'
import { Icon } from '@/components/Icon'
import { SiteFooter } from '@/components/SiteFooter'
import { SiteHeader } from '@/components/SiteHeader'

const heroImage = 'https://images.unsplash.com/photo-1630241466166-22e43156d8c0?auto=format&fit=crop&w=2200&q=88'
const poolImage = 'https://images.unsplash.com/photo-1776762893034-c437e452f1be?auto=format&fit=crop&w=1400&q=85'
const conferenceImage = 'https://images.unsplash.com/photo-1744095407215-66e40734e23a?auto=format&fit=crop&w=1400&q=85'

export default async function HomePage() {
  const localPreview = process.env.LOCAL_PREVIEW === 'true'

  const [propertyResult, amenityResult] = localPreview
    ? [{ docs: [] }, { docs: [] }]
    : await (async () => {
        const { getPayloadClient } = await import('@/lib/payload')
        const payload = await getPayloadClient()

        return Promise.all([
          payload.find({
            collection: 'properties',
            limit: 3,
            depth: 1,
            overrideAccess: false,
          }),
          payload.find({
            collection: 'amenities',
            limit: 4,
            depth: 1,
            overrideAccess: false,
          }),
        ])
      })()

  return (
    <>
      <main>
        <section className="relative min-h-[52rem] overflow-hidden bg-slate-900 text-white">
          <Image alt="Elegant villa surrounded by mature gardens" className="object-cover" fill priority sizes="100vw" src={heroImage} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#102a24]/95 via-[#102a24]/60 to-slate-900/15" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#102a24]/70 to-transparent" />
          <SiteHeader />
          <div className="relative mx-auto flex min-h-[52rem] max-w-7xl items-end px-6 pb-24 pt-40 lg:px-10">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-emerald-300">Space to live beautifully</p>
              <h1 className="mt-6 font-serif text-6xl leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[5.75rem]">
                A rare sense of space, in the heart of Nairobi.
              </h1>
              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                Half-acre villas, private gardens and considered amenities within a secure gated community next to Galleria Mall.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link className="flex items-center gap-3 rounded-full bg-white px-6 py-4 text-sm font-bold text-slate-900 transition hover:bg-emerald-50" href="/properties">
                  Explore residences <Icon className="size-4" name="arrow" />
                </Link>
                <Link className="rounded-full border border-white/40 bg-white/10 px-6 py-4 text-sm font-bold backdrop-blur transition hover:bg-white/20" href="/register">
                  Register as a tenant
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f4f5f2] px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">Galleria Gardens</p>
              <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[1.05] text-slate-900 sm:text-6xl">The luxury of room to breathe.</h2>
            </div>
            <div>
              <p className="text-lg leading-9 text-slate-600">
                Every residence sits on approximately half an acre, creating the privacy, greenery and calm that city living rarely affords. Generous front parking, a spacious lawn and dedicated servant quarters make each home practical as well as beautiful.
              </p>
              <Link className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-800" href="/about">Discover our community <Icon className="size-4" name="arrow" /></Link>
            </div>
          </div>
          <div className="mx-auto mt-20 grid max-w-7xl gap-px overflow-hidden rounded-3xl bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['0.5', 'acre per villa'],
              ['24/7', 'gated security'],
              ['2', 'swimming pools'],
              ['1', 'resident community'],
            ].map(([value, label]) => (
              <div className="bg-white px-8 py-10" key={label}><p className="font-serif text-5xl text-emerald-900">{value}</p><p className="mt-2 text-sm text-slate-500">{label}</p></div>
            ))}
          </div>
        </section>

        <section className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">Homes for living well</p><h2 className="mt-4 font-serif text-5xl text-slate-900">Available residences</h2></div>
              <Link className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800" href="/properties">View all residences <Icon className="size-4" name="arrow" /></Link>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {propertyResult.docs.length ? propertyResult.docs.map((property, index) => {
                const media = typeof property.featuredImage === 'object' ? property.featuredImage : null
                return (
                  <article className="group overflow-hidden rounded-3xl bg-[#f4f5f2]" key={property.id}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image alt={media?.alt ?? property.title} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 1024px) 100vw, 33vw" src={media?.url ?? heroImage} />
                      <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-800">{property.listingType === 'sale' ? 'For sale' : 'For rent'}</span>
                    </div>
                    <div className="p-7"><h3 className="font-serif text-3xl">{property.title}</h3><p className="mt-3 text-sm text-slate-500">{property.bedrooms} bedrooms · {property.bathrooms} bathrooms · {property.landSize}</p><p className="mt-6 text-lg font-bold text-emerald-900">KES {property.price.toLocaleString()} <span className="text-sm font-normal text-slate-500">{property.priceSuffix}</span></p></div>
                  </article>
                )
              }) : [1,2,3].map((item) => (
                <article className="overflow-hidden rounded-3xl bg-[#f4f5f2]" key={item}><div className="relative aspect-[4/3]"><Image alt="Luxury villa with spacious outdoor living" className="object-cover" fill sizes="33vw" src={[heroImage, poolImage, conferenceImage][item - 1]} /></div><div className="p-7"><h3 className="font-serif text-3xl">Signature Garden Villa</h3><p className="mt-3 text-sm leading-6 text-slate-500">Property availability and pricing will be published here by management.</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#102a24] px-6 py-24 text-white lg:px-10 lg:py-32" id="amenities">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">Everyday wellness</p>
            <div className="mt-4 flex flex-col justify-between gap-7 lg:flex-row lg:items-end"><h2 className="max-w-2xl font-serif text-5xl leading-tight sm:text-6xl">Amenities designed around your day.</h2><p className="max-w-md leading-7 text-white/60">From an early workout to a poolside afternoon or private meeting, every space is close to home.</p></div>
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {(amenityResult.docs.length ? amenityResult.docs : [
                { id: 'gym', name: 'Residents’ gym', description: 'A bright, fully equipped fitness space for daily training.', image: null },
                { id: 'pool', name: 'Heated pools', description: 'A full-size pool and a safe heated baby pool for young families.', image: null },
                { id: 'hall', name: 'Conference hall', description: 'A bookable professional space for meetings and private functions.', image: null },
                { id: 'grounds', name: 'Garden living', description: 'Expansive private lawns and mature shared landscaping.', image: null },
              ]).map((amenity, index) => {
                const media = typeof amenity.image === 'object' ? amenity.image : null
                const fallback = index === 0 ? conferenceImage : index === 1 ? poolImage : index === 2 ? conferenceImage : heroImage
                return (
                  <article className="group relative min-h-96 overflow-hidden rounded-3xl" key={amenity.id}>
                    <Image alt={media?.alt ?? amenity.name} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(max-width: 768px) 100vw, 50vw" src={media?.url ?? fallback} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-8"><h3 className="font-serif text-4xl">{amenity.name}</h3><p className="mt-3 max-w-md text-sm leading-7 text-white/70">{amenity.description}</p></div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2">
          <div className="bg-[#e8eee9] px-6 py-20 lg:px-[max(2.5rem,calc((100vw-80rem)/2))] lg:py-28">
            <Icon className="size-10 text-emerald-800" name="chat" />
            <h2 className="mt-7 font-serif text-5xl leading-tight text-slate-900">Your home, connected.</h2>
            <p className="mt-6 max-w-lg leading-8 text-slate-600">Log maintenance requests, follow repairs, message management privately, speak with a neighbour or join the estate-wide community conversation—all from one secure resident hub.</p>
            <Link className="mt-8 inline-flex items-center gap-3 rounded-full bg-emerald-900 px-6 py-4 text-sm font-bold text-white" href="/register">Create your resident account <Icon className="size-4" name="arrow" /></Link>
          </div>
          <div className="relative min-h-[30rem] bg-slate-800">
            <Image alt="Bright, elegant living room in a Nairobi home" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 50vw" src="https://images.unsplash.com/photo-1658218635253-64728f6234be?auto=format&fit=crop&w=1400&q=85" />
          </div>
        </section>

        <section className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-[#f4f5f2] lg:grid-cols-2">
            <div className="relative min-h-[30rem]"><iframe className="absolute inset-0 h-full w-full border-0 grayscale-[35%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.openstreetmap.org/export/embed.html?bbox=36.739%2C-1.350%2C36.775%2C-1.315&layer=mapnik&marker=-1.333%2C36.757" title="Map showing Galleria Gardens near Galleria Mall, Nairobi" /></div>
            <div className="flex flex-col justify-center p-10 sm:p-16">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">Well connected</p>
              <h2 className="mt-4 font-serif text-5xl text-slate-900">Close to the city. A world apart.</h2>
              <p className="mt-6 leading-8 text-slate-600">Seminary Road, off Langata Road, next to Galleria Mall, Nairobi, Kenya.</p>
              <a className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-800" href="https://www.openstreetmap.org/?mlat=-1.333&mlon=36.757#map=15/-1.333/36.757" rel="noreferrer" target="_blank">Open map <Icon className="size-4" name="arrow" /></a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
