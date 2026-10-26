import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createBooking, createServiceRequest, logoutResident, sendMessage } from '../actions'
import { Icon } from '@/components/Icon'
import { getCurrentUser } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

const statusStyle: Record<string, string> = {
  submitted: 'bg-amber-100 text-amber-800',
  acknowledged: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-violet-100 text-violet-800',
  resolved: 'bg-emerald-100 text-emerald-800',
  closed: 'bg-slate-200 text-slate-700',
  pending: 'bg-amber-100 text-amber-800',
  confirmed: 'bg-emerald-100 text-emerald-800',
  declined: 'bg-red-100 text-red-800',
}

function relationName(value: unknown) {
  return value && typeof value === 'object' && 'fullName' in value ? String(value.fullName) : 'Resident'
}

export default async function ResidentPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  const notice = await searchParams
  const payload = await getPayloadClient()
  const [requests, bookings, amenities, community, direct, residents, documents] = await Promise.all([
    payload.find({ collection: 'service-requests', where: { resident: { equals: user.id } }, sort: '-createdAt', limit: 8, user, overrideAccess: false }),
    payload.find({ collection: 'bookings', where: { resident: { equals: user.id } }, sort: '-bookingDate', limit: 8, depth: 1, user, overrideAccess: false }),
    payload.find({ collection: 'amenities', where: { bookable: { equals: true } }, limit: 20, overrideAccess: false }),
    payload.find({ collection: 'messages', where: { audience: { equals: 'community' } }, sort: '-createdAt', limit: 30, depth: 1, user, overrideAccess: false }),
    payload.find({ collection: 'messages', where: { and: [{ audience: { equals: 'direct' } }, { participants: { contains: user.id } }] }, sort: '-createdAt', limit: 30, depth: 1, user, overrideAccess: false }),
    payload.find({ collection: 'users', where: { id: { not_equals: user.id } }, sort: 'fullName', limit: 100, user, overrideAccess: false }),
    payload.find({ collection: 'legal-documents', limit: 20, depth: 1, overrideAccess: false }),
  ])

  return (
    <main className="min-h-screen bg-[#f4f5f2]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 lg:px-8">
          <Link className="flex items-center gap-3" href="/"><span className="grid size-10 place-items-center rounded-full bg-emerald-900 font-serif text-lg text-white">G</span><span className="hidden font-serif text-xl text-emerald-950 sm:block">Galleria Gardens</span></Link>
          <div className="flex items-center gap-4"><div className="hidden text-right sm:block"><p className="text-sm font-bold">{user.fullName}</p><p className="text-xs text-slate-500">{user.villaNumber || 'Resident account'}</p></div><form action={logoutResident}><button className="rounded-full border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700" type="submit">Sign out</button></form></div>
        </div>
      </header>
      <div className="mx-auto max-w-[90rem] px-5 py-8 lg:px-8 lg:py-12">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-800">Resident hub</p><h1 className="mt-2 font-serif text-5xl">Good to see you, {user.fullName?.split(' ')[0]}.</h1><p className="mt-3 text-slate-600">Manage your home and stay close to your community.</p></div>
          <div className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider ${user.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{user.status} account</div>
        </div>
        {notice.success && <p className="mt-6 rounded-2xl bg-emerald-100 p-4 text-sm font-medium text-emerald-900">{notice.success}</p>}
        {notice.error && <p className="mt-6 rounded-2xl bg-red-100 p-4 text-sm font-medium text-red-900">{notice.error}</p>}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <a className="rounded-3xl bg-emerald-900 p-6 text-white" href="#maintenance"><Icon name="tools" /><h2 className="mt-8 font-serif text-3xl">Report an issue</h2><p className="mt-2 text-sm text-white/65">Maintenance, repairs or complaints</p></a>
          <a className="rounded-3xl bg-white p-6" href="#bookings"><Icon className="text-emerald-800" name="calendar" /><h2 className="mt-8 font-serif text-3xl">Book an amenity</h2><p className="mt-2 text-sm text-slate-500">Conference hall and shared facilities</p></a>
          <a className="rounded-3xl bg-white p-6" href="#community"><Icon className="text-emerald-800" name="chat" /><h2 className="mt-8 font-serif text-3xl">Join the conversation</h2><p className="mt-2 text-sm text-slate-500">Private messages and estate chat</p></a>
        </div>

        <section className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]" id="maintenance">
          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-800">My home</p><h2 className="mt-2 font-serif text-4xl">Service requests</h2></div><Icon className="size-8 text-emerald-800" name="tools" /></div>
            <div className="mt-7 space-y-3">
              {requests.docs.length ? requests.docs.map((request) => <article className="rounded-2xl border border-slate-200 p-5" key={request.id}><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="font-bold">{request.subject}</p><p className="mt-1 text-xs uppercase tracking-wider text-slate-500">{request.category} · {request.priority} priority</p></div><span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${statusStyle[request.status ?? 'submitted']}`}>{request.status}</span></div>{request.managementResponse && <p className="mt-4 rounded-xl bg-[#f4f5f2] p-4 text-sm leading-6 text-slate-600"><strong>Management:</strong> {request.managementResponse}</p>}</article>) : <p className="rounded-2xl bg-[#f4f5f2] p-6 text-sm text-slate-500">No requests yet. When something needs attention, submit it here and follow the status.</p>}
            </div>
          </div>
          <form action={createServiceRequest} className="rounded-3xl bg-[#e8eee9] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">New request</p><h2 className="mt-2 font-serif text-4xl">How can we help?</h2>
            <div className="mt-7 space-y-4">
              <label className="block text-sm font-semibold">Subject<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700" name="subject" required /></label>
              <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-semibold">Category<select className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" name="category" required><option value="general">General</option><option value="plumbing">Plumbing</option><option value="electrical">Electrical</option><option value="security">Security</option><option value="landscaping">Landscaping</option><option value="complaint">Complaint</option></select></label><label className="block text-sm font-semibold">Priority<select className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" name="priority" required><option value="normal">Normal</option><option value="low">Low</option><option value="urgent">Urgent</option></select></label></div>
              <label className="block text-sm font-semibold">Details<textarea className="mt-2 min-h-32 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-emerald-700" name="description" required /></label>
              <button className="w-full rounded-full bg-emerald-900 px-6 py-4 text-sm font-bold text-white" type="submit">Submit request</button>
            </div>
          </form>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]" id="bookings">
          <form action={createBooking} className="rounded-3xl bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Amenities</p><h2 className="mt-2 font-serif text-4xl">Make a booking.</h2>
            <div className="mt-7 space-y-4">
              <label className="block text-sm font-semibold">Amenity<select className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" name="amenity" required><option value="">Select amenity</option>{amenities.docs.map((amenity) => <option key={amenity.id} value={amenity.id}>{amenity.name}</option>)}</select></label>
              <label className="block text-sm font-semibold">Date<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" name="bookingDate" required type="date" /></label>
              <div className="grid grid-cols-2 gap-4"><label className="block text-sm font-semibold">From<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" name="startTime" required type="time" /></label><label className="block text-sm font-semibold">To<input className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" name="endTime" required type="time" /></label></div>
              <label className="block text-sm font-semibold">Purpose (optional)<textarea className="mt-2 min-h-24 w-full rounded-xl border border-slate-300 bg-white px-4 py-3" name="purpose" /></label>
              <button className="w-full rounded-full bg-emerald-900 px-6 py-4 text-sm font-bold text-white" type="submit">Request booking</button>
            </div>
          </form>
          <div className="rounded-3xl bg-white p-6 sm:p-8"><h2 className="font-serif text-4xl">My bookings</h2><div className="mt-7 space-y-3">{bookings.docs.length ? bookings.docs.map((booking) => <article className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 p-5 sm:flex-row sm:items-center" key={booking.id}><div><p className="font-bold">{typeof booking.amenity === 'object' ? booking.amenity.name : 'Amenity booking'}</p><p className="mt-1 text-sm text-slate-500">{new Date(booking.bookingDate).toLocaleDateString('en-KE', { dateStyle: 'medium' })} · {booking.startTime}–{booking.endTime}</p></div><span className={`w-fit rounded-full px-3 py-1 text-[10px] font-bold uppercase ${statusStyle[booking.status ?? 'pending']}`}>{booking.status}</span></article>) : <p className="rounded-2xl bg-[#f4f5f2] p-6 text-sm text-slate-500">Your amenity bookings will appear here.</p>}</div></div>
        </section>

        <section className="mt-6 rounded-3xl bg-[#102a24] p-6 text-white sm:p-8" id="community">
          <div className="grid gap-8 xl:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">All residents</p><h2 className="mt-2 font-serif text-4xl">Community chat</h2>
              <div className="mt-6 max-h-[28rem] space-y-3 overflow-y-auto pr-2">
                {community.docs.length ? community.docs.map((message) => <article className="rounded-2xl bg-white/10 p-4" key={message.id}><div className="flex justify-between gap-4"><p className="text-sm font-bold">{relationName(message.author)}</p><time className="text-[10px] text-white/40">{new Date(message.createdAt).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })}</time></div><p className="mt-2 text-sm leading-6 text-white/75">{message.body}</p></article>) : <p className="rounded-2xl bg-white/10 p-5 text-sm text-white/55">Start the first estate-wide conversation.</p>}
              </div>
              <form action={sendMessage} className="mt-5 flex gap-3"><input className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-emerald-300" name="body" placeholder="Share with the community…" required /><button className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900" type="submit">Send</button></form>
            </div>
            <div className="rounded-3xl bg-white p-5 text-slate-900 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Private</p><h2 className="mt-2 font-serif text-4xl">Direct messages</h2>
              <div className="mt-6 max-h-80 space-y-3 overflow-y-auto">
                {direct.docs.length ? direct.docs.map((message) => <article className="rounded-2xl bg-[#f4f5f2] p-4" key={message.id}><div className="flex justify-between gap-4"><p className="text-sm font-bold">{relationName(message.author)}</p><time className="text-[10px] text-slate-400">{new Date(message.createdAt).toLocaleString('en-KE', { dateStyle: 'short', timeStyle: 'short' })}</time></div><p className="mt-2 text-sm leading-6 text-slate-600">{message.body}</p></article>) : <p className="rounded-2xl bg-[#f4f5f2] p-5 text-sm text-slate-500">Private conversations with management or neighbours appear here.</p>}
              </div>
              <form action={sendMessage} className="mt-5 space-y-3"><select className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm" name="recipient" required><option value="">Choose a resident or management</option>{residents.docs.map((resident) => <option key={resident.id} value={resident.id}>{resident.role === 'staff' ? 'Management — ' : ''}{resident.fullName}{resident.villaNumber ? ` · ${resident.villaNumber}` : ''}</option>)}</select><div className="flex gap-3"><input className="min-w-0 flex-1 rounded-full border border-slate-300 px-5 py-3 text-sm outline-none focus:border-emerald-700" name="body" placeholder="Write a private message…" required /><button className="rounded-full bg-emerald-900 px-5 py-3 text-sm font-bold text-white" type="submit">Send</button></div></form>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl bg-white p-6 sm:p-8">
          <div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-full bg-emerald-50 text-emerald-800"><Icon name="shield" /></span><div><p className="text-xs font-bold uppercase tracking-wider text-emerald-800">Resident library</p><h2 className="font-serif text-4xl">Contracts & estate documents</h2></div></div>
          <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {documents.docs.length ? documents.docs.map((document) => {
              const file = typeof document.file === 'object' ? document.file : null
              return <article className="rounded-2xl border border-slate-200 p-5" key={document.id}><p className="font-bold">{document.title}</p><p className="mt-2 text-sm leading-6 text-slate-500">{document.summary}</p>{file?.url && <a className="mt-4 inline-flex text-sm font-bold text-emerald-800" href={file.url} rel="noreferrer" target="_blank">Open document</a>}</article>
            }) : <p className="col-span-full rounded-2xl bg-[#f4f5f2] p-6 text-sm text-slate-500">Management will publish contracts, terms and estate rules here.</p>}
          </div>
        </section>
      </div>
    </main>
  )
}
