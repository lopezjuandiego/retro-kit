import { describe, it, expect } from 'vitest'
import { getActivitiesForRetro, PHASE_NAMES } from '@/lib/retromat'
import type { RetroFormData } from '@/types'

const baseForm: RetroFormData = {
  tema: 'El equipo está desconectado',
  tipoEvento: 'sprint',
  duracion: 90,
  tamañoEquipo: 'mediano',
  incluirLS: false,
}

describe('getActivitiesForRetro', () => {
  it('retorna actividades para las 5 fases estándar (0-4)', () => {
    const result = getActivitiesForRetro(baseForm)
    const phases = new Set(result.map(a => a.phase))
    expect(phases.size).toBe(5)
    expect(phases.has(5)).toBe(false)
  })

  it('retorna como máximo 4 actividades por fase para retro de 90 min', () => {
    const result = getActivitiesForRetro(baseForm)
    for (let phase = 0; phase <= 4; phase++) {
      const count = result.filter(a => a.phase === phase).length
      expect(count).toBeLessThanOrEqual(4)
    }
  })

  it('retorna menos actividades totales para 60 min que para 120 min', () => {
    const short = getActivitiesForRetro({ ...baseForm, duracion: 60 })
    const long = getActivitiesForRetro({ ...baseForm, duracion: 120 })
    expect(short.length).toBeLessThan(long.length)
  })

  it('cada actividad tiene retromatId numérico', () => {
    const result = getActivitiesForRetro(baseForm)
    result.forEach(a => expect(typeof a.retromatId).toBe('number'))
  })
})

describe('PHASE_NAMES', () => {
  it('mapea las 5 fases estándar a etiquetas en español', () => {
    expect(PHASE_NAMES[0]).toBe('Armar el escenario')
    expect(PHASE_NAMES[1]).toBe('Recopilar datos')
    expect(PHASE_NAMES[2]).toBe('Generar insights')
    expect(PHASE_NAMES[3]).toBe('Decidir qué hacer')
    expect(PHASE_NAMES[4]).toBe('Cerrar la sesión')
  })
})
