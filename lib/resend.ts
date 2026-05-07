// lib/resend.ts
import { Resend } from 'resend'
import type { SubmissionFormData } from '@/types'

const PHASE_NAMES: Record<number, string> = {
  0: 'Armar el escenario',
  1: 'Recopilar datos',
  2: 'Generar insights',
  3: 'Decidir qué hacer',
  4: 'Cerrar la sesión',
}

export function buildSubmissionEmail(
  form: SubmissionFormData,
  token: string,
  appUrl: string
): { subject: string; text: string } {
  const approveUrl = `${appUrl}/api/approve?token=${token}`
  const rejectUrl = `${appUrl}/api/reject?token=${token}`

  const subject = `[RetroKit] Nueva técnica: ${form.activity_name}`

  const text = `Nueva técnica aportada a RetroKit

Autor: ${form.author_name} (${form.author_email})
Técnica: ${form.activity_name}
Fase: ${PHASE_NAMES[form.phase]}
Duración: ${form.duration}

Resumen:
${form.summary}

Descripción:
${form.description}

Cómo facilitar:
${form.how_to_facilitate}

---

✅ APROBAR: ${approveUrl}

❌ RECHAZAR: ${rejectUrl}
`

  return { subject, text }
}

export async function sendSubmissionNotification(
  form: SubmissionFormData,
  token: string
): Promise<void> {
  const client = new Resend(process.env.RESEND_API_KEY!)
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const to = process.env.NOTIFICATION_EMAIL ?? 'lopezjuandiego@gmail.com'

  const { subject, text } = buildSubmissionEmail(form, token, appUrl)

  await client.emails.send({
    from: 'RetroKit <onboarding@resend.dev>',
    to,
    subject,
    text,
  })
}
