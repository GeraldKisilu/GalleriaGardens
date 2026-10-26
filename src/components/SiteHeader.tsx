import Link from 'next/link'
import { Icon } from './Icon'

const nav = [
  ['About', '/about'],
  ['Residences', '/properties'],
  ['Amenities', '/#amenities'],
  ['Careers', '/careers'],
]

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-40 border-b border-white/20 text-white">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link className="group flex items-center gap-3" href="/">
          <span className="grid size-11 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur">
            <span className="font-serif text-xl font-semibold">G</span>
          </span>
          <span>
            <span className="block font-serif text-xl leading-none tracking-wide">Galleria Gardens</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65">Nairobi</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {nav.map(([label, href]) => (
            <Link className="text-white/80 transition hover:text-white" href={href} key={href}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a className="rounded-full px-4 py-2 text-sm font-medium text-white/80 hover:text-white" href="tel:+254722200987">
            +254 722 200 987
          </a>
          <Link className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-50" href="/resident">
            Resident hub
          </Link>
        </div>
        <details className="relative lg:hidden">
          <summary className="grid size-11 cursor-pointer list-none place-items-center rounded-full border border-white/30 bg-white/10">
            <Icon name="menu" />
          </summary>
          <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white p-3 text-slate-900 shadow-2xl">
            {nav.map(([label, href]) => (
              <Link className="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-emerald-50" href={href} key={href}>{label}</Link>
            ))}
            <Link className="mt-2 block rounded-xl bg-emerald-800 px-4 py-3 text-center text-sm font-semibold text-white" href="/resident">
              Resident hub
            </Link>
          </div>
        </details>
      </div>
    </header>
  )
}
