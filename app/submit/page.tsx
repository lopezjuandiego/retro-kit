// app/submit/page.tsx
'use client'

import { useState } from 'react'
import type { SubmissionFormData } from '@/types'

const PHASE_OPTIONS = [
  { value: 0, label: '0 — Armar el escenario' },
  { value: 1, label: '1 — Recopilar datos' },
  { value: 2, label: '2 — Generar insights' },
  { value: 3, label: '3 — Decidir qué hacer' },
  { value: 4, label: '4 — Cerrar la sesión' },
]

type Stage = 'form' | 'success'

export default function SubmitPage() {
  const [stage, setStage] = useState<Stage>('form')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<SubmissionFormData>({
    author_name: '',
    author_email: '',
    activity_name: '',
    summary: '',
    description: '',
    phase: 0,
    duration: '',
    how_to_facilitate: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Error al enviar. Intentá de nuevo.')
      }
      setStage('success')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  if (stage === 'success') {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <div className="text-4xl">🎉</div>
          <h1 className="text-xl font-bold text-gray-900">¡Gracias por contribuir!</h1>
          <p className="text-sm text-gray-500">
            Tu técnica fue recibida y será revisada. Si se aprueba, aparecerá en RetroKit con tu nombre.
          </p>
          <a href="/" className="inline-block text-sm text-indigo-600 hover:underline">
            Volver a RetroKit
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contribuir a RetroKit</h1>
          <p className="text-sm text-gray-500 mt-1">
            Compartí una técnica de retro con la comunidad. Si se aprueba, aparecerá con tu nombre.
          </p>
          <p className="text-xs text-gray-400 mt-1">* Todos los campos son obligatorios</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tu nombre<span className="text-red-500 ml-0.5">*</span></label>
              <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Juancito Pérez"
                value={form.author_name}
                onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tu email<span className="text-red-500 ml-0.5">*</span></label>
              <input
                required
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="juancito@mail.com"
                value={form.author_email}
                onChange={e => setForm(f => ({ ...f, author_email: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la técnica<span className="text-red-500 ml-0.5">*</span></label>
            <input
              required
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="El Semáforo"
              value={form.activity_name}
              onChange={e => setForm(f => ({ ...f, activity_name: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fase de la retro<span className="text-red-500 ml-0.5">*</span></label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.phase}
                onChange={e => setForm(f => ({ ...f, phase: Number(e.target.value) as SubmissionFormData['phase'] }))}
              >
                {PHASE_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duración estimada<span className="text-red-500 ml-0.5">*</span></label>
              <input
                required
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="5-10 min"
                value={form.duration}
                onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Resumen breve<span className="text-red-500 ml-0.5">*</span></label>
            <input
              required
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="En una oración: qué hace esta técnica"
              value={form.summary}
              onChange={e => setForm(f => ({ ...f, summary: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción completa<span className="text-red-500 ml-0.5">*</span></label>
            <textarea
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Explicá la dinámica con detalle..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cómo facilitar<span className="text-red-500 ml-0.5">*</span></label>
            <textarea
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Consejos prácticos para el facilitador..."
              value={form.how_to_facilitate}
              onChange={e => setForm(f => ({ ...f, how_to_facilitate: e.target.value }))}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Enviando...' : 'Enviar técnica'}
          </button>
        </form>
      </div>
    </main>
  )
}
