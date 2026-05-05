// components/RetroResult.tsx
import ActivityCard from './ActivityCard'
import type { RetroAgenda } from '@/types'

interface Props {
  agenda: RetroAgenda
  onReset: () => void
}

export default function RetroResult({ agenda, onReset }: Props) {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{agenda.titulo}</h2>
          <p className="text-sm text-gray-500 mt-0.5">Duración total: {agenda.duracion_total}</p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-800 whitespace-nowrap print:hidden"
        >
          Nueva retro
        </button>
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

      <button
        onClick={() => window.print()}
        className="w-full border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors print:hidden"
      >
        Imprimir / guardar PDF
      </button>
    </div>
  )
}
