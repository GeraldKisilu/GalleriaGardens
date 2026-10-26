import 'server-only'

import { cookies } from 'next/headers'

const COOKIE_NAME = 'app-session'
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function getCurrentUser() {
  const token = (await cookies()).get(COOKIE_NAME)?.value
  if (!token) return null

  try {
    const response = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) return null
    const data = await response.json()
    return data.user ?? null
  } catch {
    return null
  }
}

export async function setAppSession(token: string) {
  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAppSession() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}
