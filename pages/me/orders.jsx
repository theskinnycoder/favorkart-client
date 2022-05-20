import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useUser from '~/hooks/use-user'
import ProfileLayout from '~/layouts/ProfileLayout'

export default function OrdersPage() {
  const { push } = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  return (
    <ProfileLayout>
      <div>OrdersPage</div>
    </ProfileLayout>
  )
}
