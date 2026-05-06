// components/ActivityCard.tsx
import type { AgendaItem } from '@/types'

interface Props {
  item: AgendaItem
  index: number
}

const BADGE_STYLES: Record<string, string> = {
  retromat: 'bg-blue-50 text-blue-600 border border-blue-100',
  'liberating-structures': 'bg-green-50 text-green-600 border border-green-100',
}

const BADGE_LABELS: Record<string, string> = {
  retromat: 'Retromat',
  'liberating-structures': 'Estructuras Liberadoras',
}

const PHASE_COLORS = [
  'bg-violet-500',
  'bg-blue-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-rose-400',
]

export default function ActivityCard({ item, index }: Props) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 space-y-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className={`shrink-0 w-7 h-7 rounded-lg ${PHASE_COLORS[index % PHASE_COLORS.length]} flex items-center justify-center`}>
          <span className="text-white text-xs font-bold">{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{item.fase}</p>
              {item.fuente === 'liberating-structures' ? (
                <a
                  href={`https://www.liberatingstructures.com/?s=${encodeURIComponent(item.actividad)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-green-700 hover:underline mt-0.5 inline-flex items-center gap-1"
                >
                  {item.actividad}
                  <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ) : (
                <h3 className="text-sm font-bold text-gray-900 mt-0.5">{item.actividad}</h3>
              )}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-gray-400">{item.duracion_estimada}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${BADGE_STYLES[item.fuente] ?? 'bg-gray-100 text-gray-500'}`}>
                {BADGE_LABELS[item.fuente] ?? item.fuente}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed pl-10">{item.descripcion}</p>
      <div className="ml-10 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
        <p className="text-xs font-semibold text-amber-700">Para facilitar:</p>
        <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">{item.como_facilitar}</p>
      </div>
    </div>
  )
}
