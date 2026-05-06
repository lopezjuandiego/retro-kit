// app/page.tsx
'use client'

import { useState } from 'react'
import RetroForm from '@/components/RetroForm'
import RetroResult from '@/components/RetroResult'
import type { RetroFormData, RetroAgenda } from '@/types'

export default function Home() {
  const [agenda, setAgenda] = useState<RetroAgenda | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(form: RetroFormData) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Error al generar la agenda. Intentá de nuevo.')
      }
      const data: RetroAgenda = await res.json()
      setAgenda(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="py-12 px-4">
      <div className="max-w-xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">RetroKit</h1>
        <p className="text-gray-500 text-sm">
          Generador de retrospectivas y eventos colaborativos para facilitadores
        </p>
      </div>

      {agenda ? (
        <RetroResult agenda={agenda} onReset={() => setAgenda(null)} />
      ) : (
        <>
          <RetroForm onSubmit={handleSubmit} loading={loading} />
          {error && (
            <p className="mt-4 text-center text-sm text-red-600">{error}</p>
          )}
        </>
      )}
    </main>
  )
}
