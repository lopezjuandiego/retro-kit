// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

function isValidSession(request: NextRequest): boolean {
  const session = request.cookies.get('retro-session')?.value?.trim() ?? ''
  const raw = process.env.ACCESS_PASSWORDS ?? ''
  const validPasswords = raw.split(',').map(p => p.trim()).filter(Boolean)
  return validPasswords.includes(session)
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/login') ||
    pathname.startsWith('/api/login') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/')) {
    if (!isValidSession(request)) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    return NextResponse.next()
  }

  if (!isValidSession(request)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
