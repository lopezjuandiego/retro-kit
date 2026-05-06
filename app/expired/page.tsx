// app/expired/page.tsx
export default function ExpiredPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RetroKit</h1>
          <p className="text-gray-500 text-sm mt-1">Beta cerrada</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            El período de acceso a esta versión beta venció.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Si querés seguir probando la herramienta o dejar tu feedback, contactame por LinkedIn.
          </p>
          <a
            href={process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/lopezjuandiego'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0077B5] text-white font-medium px-5 py-2.5 rounded-lg hover:bg-[#006396] transition-colors"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Contactar en LinkedIn
          </a>
        </div>
      </div>
    </main>
  )
}
