import { describe, it, expect } from 'vitest'
import { getStructuresForRetro } from '@/lib/liberating-structures'
import type { RetroFormData } from '@/types'

const form: RetroFormData = {
  tema: 'Problemas de comunicación entre el equipo',
  tipoEvento: 'equipo',
  duracion: 90,
  tamañoEquipo: 'mediano',
  incluirLS: true,
}

describe('getStructuresForRetro', () => {
  it('retorna entre 3 y 6 estructuras', () => {
    const result = getStructuresForRetro(form)
    expect(result.length).toBeGreaterThanOrEqual(3)
    expect(result.length).toBeLessThanOrEqual(6)
  })

  it('cada estructura tiene todos los campos requeridos', () => {
    const result = getStructuresForRetro(form)
    result.forEach(s => {
      expect(s.id).toBeTruthy()
      expect(s.name).toBeTruthy()
      expect(s.summary).toBeTruthy()
      expect(Array.isArray(s.when_to_use)).toBe(true)
      expect(s.pasos).toBeTruthy()
    })
  })
})
