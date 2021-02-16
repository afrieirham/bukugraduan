import { useState } from 'react'
import useSWR from 'swr'
import { Text, Heading, Box, Input, Button, Flex } from '@chakra-ui/react'

import fetcher from '@/utils/fetcher'
import DashboardShell from '@/components/DashboardShell'
import ListingHits from '@/components/ListingHits'
import PoweredByAlgolia from '@/components/PoweredByAlgolia'

function Home() {
  const [search, setSearch] = useState('')
  const { data } = useSWR(`/api/listings${search ? `?search=${search}` : ''}`, fetcher)

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
      <Box as='form' mt={16} noValidate position='relative' role='search'>
        <Input
          bg='white'
          variant='filled'
          px={8}
          py={10}
          placeholder='Book title that you’re looking for'
          _focus={{ bg: 'white' }}
          type='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          position='absolute'
          right={8}
          top={5}
          size='lg'
          backgroundColor='teal.200'
          color='teal.700'
          _hover={{ bg: 'teal.300' }}
          _active={{ bg: 'teal.400' }}
          type='submit'
        >
          Search
        </Button>
        <Flex justifyContent='flex-end' mt={4}>
          <PoweredByAlgolia />
        </Flex>
      </Box>
      <ListingHits hits={data?.listings} />
    </DashboardShell>
  )
}

export default Home
