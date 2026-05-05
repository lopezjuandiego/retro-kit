// scripts/fetch-retromat.ts
// Correr una sola vez: npx tsx scripts/fetch-retromat.ts
//
// NOTA: La API de retromat no expone un endpoint /backend/?ids=<n>.
// El endpoint real es /api/activities_<lang>.json que devuelve TODAS las
// actividades en un único array JSON (sin wrapper "activities").
// Campos reales del objeto: retromatId, phase (número 0-5), duration,
// source, stage, forumUrl, name, summary, desc.
// Fase 0 = "Armar el escenario" (set the stage), fases 1-4 = las cuatro
// fases clásicas, fase 5 = "Algo completamente distinto".
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

const LANG = 'es'
const API_URL = `https://retromat.org/api/activities_${LANG}.json`

async function fetchAllActivities(): Promise<object[]> {
  const res = await fetch(API_URL, {
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} al obtener ${API_URL}`)
  }
  const data = await res.json()
  if (!Array.isArray(data)) {
    throw new Error(
      `Formato inesperado: se esperaba un array, se recibió ${typeof data}`
    )
  }
  return data
}

async function main() {
  console.log(`Descargando actividades desde ${API_URL} ...`)

  const activities = await fetchAllActivities()

  console.log(`Descargadas ${activities.length} actividades`)

  const dataDir = join(process.cwd(), 'data')
  mkdirSync(dataDir, { recursive: true })

  const out = join(dataDir, 'retromat-es.json')
  writeFileSync(out, JSON.stringify(activities, null, 2))
  console.log(`Guardado en ${out}`)
}

main().catch(console.error)
