const title = 'A marketplace for students to buy and sell books. | Buku Graduan'
const description =
  'Buku Graduan is a marketplace for university student’s to buy and sell their reference books once they don’t use it anymore.'

const SEO = {
  title,
  description,
  canonical: 'https://bukugraduan.afrieirham.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://bukugraduan.afrieirham.com',
    title,
    description,
    images: [
      {
        url: 'https://bukugraduan.afrieirham.com/og.png',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
}

export default SEO
