import Image from 'next/image'
import { SiteHeader } from './SiteHeader'

export function PageHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image: string }) {
  return (
    <section className="relative min-h-[32rem] overflow-hidden bg-slate-900 text-white">
      <Image alt="" className="object-cover opacity-55" fill priority sizes="100vw" src={image} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#102a24]/95 via-[#102a24]/65 to-transparent" />
      <SiteHeader />
      <div className="relative mx-auto flex min-h-[32rem] max-w-7xl items-end px-6 pb-20 pt-36 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-emerald-300">{eyebrow}</p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/75">{description}</p>
        </div>
      </div>
    </section>
  )
}
