import { PageHero } from '@/components/PageHero'
import { SearchNotice } from '@/components/SearchNotice'
import { SiteFooter } from '@/components/SiteFooter'
import { applyForCareer } from '../actions'

export default async function CareersPage() {
  const localPreview = process.env.LOCAL_PREVIEW === 'true'

  const docs = localPreview
    ? []
    : await (async () => {
        const { getPayloadClient } = await import('@/lib/payload')
        const payload = await getPayloadClient()
        const result = await payload.find({ collection: 'careers', limit: 20 })
        return result.docs
      })()

  return (
    <>
      <main>
        <PageHero eyebrow="Careers" title="Help us make home feel effortless." description="Join the team responsible for the care, safety and everyday experience of one of Nairobi’s most distinctive residential communities." image="https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=2200&q=88" />
        <section className="px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">Open positions</p>
              <h2 className="mt-4 font-serif text-5xl">Work with purpose.</h2>
              <div className="mt-10 space-y-4">
                {docs.length ? docs.map((career: any) => (
                  <article className="rounded-3xl border border-slate-200 p-7" key={career.id}>
                    <div className="flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      <span>{career.department || 'Operations'}</span>
                    </div>
                    <h3 className="mt-3 font-serif text-3xl">{career.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-600">{career.description}</p>
                  </article>
                )) : (
                  <div className="rounded-3xl bg-[#f4f5f2] p-8">
                    <h3 className="font-serif text-3xl">No current vacancies</h3>
                    <p className="mt-3 leading-7 text-slate-600">There are no open roles at the moment. You can still send an expression of interest for future opportunities.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="h-fit rounded-3xl bg-[#f4f5f2] p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">Apply</p>
              <h2 className="mt-4 font-serif text-4xl">Introduce yourself.</h2>
              <SearchNotice />
              <form action={applyForCareer} className="mt-8 space-y-5">
                <label className="block text-sm font-semibold">
                  Position
                  <select className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700" name="career" required>
                    <option value="">Select a position</option>
                    {docs.map((career: any) => (
                      <option key={career.id} value={career.id}>{career.title}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-semibold">Full name<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700" name="fullName" required /></label>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-semibold">Email<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700" name="email" required type="email" /></label>
                  <label className="block text-sm font-semibold">Phone<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700" name="phone" required /></label>
                </div>
                <label className="block text-sm font-semibold">Cover note<textarea className="mt-2 min-h-36 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700" name="coverNote" required /></label>
                <button className="w-full rounded-full bg-emerald-900 px-6 py-4 text-sm font-bold text-white" type="submit">Submit application</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
