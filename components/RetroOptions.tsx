// components/RetroOptions.tsx
import ActivityCard from './ActivityCard'
import type { RetroAgenda } from '@/types'

interface Props {
  option1: RetroAgenda
  option2: RetroAgenda
  onReset: () => void
}

export default function RetroOptions({ option1, option2, onReset }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-gray-900">Tus dos propuestas</h2>
        <button
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-800 print:hidden"
        >
          Nueva retro
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[{ agenda: option1, label: 'Opción 1' }, { agenda: option2, label: 'Opción 2' }].map(({ agenda, label }) => (
          <div key={label} className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{label}</span>
              <h3 className="text-base font-bold text-gray-900 mt-0.5">{agenda.titulo}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{agenda.duracion_total}</p>
            </div>

            <div className="space-y-3">
              {agenda.agenda.map((item, i) => (
                <ActivityCard key={i} item={item} index={i} />
              ))}
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Nota para el facilitador</p>
              <p className="text-sm text-indigo-900 leading-relaxed">{agenda.nota_facilitador}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center print:hidden">
        <button
          onClick={() => window.print()}
          className="border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Imprimir / guardar PDF
        </button>
      </div>
    </div>
  )
}
