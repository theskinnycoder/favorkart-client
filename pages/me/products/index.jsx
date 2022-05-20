import { useRouter } from 'next/router'
import { Suspense, useEffect } from 'react'
import { SWRConfig } from 'swr'
import ProductGrid from '~/components/ProductGrid'
import useUser from '~/hooks/use-user'
import VendorHomePageSkeleton from '~/skeletons/VendorHomePageSkeleton'

export default function VendorHomePage() {
  const { push } = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  return (
    <SWRConfig
      value={{
        suspense: true,
      }}
    >
      <Suspense fallback={<VendorHomePageSkeleton />}>
        <ProductGrid />
      </Suspense>
    </SWRConfig>
  )
}
