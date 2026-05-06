// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getActivitiesForRetro } from '@/lib/retromat'
import { getStructuresForRetro } from '@/lib/liberating-structures'
import { generateRetroAgenda } from '@/lib/claude'
import type { RetroFormData } from '@/types'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { variant, ...form } = body as RetroFormData & { variant?: number }

  if (!form.tema?.trim() || !form.tipoEvento || !form.duracion || !form.tamañoEquipo) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key no configurada en el servidor' }, { status: 500 })
  }

  try {
    const activities = getActivitiesForRetro(form)
    const structures = form.incluirLS ? getStructuresForRetro(form) : []
    const agenda = await generateRetroAgenda(form, activities, structures, variant ?? 1)
    return NextResponse.json(agenda)
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
