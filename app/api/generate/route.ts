// app/api/generate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getActivitiesForRetro } from '@/lib/retromat'
import { getStructuresForRetro } from '@/lib/liberating-structures'
import { generateRetroAgenda } from '@/lib/claude'
import type { RetroFormData } from '@/types'

export async function POST(request: NextRequest) {
  const form: RetroFormData = await request.json()

  if (!form.tema?.trim() || !form.tipoEvento || !form.duracion || !form.tamañoEquipo) {
    return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
  }

  const activities = getActivitiesForRetro(form)
  const structures = form.incluirLS ? getStructuresForRetro(form) : []

  const agenda = await generateRetroAgenda(form, activities, structures)

  return NextResponse.json(agenda)
}
