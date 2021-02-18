import { Configure, InstantSearch } from 'react-instantsearch-dom'
import { Text, Heading } from '@chakra-ui/react'

import DashboardShell from '@/components/DashboardShell'
import SearchBox from '@/components/SearchBox'
import ListingHits from '@/components/ListingHits'
import { searchClient, INDEX_NAME } from '@/lib/algolia'

function Home() {
  return (
    <DashboardShell maxWidth='1000px'>
      <Heading
        fontSize={{
          base: '3xl',
          sm: '4xl',
          md: '5xl',
        }}
        fontWeight='bold'
        textAlign='center'
        fontFamily='Playfair Display'
        mt={{
          base: 8,
          sm: 16,
          md: 32,
        }}
        as='h1'
        maxWidth='900px'
        mx='auto'
      >
        Buy and sell reference books online.
      </Heading>
      <Text
        textAlign='center'
        mt={2}
        maxWidth='700px'
        mx='auto'
        fontSize={{
          base: 'sm',
          md: 'md',
        }}
      >
        <i>
          <b>"Buku Graduan"</b>
        </i>{' '}
        is a marketplace for university student’s to buy and sell their reference books once they
        don’t use it anymore.
      </Text>
      <InstantSearch indexName={INDEX_NAME} searchClient={searchClient}>
        <Configure hitsPerPage={10} />
        <SearchBox />
        <ListingHits />
      </InstantSearch>
    </DashboardShell>
  )
}

export default Home
