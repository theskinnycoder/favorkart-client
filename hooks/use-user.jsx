import { useContext } from 'react'
import { AuthContext } from '~/contexts/AuthContext'

export default function useUser() {
  const { user, setUser } = useContext(AuthContext)

  return { user, setUser }
}
