// app/api/reject/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return new NextResponse('Token requerido', { status: 400 })
  }

  const { error } = await supabase
    .from('community_activities')
    .update({ status: 'rejected' })
    .eq('approval_token', token)
    .eq('status', 'pending')

  if (error) {
    return new NextResponse('Error al rechazar', { status: 500 })
  }

  return new NextResponse(
    `<!DOCTYPE html><html><body style="font-family:sans-serif;text-align:center;padding:60px">
    <h1>❌ Técnica rechazada</h1>
    <p>La contribución fue rechazada.</p>
    <a href="https://retro-kit-six.vercel.app" style="color:#4f46e5">Volver a RetroKit</a>
    </body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  )
}
