'use client'
import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)

  const mostrar = useCallback((mensaje) => {
    setToast(mensaje)
    setTimeout(() => setToast(null), 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ mostrar }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--black)',
          color: 'var(--white)',
          padding: '12px 28px',
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 600,
          zIndex: 9999,
          boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          whiteSpace: 'nowrap',
          animation: 'toast-in 0.18s ease',
          pointerEvents: 'none',
        }}>
          {toast}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
