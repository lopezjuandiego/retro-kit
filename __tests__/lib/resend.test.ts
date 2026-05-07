import { describe, it, expect } from 'vitest'
import { buildSubmissionEmail } from '@/lib/resend'
import type { SubmissionFormData } from '@/types'

const form: SubmissionFormData = {
  author_name: 'Juancito',
  author_email: 'juancito@mail.com',
  activity_name: 'El Semáforo',
  summary: 'Cada uno muestra en qué está',
  description: 'Verde bien, amarillo dudas, rojo bloqueado.',
  phase: 0,
  duration: '5 min',
  how_to_facilitate: 'Pedir que cada uno diga su color y por qué.',
}

describe('buildSubmissionEmail', () => {
  it('incluye el nombre del autor', () => {
    const { text } = buildSubmissionEmail(form, 'token-abc', 'https://app.com')
    expect(text).toContain('Juancito')
  })

  it('incluye el nombre de la actividad', () => {
    const { text } = buildSubmissionEmail(form, 'token-abc', 'https://app.com')
    expect(text).toContain('El Semáforo')
  })

  it('incluye el link de aprobación con el token', () => {
    const { text } = buildSubmissionEmail(form, 'token-abc', 'https://app.com')
    expect(text).toContain('https://app.com/api/approve?token=token-abc')
  })

  it('incluye el link de rechazo con el token', () => {
    const { text } = buildSubmissionEmail(form, 'token-abc', 'https://app.com')
    expect(text).toContain('https://app.com/api/reject?token=token-abc')
  })

  it('retorna un subject con el nombre de la actividad', () => {
    const { subject } = buildSubmissionEmail(form, 'token-abc', 'https://app.com')
    expect(subject).toContain('El Semáforo')
  })
})
