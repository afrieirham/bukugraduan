import { InstantSearch } from 'react-instantsearch-dom'
import { Text, Heading } from '@chakra-ui/react'

import DashboardShell from '@/components/DashboardShell'
import SearchBox from '@/components/SearchBox'
import ListingHits from '@/components/ListingHits'
import { searchClient, INDEX_NAME } from '@/lib/algolia'

function Home() {
  return (
    <DashboardShell maxWidth='1000px'>
      <Heading
        fontSize='5xl'
        fontWeight='bold'
        textAlign='center'
        fontFamily='Playfair Display'
        mt={32}
        as='h1'
        width='900px'
        mx='auto'
      >
        Buy and sell reference books online.
      </Heading>
      <Text textAlign='center' mt={2} width='900px' mx='auto'>
        <i>
          <b>"Buku Graduan"</b>
        </i>{' '}
        is a marketplace for university student’s to buy and sell their reference books once they
        don’t use it anymore. It's still a work-in-progress, but you are welcomed to have a look
        around!
      </Text>
      <InstantSearch indexName={INDEX_NAME} searchClient={searchClient}>
        <SearchBox />
        <ListingHits />
      </InstantSearch>
    </DashboardShell>
  )
}

export default Home
