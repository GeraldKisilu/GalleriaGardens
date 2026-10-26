import Image from 'next/image'
import { Icon } from '@/components/Icon'
import { PageHero } from '@/components/PageHero'
import { SiteFooter } from '@/components/SiteFooter'

export default function AboutPage() {
  return (
    <>
      <main>
        <PageHero
          eyebrow="Our community"
          title="A more generous way to live."
          description="Galleria Gardens brings together privacy, security and shared connection in one of Nairobi’s most convenient neighbourhoods."
          image="https://images.unsplash.com/photo-1695301427179-ed5daaa8072b?auto=format&fit=crop&w=2200&q=88"
        />
        <section className="px-6 py-24 lg:px-10 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">Established for families</p>
              <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">Urban convenience, grounded in nature.</h2>
              <p className="mt-7 text-lg leading-9 text-slate-600">Each detached villa is set on approximately half an acre, with a broad front yard for ample parking, a generous grass backyard and separate servant quarters. The low-density plan gives every household room to grow while maintaining a close, friendly estate community.</p>
            </div>
            <div className="relative min-h-[34rem] overflow-hidden rounded-3xl">
              <Image alt="Spacious green garden surrounding a private residence" className="object-cover" fill sizes="(max-width: 1024px) 100vw, 55vw" src="https://images.unsplash.com/photo-1776762893034-c437e452f1be?auto=format&fit=crop&w=1500&q=85" />
            </div>
          </div>
        </section>
        <section className="bg-[#f4f5f2] px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">What matters here</p><h2 className="mt-4 font-serif text-5xl">The principles behind the place.</h2></div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                ['shield', 'Peace of mind', 'Controlled access, a private setting and responsive estate management support secure everyday living.'],
                ['home', 'Space with purpose', 'Large plots, practical layouts, servant quarters and ample parking support real family life.'],
                ['users', 'True community', 'Resident communication and shared amenities make it easy to know, help and enjoy your neighbours.'],
              ].map(([icon, title, copy]) => (
                <article className="rounded-3xl bg-white p-8" key={title}><span className="grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-800"><Icon name={icon as 'shield'} /></span><h3 className="mt-8 font-serif text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{copy}</p></article>
              ))}
            </div>
          </div>
        </section>
        <section className="px-6 py-24 text-center lg:py-32">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">Visit Galleria Gardens</p>
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">Come and experience the scale for yourself.</h2>
          <p className="mx-auto mt-6 max-w-xl leading-8 text-slate-600">Seminary Road, off Langata Road, next to Galleria Mall, Nairobi.</p>
          <a className="mt-8 inline-flex rounded-full bg-emerald-900 px-7 py-4 text-sm font-bold text-white" href="tel:+254722200987">Call +254 722 200 987</a>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
