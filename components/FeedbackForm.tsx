// components/FeedbackForm.tsx
'use client'

import { useState } from 'react'
import type { RetroAgenda } from '@/types'

interface Props {
  option1: RetroAgenda
  option2: RetroAgenda
}

export default function FeedbackForm({ option1, option2 }: Props) {
  const [feedback, setFeedback] = useState('')
  const [sent, setSent] = useState(false)

  function handleSend() {
    if (!feedback.trim()) return
    const subject = encodeURIComponent('Feedback RetroKit')
    const actividadesO1 = option1.agenda.map(i => i.actividad).join(', ')
    const actividadesO2 = option2.agenda.map(i => i.actividad).join(', ')
    const body = encodeURIComponent(
      `Feedback sobre RetroKit\n\n` +
      `Opción 1: ${option1.titulo}\nActividades: ${actividadesO1}\n\n` +
      `Opción 2: ${option2.titulo}\nActividades: ${actividadesO2}\n\n` +
      `Mi feedback:\n${feedback}`
    )
    window.open(`mailto:lopezjuandiego@gmail.com?subject=${subject}&body=${body}`)
    setSent(true)
  }

  if (sent) {
    return (
      <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-sm text-green-700 print:hidden">
        ¡Gracias! Se abrió tu cliente de mail con el feedback listo para enviar.
      </div>
    )
  }

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3 print:hidden shadow-sm">
      <p className="text-sm font-medium text-gray-700">¿Qué te pareció? ¿Qué cambiarías?</p>
      <textarea
        rows={2}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none bg-gray-50"
        placeholder="Tu feedback ayuda a mejorar la herramienta..."
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
      />
      <button
        onClick={handleSend}
        className="inline-flex items-center gap-2 bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Enviar feedback
      </button>
    </div>
  )
}
