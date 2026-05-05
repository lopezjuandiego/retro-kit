// types/index.ts

export type RetroPhase = 0 | 1 | 2 | 3 | 4 | 5

export interface RetromatActivity {
  retromatId: number
  name: string
  summary: string
  desc: string
  duration: string
  phase: RetroPhase
  source?: string
  stage?: string
  forumUrl?: string
}

export interface LiberatingStructure {
  id: string
  name: string
  summary: string
  purpose: string
  duration: string
  groupSize: string
  when_to_use: string[]
  pasos: string
}

export interface RetroFormData {
  tema: string
  tipoEvento: 'sprint' | 'proyecto' | 'equipo' | 'problema'
  duracion: 60 | 90 | 120
  tamañoEquipo: 'pequeño' | 'mediano' | 'grande'
  incluirLS: boolean
}

export interface AgendaItem {
  fase: string
  actividad: string
  duracion_estimada: string
  descripcion: string
  como_facilitar: string
  fuente: 'retromat' | 'liberating-structures'
}

export interface RetroAgenda {
  titulo: string
  duracion_total: string
  agenda: AgendaItem[]
  nota_facilitador: string
}
