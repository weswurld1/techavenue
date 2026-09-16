'use client'
import { CartProvider } from '../context/CartContext'
import { CatalogoProvider } from '../context/CatalogoContext'
import { ToastProvider } from './Toast'

export default function Providers({ children }) {
  return (
    <CatalogoProvider>
      <CartProvider>
        <ToastProvider>{children}</ToastProvider>
      </CartProvider>
    </CatalogoProvider>
  )
}