import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { convertCase } from '@/helpers/convert-case'

function useSEO() {
  const { pathname } = useRouter()
  const name = convertCase.toTitle(pathname.slice(1))

  const title = `${name} | Buku Graduan`
  const url = `https://bukugraduan.afrieirham.com${pathname}`

  function CustomNextSeo() {
    return (
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          title,
          url,
        }}
      />
    )
  }

  return { CustomNextSeo }
}

export { useSEO }
