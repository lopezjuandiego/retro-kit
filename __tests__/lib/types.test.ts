import { describe, it, expect } from 'vitest'
import type { RetromatActivity, LiberatingStructure, RetroFormData, RetroAgenda, AgendaItem } from '@/types'

describe('Forma de RetroFormData', () => {
  it('acepta todos los valores válidos de los campos', () => {
    const form: RetroFormData = {
      tema: 'El sprint tuvo muchos bloqueos técnicos',
      tipoEvento: 'sprint',
      duracion: 90,
      tamañoEquipo: 'mediano',
      incluirLS: false,
    }
    expect(form.tema).toBe('El sprint tuvo muchos bloqueos técnicos')
    expect(form.duracion).toBe(90)
    expect(form.incluirLS).toBe(false)
  })
})

describe('Forma de RetroAgenda', () => {
  it('acepta un array de agenda con entradas AgendaItem', () => {
    const item: AgendaItem = {
      fase: 'Abrir la sesión',
      actividad: 'Check-in rápido',
      duracion_estimada: '5 min',
      descripcion: 'Cada uno comparte una palabra.',
      como_facilitar: 'Ir en orden, sin debate.',
      fuente: 'retromat',
    }
    const agenda: RetroAgenda = {
      titulo: 'Retro del sprint 42',
      duracion_total: '90 min',
      agenda: [item],
      nota_facilitador: 'El equipo está bajo presión, mantené un ritmo liviano.',
    }
    expect(agenda.agenda).toHaveLength(1)
    expect(agenda.agenda[0].fuente).toBe('retromat')
  })
})
