// lib/claude.ts
import Anthropic from '@anthropic-ai/sdk'
import type { RetromatActivity, LiberatingStructure, RetroFormData, RetroAgenda } from '@/types'

const TIPO_LABELS: Record<string, string> = {
  sprint: 'Retrospectiva de sprint',
  proyecto: 'Retrospectiva de proyecto',
  equipo: 'Dinámica de equipo',
  problema: 'Sesión de resolución de problemas',
}

const TAMAÑO_LABELS: Record<string, string> = {
  pequeño: '3-5 personas',
  mediano: '6-10 personas',
  grande: '11+ personas',
}

const PHASE_NAMES: Record<number, string> = {
  0: 'Armar el escenario',
  1: 'Recopilar datos',
  2: 'Generar insights',
  3: 'Decidir qué hacer',
  4: 'Cerrar la sesión',
}

export function buildPrompt(
  form: RetroFormData,
  activities: RetromatActivity[],
  structures: LiberatingStructure[]
): string {
  const activitiesByPhase = [0, 1, 2, 3, 4]
    .map(phase => {
      const phaseActivities = activities.filter(a => Number(a.phase) === phase)
      if (phaseActivities.length === 0) return ''
      return `### Fase ${phase}: ${PHASE_NAMES[phase]}\n${phaseActivities.map(a => `- [${a.retromatId}] ${a.name}: ${a.summary} (${a.duration})`).join('\n')}`
    })
    .filter(Boolean)
    .join('\n\n')

  const lsSection = structures.length > 0
    ? `\n\n### Técnicas de Estructuras Liberadoras disponibles:\n${structures.map(s => `- ${s.name}: ${s.summary} (${s.duration}) — Útil para: ${s.when_to_use.join(', ')}`).join('\n')}`
    : ''

  return `Sos un experto en facilitación de retrospectivas ágiles y eventos colaborativos.

CONTEXTO DEL EQUIPO:
- Tema/problema: ${form.tema}
- Tipo de evento: ${TIPO_LABELS[form.tipoEvento]}
- Duración total disponible: ${form.duracion} minutos
- Tamaño del equipo: ${TAMAÑO_LABELS[form.tamañoEquipo]}

ACTIVIDADES DISPONIBLES (seleccioná UNA por fase, la más adecuada al tema):
${activitiesByPhase}${lsSection}

Creá una agenda completa. Conservá el nombre exacto de cada actividad de Retromat.

Respondé ÚNICAMENTE con un objeto JSON válido (sin texto adicional, sin bloques markdown):
{
  "titulo": "título descriptivo de la sesión",
  "duracion_total": "${form.duracion} min",
  "agenda": [
    {
      "fase": "nombre de la fase",
      "actividad": "nombre exacto de la actividad",
      "duracion_estimada": "X min",
      "descripcion": "qué se hace en 1-2 oraciones",
      "como_facilitar": "1-2 consejos prácticos para el facilitador",
      "fuente": "retromat"
    }
  ],
  "nota_facilitador": "párrafo con contexto y consejos específicos para esta sesión"
}`
}

export async function generateRetroAgenda(
  form: RetroFormData,
  activities: RetromatActivity[],
  structures: LiberatingStructure[]
): Promise<RetroAgenda> {
  const client = new Anthropic()

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1500,
    messages: [{ role: 'user', content: buildPrompt(form, activities, structures) }],
  })

  const raw = message.content[0].type === 'text' ? message.content[0].text : ''

  // Strip markdown code fences if the model wraps the JSON anyway
  const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim()

  try {
    return JSON.parse(text) as RetroAgenda
  } catch {
    throw new Error(`Respuesta inválida de Claude: ${raw.slice(0, 300)}`)
  }
}
