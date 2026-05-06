// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/login') || pathname.startsWith('/api/login')) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/api/')) {
    const session = request.cookies.get('retro-session')?.value
    const validPasswords = (process.env.ACCESS_PASSWORDS ?? '').split(',')
    if (!session || !validPasswords.includes(session)) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    return NextResponse.next()
  }

  const session = request.cookies.get('retro-session')?.value
  const validPasswords = (process.env.ACCESS_PASSWORDS ?? '').split(',')
  if (!session || !validPasswords.includes(session)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
