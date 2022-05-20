import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUser from '~/hooks/use-user'

export default function PlaceOrderPage() {
  const { push } = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  return <div>PlaceOrderPage</div>
}
