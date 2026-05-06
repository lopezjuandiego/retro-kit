// components/RetroOptions.tsx
import type { RetroAgenda } from '@/types'

interface Props {
  option1: RetroAgenda
  option2: RetroAgenda
  onSelect: (agenda: RetroAgenda) => void
}

export default function RetroOptions({ option1, option2, onSelect }: Props) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-semibold text-gray-900">Elegí una agenda</h2>
        <p className="text-sm text-gray-500 mt-1">Dos propuestas para el mismo contexto</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{ agenda: option1, label: 'Opción 1' }, { agenda: option2, label: 'Opción 2' }].map(({ agenda, label }) => (
          <div key={label} className="border border-gray-200 rounded-xl p-5 space-y-4 bg-white hover:border-indigo-300 hover:shadow-sm transition-all">
            <div>
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{label}</span>
              <h3 className="text-base font-bold text-gray-900 mt-1">{agenda.titulo}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{agenda.duracion_total}</p>
            </div>

            <ol className="space-y-1.5">
              {agenda.agenda.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span><span className="font-medium text-gray-800">{item.actividad}</span> · {item.duracion_estimada}</span>
                </li>
              ))}
            </ol>

            <button
              onClick={() => onSelect(agenda)}
              className="w-full bg-indigo-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Usar {label}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
