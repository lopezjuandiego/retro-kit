// app/layout.tsx
import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RetroKit – Generador de Retrospectivas',
  description: 'Diseñá retrospectivas y eventos colaborativos con Retromat y Estructuras Liberadoras',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.className} bg-gray-50 min-h-screen`}>{children}</body>
    </html>
  )
}
