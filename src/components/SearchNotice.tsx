'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function NoticeContent() {
  const params = useSearchParams()
  const success = params.get('success')
  const error = params.get('error')
  if (!success && !error) return null
  return (
    <p className={`mt-5 rounded-xl p-4 text-sm ${success ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}`}>
      {success ?? error}
    </p>
  )
}

export function SearchNotice() {
  return <Suspense fallback={null}><NoticeContent /></Suspense>
}
