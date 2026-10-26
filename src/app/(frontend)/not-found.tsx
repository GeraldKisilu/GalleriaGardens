import Link from "next/link"

/**
 * Custom not-found page for the frontend.
 * This renders when `notFound()` is called from any page in the (frontend) route group.
 *
 * Customize this component to match your app's design and provide helpful navigation.
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-8 py-16 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">404</p>
      <h1 className="mt-4 font-serif text-6xl tracking-tight">This path doesn&apos;t lead home.</h1>
      <p className="mt-5 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        className="mt-8 rounded-full bg-emerald-900 px-6 py-4 text-sm font-bold text-white"
        href="/"
      >
        Back to Galleria Gardens
      </Link>
    </main>
  )
}
