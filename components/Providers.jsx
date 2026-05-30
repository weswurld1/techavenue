'use client'
import { CartProvider } from '../context/CartContext'
import { ToastProvider } from './Toast'

export default function Providers({ children }) {
  return (
    <CartProvider>
      <ToastProvider>{children}</ToastProvider>
    </CartProvider>
  )
}