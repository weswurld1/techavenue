'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    const guardado = localStorage.getItem('carrito')
    if (guardado) setItems(JSON.parse(guardado))
  }, [])

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(items))
  }, [items])

  const agregar = (producto) => {
    setItems(prev => {
      const existe = prev.find(p => p.id === producto.id)
      if (existe) {
        return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p)
      }
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  const eliminar = (id) => setItems(prev => prev.filter(p => p.id !== id))

  const cambiarCantidad = (id, delta) => {
    setItems(prev => prev.map(p =>
      p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad + delta) } : p
    ))
  }

  const vaciar = () => setItems([])

  const total = items.reduce((acc, p) => acc + p.precio * p.cantidad, 0)
  const cantidad = items.reduce((acc, p) => acc + p.cantidad, 0)

  return (
    <CartContext.Provider value={{ items, agregar, eliminar, cambiarCantidad, vaciar, total, cantidad }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CartContext)
}
