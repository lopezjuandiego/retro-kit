// app/api/approve/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')

  if (!token) {
    return new NextResponse('Token requerido', { status: 400 })
  }

  const { error } = await supabase
    .from('community_activities')
    .update({ status: 'approved', approved_at: new Date().toISOString() })
    .eq('approval_token', token)
    .eq('status', 'pending')

  if (error) {
    return new NextResponse('Error al aprobar', { status: 500 })
  }

  return new NextResponse(
    `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><title>Técnica aprobada</title></head>
<body style="font-family:system-ui,sans-serif;text-align:center;padding:80px 20px;background:#f9fafb">
  <div style="max-width:400px;margin:0 auto;background:white;padding:40px;border-radius:16px;box-shadow:0 1px 4px rgba(0,0,0,0.08)">
    <div style="font-size:48px;margin-bottom:16px">✅</div>
    <h1 style="font-size:20px;color:#111827;margin-bottom:8px">Técnica aprobada</h1>
    <p style="font-size:14px;color:#6b7280;margin-bottom:24px">La contribución quedará disponible en RetroKit.</p>
    <a href="https://retro-kit-six.vercel.app" style="display:inline-block;background:#4f46e5;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:500">Volver a RetroKit</a>
  </div>
</body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  )
}
