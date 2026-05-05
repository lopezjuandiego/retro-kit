// lib/liberating-structures.ts
import structuresData from '@/data/liberating-structures.json'
import type { LiberatingStructure, RetroFormData } from '@/types'

const ALL_STRUCTURES = structuresData as LiberatingStructure[]

export function getStructuresForRetro(_form: RetroFormData): LiberatingStructure[] {
  return ALL_STRUCTURES.slice(0, 5)
}
