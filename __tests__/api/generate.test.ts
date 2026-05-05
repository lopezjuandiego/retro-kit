import { describe, it, expect } from 'vitest'
import { buildPrompt } from '@/lib/claude'
import type { RetroFormData, RetromatActivity, LiberatingStructure } from '@/types'

const form: RetroFormData = {
  tema: 'El sprint tuvo muchos bloqueos técnicos',
  tipoEvento: 'sprint',
  duracion: 90,
  tamañoEquipo: 'mediano',
  incluirLS: false,
}

const activity: RetromatActivity = {
  retromatId: 42,
  name: 'Speed Boat',
  summary: 'Identifica lo que frena al equipo',
  desc: 'El equipo dibuja un bote y anclas.',
  duration: 'Medium',
  phase: 2,
}

describe('buildPrompt', () => {
  it('incluye el tema del usuario', () => {
    const prompt = buildPrompt(form, [activity], [])
    expect(prompt).toContain('El sprint tuvo muchos bloqueos técnicos')
  })

  it('incluye la duración', () => {
    const prompt = buildPrompt(form, [activity], [])
    expect(prompt).toContain('90')
  })

  it('incluye el nombre de la actividad', () => {
    const prompt = buildPrompt(form, [activity], [])
    expect(prompt).toContain('Speed Boat')
  })

  it('pide salida en JSON', () => {
    const prompt = buildPrompt(form, [activity], [])
    expect(prompt.toLowerCase()).toContain('json')
  })

  it('no menciona LS cuando el array de estructuras está vacío', () => {
    const prompt = buildPrompt(form, [activity], [])
    expect(prompt).not.toContain('Estructuras Liberadoras')
  })

  it('incluye la sección de LS cuando se proporcionan estructuras', () => {
    const ls: LiberatingStructure = {
      id: '1-2-4-all',
      name: '1-2-4-All',
      summary: 'Involucra a todos',
      purpose: 'Dar voz a todos',
      duration: '12 min',
      groupSize: 'cualquier tamaño',
      when_to_use: ['inicio'],
      pasos: '1 min solo → pares → grupos de 4',
    }
    const prompt = buildPrompt(form, [activity], [ls])
    expect(prompt).toContain('Estructuras Liberadoras')
    expect(prompt).toContain('1-2-4-All')
  })
})
