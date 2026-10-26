import Link from 'next/link'
import { Icon } from './Icon'

export function SiteFooter() {
  return (
    <footer className="bg-[#102a24] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.5fr_1fr_1fr] lg:px-10">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full border border-white/25 font-serif text-xl">G</span>
            <div><p className="font-serif text-2xl">Galleria Gardens</p><p className="text-xs uppercase tracking-[0.25em] text-white/50">Nairobi</p></div>
          </div>
          <p className="mt-6 max-w-md text-sm leading-7 text-white/65">
            A private, beautifully considered gated community off Langata Road, created for secure and spacious family living.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Explore</p>
          <div className="mt-5 grid gap-3 text-sm text-white/70">
            <Link href="/properties">Available residences</Link><Link href="/about">Our story</Link>
            <Link href="/careers">Careers</Link><Link href="/register">Register as a resident</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Contact</p>
          <div className="mt-5 space-y-4 text-sm text-white/70">
            <p className="flex gap-3"><Icon className="mt-0.5 size-4 shrink-0" name="map" /> Seminary Road, off Langata Road, next to Galleria Mall, Nairobi</p>
            <a className="flex gap-3" href="tel:+254722200987"><Icon className="size-4" name="phone" /> +254 722 200 987</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">© {new Date().getFullYear()} Galleria Gardens. All rights reserved.</div>
    </footer>
  )
}
