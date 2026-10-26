'use client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f4f5f2] text-slate-950">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">Galleria Gardens</p>
          <h1 className="mt-5 font-serif text-6xl">Let&apos;s open that door again.</h1>
          <p className="mt-5 max-w-lg leading-7 text-slate-600">
            Something unexpected interrupted this page. Your resident information is safe.
          </p>
          <button
            className="mt-8 rounded-full bg-emerald-900 px-7 py-4 text-sm font-bold text-white"
            onClick={() => reset()}
            type="button"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  )
}
