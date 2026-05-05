// components/RetroForm.tsx
'use client'

import { useState } from 'react'
import type { RetroFormData } from '@/types'

interface Props {
  onSubmit: (data: RetroFormData) => void
  loading: boolean
}

const TIPO_OPTIONS = [
  { value: 'sprint', label: 'Retrospectiva de sprint' },
  { value: 'proyecto', label: 'Cierre de proyecto' },
  { value: 'equipo', label: 'Dinámica de equipo' },
  { value: 'problema', label: 'Resolución de problema puntual' },
] as const

const DURACION_OPTIONS = [
  { value: 60, label: '60 min' },
  { value: 90, label: '90 min' },
  { value: 120, label: '2 horas' },
] as const

const TAMAÑO_OPTIONS = [
  { value: 'pequeño', label: '3–5 personas' },
  { value: 'mediano', label: '6–10 personas' },
  { value: 'grande', label: '11+ personas' },
] as const

export default function RetroForm({ onSubmit, loading }: Props) {
  const [form, setForm] = useState<RetroFormData>({
    tema: '',
    tipoEvento: 'sprint',
    duracion: 90,
    tamañoEquipo: 'mediano',
    incluirLS: false,
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿Sobre qué quieren reflexionar?
        </label>
        <textarea
          required
          rows={3}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Ej: el último sprint fue muy caótico, tuvimos muchos bloqueos técnicos y la comunicación falló..."
          value={form.tema}
          onChange={e => setForm(f => ({ ...f, tema: e.target.value }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de sesión</label>
        <select
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={form.tipoEvento}
          onChange={e => setForm(f => ({ ...f, tipoEvento: e.target.value as RetroFormData['tipoEvento'] }))}
        >
          {TIPO_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.duracion}
            onChange={e => setForm(f => ({ ...f, duracion: Number(e.target.value) as RetroFormData['duracion'] }))}
          >
            {DURACION_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño del equipo</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={form.tamañoEquipo}
            onChange={e => setForm(f => ({ ...f, tamañoEquipo: e.target.value as RetroFormData['tamañoEquipo'] }))}
          >
            {TAMAÑO_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="incluirLS"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={form.incluirLS}
          onChange={e => setForm(f => ({ ...f, incluirLS: e.target.checked }))}
        />
        <label htmlFor="incluirLS" className="text-sm text-gray-700">
          Incluir técnicas de Estructuras Liberadoras
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !form.tema.trim()}
        className="w-full bg-indigo-600 text-white font-medium py-2.5 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Generando agenda...' : 'Generar retro'}
      </button>
    </form>
  )
}
