// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()

  const raw = process.env.ACCESS_PASSWORDS ?? ''
  const validPasswords = raw.split(',').map(p => p.trim()).filter(Boolean)
  const trimmed = (password ?? '').trim()

  if (!trimmed || !validPasswords.includes(trimmed)) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('retro-session', trimmed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 15, // 15 días
    path: '/',
  })
  return response
}
