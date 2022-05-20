import { onAuthStateChanged } from 'firebase/auth'
import { createContext, useEffect, useState } from 'react'
import { auth } from '~/lib/firebase'
import { createToken, destroyToken, formatUser } from '~/utils/functions'

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(auth?.currentUser?.toJSON() ?? null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async _user => {
      let formattedUser = _user?.toJSON()
      if (_user) {
        formattedUser = await formatUser(_user)
        await createToken(_user)
      } else destroyToken()
      setUser(formattedUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  )
}
