'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { clearAppSession, getCurrentUser, setAppSession } from '@/lib/app-auth'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
const text = (value: FormDataEntryValue | null, max = 500) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const authHeaders = async () => {
  const token = (await cookies()).get('app-session')?.value
  return {
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function apiFetch(path: string, method: string, body?: Record<string, unknown>) {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: await authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'request failed' }))
    throw new Error(error.error || 'request failed')
  }

  return response.json().catch(() => ({}))
}

export async function registerResident(formData: FormData) {
  const fullName = text(formData.get('fullName'), 120)
  const email = text(formData.get('email'), 180).toLowerCase()
  const phone = text(formData.get('phone'), 30)
  const villaNumber = text(formData.get('villaNumber'), 40)
  const password = text(formData.get('password'), 120)

  if (!fullName || !emailPattern.test(email) || !phone || password.length < 8) {
    redirect('/register?error=Please+complete+all+fields+with+a+valid+email+and+8-character+password')
  }

  try {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, first_name: fullName.split(' ')[0] || fullName, last_name: fullName.split(' ').slice(1).join(' ') || '', phone, password, villaNumber }),
      cache: 'no-store',
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const message = typeof data.error === 'string' ? data.error : 'Unable to create account'
      redirect(`/register?error=${encodeURIComponent(message)}`)
    }
  } catch {
    redirect('/register?error=Unable+to+connect+to+the+server')
  }

  redirect('/login?success=Account+created+successfully')
}

export async function loginResident(formData: FormData) {
  const email = text(formData.get('email'), 180).toLowerCase()
  const password = text(formData.get('password'), 120)

  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ email, password }),
    cache: 'no-store',
  })

  if (!response.ok) {
    redirect('/login?error=Email+or+password+is+incorrect')
  }

  const data = await response.json()
  if (data.access_token) await setAppSession(data.access_token)
  redirect('/resident')
}

export async function logoutResident() {
  await clearAppSession()
  redirect('/')
}

async function requireUser() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return user
}

export async function createServiceRequest(formData: FormData) {
  await requireUser()
  const category = text(formData.get('category'), 30)
  const priority = text(formData.get('priority'), 20)
  const subject = text(formData.get('subject'), 140)
  const description = text(formData.get('description'), 2000)
  const validCategories = ['plumbing', 'electrical', 'security', 'landscaping', 'general', 'complaint']
  const validPriorities = ['low', 'normal', 'urgent']

  if (!subject || !description || !validCategories.includes(category) || !validPriorities.includes(priority)) {
    redirect('/resident?error=Please+complete+the+maintenance+request')
  }

  try {
    await apiFetch('/service-requests', 'POST', { category, priority, description, subject })
  } catch {
    redirect('/resident?error=Unable+to+submit+request')
  }

  redirect('/resident?success=Request+submitted')
}

export async function createBooking(formData: FormData) {
  await requireUser()
  const amenity = text(formData.get('amenity'), 100)
  const bookingDate = text(formData.get('bookingDate'), 30)
  const startTime = text(formData.get('startTime'), 10)
  const endTime = text(formData.get('endTime'), 10)
  const purpose = text(formData.get('purpose'), 600)

  if (!amenity || !bookingDate || !startTime || !endTime) redirect('/resident?error=Please+complete+the+booking')

  try {
    await apiFetch('/bookings', 'POST', { property_id: Number(amenity) || 1, booking_date: `${bookingDate}T${startTime}:00`, amount: 0, purpose })
  } catch {
    redirect('/resident?error=Unable+to+create+booking')
  }

  redirect('/resident?success=Booking+requested')
}

export async function sendMessage(formData: FormData) {
  await requireUser()
  const body = text(formData.get('body'), 2000)
  const recipient = text(formData.get('recipient'), 100)

  if (!body) redirect('/resident?error=Your+message+cannot+be+empty')

  try {
    await apiFetch('/messages', 'POST', { sender_name: 'Resident', subject: recipient ? 'Private message' : 'Community update', body })
  } catch {
    redirect('/resident?error=Unable+to+send+message')
  }

  redirect('/resident?success=Message+sent')
}

export async function applyForCareer(formData: FormData) {
  const career = text(formData.get('career'), 100)
  const fullName = text(formData.get('fullName'), 120)
  const email = text(formData.get('email'), 180).toLowerCase()
  const phone = text(formData.get('phone'), 30)
  const coverNote = text(formData.get('coverNote'), 3000)

  if (!career || !fullName || !emailPattern.test(email) || !phone || !coverNote) {
    redirect('/careers?error=Please+complete+all+application+fields')
  }

  try {
    await fetch(`${API_BASE}/careers/${career}/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ full_name: fullName, email, phone, cover_letter: coverNote }),
      cache: 'no-store',
    })
  } catch {
    redirect('/careers?error=Unable+to+submit+application')
  }

  redirect('/careers?success=Application+received')
}
