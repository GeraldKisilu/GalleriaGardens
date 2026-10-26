import Link from 'next/link'
import { registerResident } from '../actions'
import { SearchNotice } from '@/components/SearchNotice'

export default function RegisterPage() {
  return (
    <main className="grid min-h-screen bg-[#f4f5f2] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative hidden bg-[url('https://images.unsplash.com/photo-1630241466166-22e43156d8c0?auto=format&fit=crop&w=1500&q=85')] bg-cover bg-center lg:block"><div className="absolute inset-0 bg-[#102a24]/50" /><Link className="absolute left-10 top-10 z-10 font-serif text-2xl text-white" href="/">Galleria Gardens</Link><div className="absolute bottom-12 left-10 z-10 max-w-md text-white"><p className="font-serif text-5xl leading-tight">Your community starts here.</p><p className="mt-5 leading-7 text-white/70">Registration is reviewed by estate management to keep resident spaces private and secure.</p></div></div>
      <div className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-xl">
          <Link className="font-serif text-2xl text-emerald-950 lg:hidden" href="/">Galleria Gardens</Link>
          <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] text-emerald-800 lg:mt-0">Tenant registration</p><h1 className="mt-4 font-serif text-5xl">Join the resident hub.</h1><p className="mt-4 text-slate-600">Create your secure household account when moving into Galleria Gardens.</p>
          <SearchNotice />
          <form action={registerResident} className="mt-8 grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-semibold sm:col-span-2">Full name<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none focus:border-emerald-700" name="fullName" required /></label>
            <label className="block text-sm font-semibold">Email<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none focus:border-emerald-700" name="email" required type="email" /></label>
            <label className="block text-sm font-semibold">Phone<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none focus:border-emerald-700" name="phone" required /></label>
            <label className="block text-sm font-semibold">Villa number<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none focus:border-emerald-700" name="villaNumber" placeholder="e.g. Villa 08" /></label>
            <label className="block text-sm font-semibold">Password<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none focus:border-emerald-700" minLength={8} name="password" required type="password" /></label>
            <label className="flex items-start gap-3 text-sm leading-6 text-slate-600 sm:col-span-2"><input className="mt-1 size-4 accent-emerald-800" required type="checkbox" />I agree to the estate terms and conditions and understand my account is subject to management verification.</label>
            <button className="rounded-full bg-emerald-900 px-6 py-4 text-sm font-bold text-white sm:col-span-2" type="submit">Create resident account</button>
          </form>
          <p className="mt-7 text-center text-sm text-slate-600">Already registered? <Link className="font-bold text-emerald-800" href="/login">Sign in</Link></p>
        </div>
      </div>
    </main>
  )
}
