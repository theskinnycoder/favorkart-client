import { Suspense } from 'react'
import { SWRConfig } from 'swr'
import ProductGrid from '~/components/ProductGrid'
import VendorHomePageSkeleton from '~/skeletons/VendorHomePageSkeleton'
import { BASE_API_URL } from '~/utils/constants'

export default function VendorHomePage({ fallback }) {
  return (
    <SWRConfig value={fallback}>
      <Suspense fallback={<VendorHomePageSkeleton />}>
        <ProductGrid />
      </Suspense>
    </SWRConfig>
  )
}

export async function getStaticPaths() {
  const res = await fetch(`${BASE_API_URL}/vendors`)
  const { data: vendors } = await res.json()

  return {
    paths: vendors.map(vendor => ({
      params: {
        username: vendor?.displayName,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${BASE_API_URL}/products?vendor=${params.username}`)
  const { data: products } = await res.json()

  return {
    props: {
      fallback: {
        [`${BASE_API_URL}/products?vendor=${params.username}`]: products,
      },
    },
  }
}
