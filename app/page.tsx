// app/page.tsx
'use client'

import { useState } from 'react'
import RetroForm from '@/components/RetroForm'
import RetroOptions from '@/components/RetroOptions'
import RetroResult from '@/components/RetroResult'
import type { RetroFormData, RetroAgenda } from '@/types'

type Stage = 'form' | 'options' | 'result'

export default function Home() {
  const [stage, setStage] = useState<Stage>('form')
  const [options, setOptions] = useState<[RetroAgenda, RetroAgenda] | null>(null)
  const [selected, setSelected] = useState<RetroAgenda | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(form: RetroFormData) {
    setLoading(true)
    setError(null)

    try {
      const [res1, res2] = await Promise.all([
        fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, variant: 1 }),
        }),
        fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, variant: 2 }),
        }),
      ])

      if (!res1.ok || !res2.ok) {
        const err = await (res1.ok ? res2 : res1).json().catch(() => ({}))
        throw new Error(err.error ?? 'Error al generar las agendas. Intentá de nuevo.')
      }

      const [agenda1, agenda2]: [RetroAgenda, RetroAgenda] = await Promise.all([
        res1.json(),
        res2.json(),
      ])

      setOptions([agenda1, agenda2])
      setStage('options')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  function handleSelect(agenda: RetroAgenda) {
    setSelected(agenda)
    setStage('result')
  }

  function handleReset() {
    setStage('form')
    setOptions(null)
    setSelected(null)
    setError(null)
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RetroKit</h1>
        <p className="text-gray-500 text-sm">
          Generador de retrospectivas y eventos colaborativos para facilitadores
        </p>
      </div>

      {stage === 'form' && (
        <>
          <RetroForm onSubmit={handleSubmit} loading={loading} />
          {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        </>
      )}

      {stage === 'options' && options && (
        <>
          <RetroOptions option1={options[0]} option2={options[1]} onSelect={handleSelect} />
          <div className="text-center mt-6">
            <button onClick={handleReset} className="text-sm text-gray-400 hover:text-gray-600">
              ← Volver al formulario
            </button>
          </div>
        </>
      )}

      {stage === 'result' && selected && (
        <RetroResult agenda={selected} onReset={handleReset} />
      )}
    </main>
  )
}
