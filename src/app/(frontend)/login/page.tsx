import Link from 'next/link'
import { loginResident } from '../actions'
import { SearchNotice } from '@/components/SearchNotice'

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-[#f4f5f2] lg:grid-cols-2">
      <div className="relative hidden bg-[url('https://images.unsplash.com/photo-1658218729615-167c32d70537?auto=format&fit=crop&w=1500&q=85')] bg-cover bg-center lg:block"><div className="absolute inset-0 bg-[#102a24]/45" /><Link className="absolute left-10 top-10 z-10 font-serif text-2xl text-white" href="/">Galleria Gardens</Link><p className="absolute bottom-12 left-10 z-10 max-w-lg font-serif text-5xl leading-tight text-white">Everything your home needs, in one place.</p></div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <Link className="font-serif text-2xl text-emerald-950 lg:hidden" href="/">Galleria Gardens</Link>
          <p className="mt-12 text-xs font-bold uppercase tracking-[0.25em] text-emerald-800 lg:mt-0">Resident access</p><h1 className="mt-4 font-serif text-5xl">Welcome home.</h1><p className="mt-4 text-slate-600">Sign in to communicate, book amenities and manage requests.</p>
          <SearchNotice />
          <form action={loginResident} className="mt-8 space-y-5"><label className="block text-sm font-semibold">Email<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none focus:border-emerald-700" name="email" required type="email" /></label><label className="block text-sm font-semibold">Password<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none focus:border-emerald-700" name="password" required type="password" /></label><button className="w-full rounded-full bg-emerald-900 px-6 py-4 text-sm font-bold text-white" type="submit">Sign in</button></form>
          <p className="mt-7 text-center text-sm text-slate-600">New resident? <Link className="font-bold text-emerald-800" href="/register">Register your household</Link></p>
        </div>
      </div>
    </main>
  )
}
