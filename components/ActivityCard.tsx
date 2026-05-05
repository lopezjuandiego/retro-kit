// components/ActivityCard.tsx
import type { AgendaItem } from '@/types'

interface Props {
  item: AgendaItem
  index: number
}

const BADGE_STYLES: Record<string, string> = {
  retromat: 'bg-blue-100 text-blue-700',
  'liberating-structures': 'bg-green-100 text-green-700',
}

const BADGE_LABELS: Record<string, string> = {
  retromat: 'Retromat',
  'liberating-structures': 'Estructuras Liberadoras',
}

export default function ActivityCard({ item, index }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-2 bg-white">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
            {index + 1}. {item.fase}
          </p>
          <h3 className="text-base font-semibold text-gray-900">{item.actividad}</h3>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className="text-sm text-gray-500 whitespace-nowrap">{item.duracion_estimada}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${BADGE_STYLES[item.fuente] ?? 'bg-gray-100 text-gray-600'}`}>
            {BADGE_LABELS[item.fuente] ?? item.fuente}
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-600">{item.descripcion}</p>
      <div className="bg-amber-50 border border-amber-100 rounded px-3 py-2">
        <p className="text-xs font-semibold text-amber-700">Para facilitar:</p>
        <p className="text-xs text-amber-800 mt-0.5">{item.como_facilitar}</p>
      </div>
    </div>
  )
}
