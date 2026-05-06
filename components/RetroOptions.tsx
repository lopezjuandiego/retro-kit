// components/RetroOptions.tsx
'use client'

import { useState } from 'react'
import ActivityCard from './ActivityCard'
import FeedbackForm from './FeedbackForm'
import type { RetroAgenda } from '@/types'

type View = 'option1' | 'option2' | 'compare'

interface Props {
  option1: RetroAgenda
  option2: RetroAgenda
  onReset: () => void
}

function AgendaDetail({ agenda }: { agenda: RetroAgenda }) {
  return (
    <div className="space-y-4">
      <div className="bg-white border border-gray-100 rounded-xl px-5 py-4 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">{agenda.titulo}</h3>
        <p className="text-sm text-gray-400 mt-0.5">{agenda.duracion_total}</p>
      </div>
      <div className="space-y-3">
        {agenda.agenda.map((item, i) => (
          <ActivityCard key={i} item={item} index={i} />
        ))}
      </div>
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-indigo-700 mb-1">Nota para el facilitador</p>
        <p className="text-sm text-indigo-900 leading-relaxed">{agenda.nota_facilitador}</p>
      </div>
    </div>
  )
}

export default function RetroOptions({ option1, option2, onReset }: Props) {
  const [view, setView] = useState<View>('option1')

  const tabs: { id: View; label: string }[] = [
    { id: 'option1', label: 'Opción 1' },
    { id: 'option2', label: 'Opción 2' },
    { id: 'compare', label: 'Comparar' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Tus propuestas</h2>
          <p className="text-sm text-gray-400 mt-0.5">Dos agendas distintas para el mismo contexto</p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-800 print:hidden"
        >
          ← Nueva retro
        </button>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto">
        <div className="inline-flex bg-gray-100 rounded-xl p-1 gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === tab.id
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {view === 'option1' && (
        <div className="max-w-xl mx-auto">
          <AgendaDetail agenda={option1} />
        </div>
      )}

      {view === 'option2' && (
        <div className="max-w-xl mx-auto">
          <AgendaDetail agenda={option2} />
        </div>
      )}

      {view === 'compare' && (
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide bg-indigo-50 px-2.5 py-1 rounded-full">Opción 1</span>
            </div>
            <AgendaDetail agenda={option1} />
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide bg-violet-50 px-2.5 py-1 rounded-full">Opción 2</span>
            </div>
            <AgendaDetail agenda={option2} />
          </div>
        </div>
      )}

      {/* Feedback */}
      <FeedbackForm option1={option1} option2={option2} />

      {/* Print */}
      <div className="max-w-5xl mx-auto text-center print:hidden pt-2">
        <button
          onClick={() => window.print()}
          className="border border-gray-200 text-gray-600 text-sm font-medium py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Imprimir / guardar PDF
        </button>
      </div>
    </div>
  )
}
