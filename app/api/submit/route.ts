// app/api/submit/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendSubmissionNotification } from '@/lib/resend'
import type { SubmissionFormData } from '@/types'

export async function POST(request: NextRequest) {
  const body: SubmissionFormData = await request.json()

  const required = ['author_name', 'author_email', 'activity_name', 'summary', 'description', 'duration', 'how_to_facilitate'] as const
  for (const field of required) {
    if (!body[field]?.toString().trim()) {
      return NextResponse.json({ error: `Falta el campo: ${field}` }, { status: 400 })
    }
  }

  if (typeof body.phase !== 'number' || body.phase < 0 || body.phase > 4) {
    return NextResponse.json({ error: 'Fase inválida' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('community_activities')
    .insert({
      author_name: body.author_name.trim(),
      author_email: body.author_email.trim().toLowerCase(),
      activity_name: body.activity_name.trim(),
      summary: body.summary.trim(),
      description: body.description.trim(),
      phase: body.phase,
      duration: body.duration.trim(),
      how_to_facilitate: body.how_to_facilitate.trim(),
    })
    .select('approval_token')
    .single()

  if (error || !data) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: 'Error al guardar. Intentá de nuevo.' }, { status: 500 })
  }

  try {
    await sendSubmissionNotification(body, data.approval_token)
  } catch (emailError) {
    console.error('Resend error:', emailError)
  }

  return NextResponse.json({ ok: true })
}
