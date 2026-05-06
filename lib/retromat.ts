// lib/retromat.ts
import activitiesData from '@/data/retromat-es.json'
import type { RetromatActivity, RetroFormData, RetroPhase } from '@/types'

const ALL_ACTIVITIES = activitiesData as RetromatActivity[]

export const PHASE_NAMES: Record<number, string> = {
  0: 'Armar el escenario',
  1: 'Recopilar datos',
  2: 'Generar insights',
  3: 'Decidir qué hacer',
  4: 'Cerrar la sesión',
}

const ACTIVITIES_PER_PHASE: Record<number, number> = {
  60: 3,
  90: 4,
  120: 5,
}

const STANDARD_PHASES: RetroPhase[] = [0, 1, 2, 3, 4]

export function getActivitiesForRetro(
  form: RetroFormData,
  variant: number = 1,
  seed: number = 0
): RetromatActivity[] {
  const perPhase = ACTIVITIES_PER_PHASE[form.duracion] ?? 4
  // seed rota el punto de partida; variant 1 y 2 toman bloques consecutivos
  const baseOffset = (seed % 4) * perPhase
  const variantOffset = (variant - 1) * perPhase

  return STANDARD_PHASES.flatMap(phase => {
    const phaseActivities = ALL_ACTIVITIES.filter(a => Number(a.phase) === phase)
    const total = phaseActivities.length
    const start = (baseOffset + variantOffset) % Math.max(total - perPhase + 1, 1)
    return phaseActivities.slice(start, start + perPhase)
  })
}
