import { Suspense } from 'react'
import { SWRConfig } from 'swr'
import ProductDetails from '~/components/ProductDetails'
import { BASE_API_URL } from '~/utils/constants'

export default function SingleProductPage({ fallback }) {
  return (
    <SWRConfig value={fallback}>
      <Suspense fallback='product loading..'>
        <ProductDetails />
      </Suspense>
    </SWRConfig>
  )
}

export async function getStaticPaths() {
  let paths = []
  const resp = await fetch(`${BASE_API_URL}/vendors`)
  const { data: vendors } = await resp.json()

  for (const vendor of vendors) {
    const res = await fetch(
      `${BASE_API_URL}/products?vendor=${vendor?.displayName}`,
    )
    const { data: vendorProducts } = await res.json()
    vendorProducts?.forEach(product => {
      paths.push({
        params: {
          username: vendor?.displayName,
          id: product._id,
        },
      })
    })
  }

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${BASE_API_URL}/products/${params.id}`)
  const { data: product } = await res.json()

  return {
    props: {
      fallback: {
        [`${BASE_API_URL}/products/${params.id}`]: product,
      },
    },
  }
}
