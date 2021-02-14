import { Text, Button, Input, Box, Heading } from '@chakra-ui/react'

import DashboardShell from '@/components/DashboardShell'
import Listing from '@/components/Listing'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

function Home() {
  const { data } = useSWR('/api/listings', fetcher)
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
      <Box mt={16} position='relative'>
        <Input
          bg='white'
          variant='filled'
          px={8}
          py={10}
          placeholder='Book title that you’re looking for'
          _focus={{ bg: 'white' }}
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
        >
          Search
        </Button>
      </Box>
      <Box mt={20} width='800px' mx='auto'>
        <Heading size='sm'>Browse for books 👇🏻</Heading>
        {data?.listings?.map((listing) => (
          <Listing key={listing.id} {...listing} />
        ))}
      </Box>
    </DashboardShell>
  )
}

export default Home
