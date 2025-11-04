import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const existing = state.items.find(i => i._id === action.item._id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i => i._id === action.item._id ? { ...i, quantity: i.quantity + (action.quantity || 1) } : i)
        }
      }
      return { ...state, items: [...state.items, { ...action.item, quantity: action.quantity || 1 }] }
    }
    case 'remove': {
      return { ...state, items: state.items.filter(i => i._id !== action.id) }
    }
    case 'setQuantity': {
      return {
        ...state,
        items: state.items.map(i => i._id === action.id ? { ...i, quantity: Math.max(1, action.quantity) } : i)
      }
    }
    case 'clear': return { items: [] }
    default: return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const total = useMemo(() => state.items.reduce((s, i) => s + i.price * i.quantity, 0), [state.items])

  const value = useMemo(() => ({
    items: state.items,
    total,
    addItem: (item, quantity) => dispatch({ type: 'add', item, quantity }),
    removeItem: id => dispatch({ type: 'remove', id }),
    setQuantity: (id, quantity) => dispatch({ type: 'setQuantity', id, quantity }),
    clear: () => dispatch({ type: 'clear' })
  }), [state.items, total])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


