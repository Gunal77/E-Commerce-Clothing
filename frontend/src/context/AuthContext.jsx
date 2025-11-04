import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const json = localStorage.getItem('auth_user')
    return json ? JSON.parse(json) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('auth_token'))

  useEffect(() => {
    if (user) localStorage.setItem('auth_user', JSON.stringify(user))
    else localStorage.removeItem('auth_user')
  }, [user])
  useEffect(() => {
    if (token) localStorage.setItem('auth_token', token)
    else localStorage.removeItem('auth_token')
    api.defaults.headers.common.Authorization = token ? `Bearer ${token}` : ''
  }, [token])

  const value = useMemo(() => ({ user, token, setUser, setToken, logout: () => { setUser(null); setToken('') } }), [user, token])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


