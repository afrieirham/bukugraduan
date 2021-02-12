import { Text, Button, Input, Box, Heading } from '@chakra-ui/react'

import DashboardShell from '@/components/DashboardShell'

function Home() {
  return (
    <DashboardShell>
      <Heading
        fontSize='5xl'
        fontWeight='bold'
        textAlign='center'
        fontFamily='Playfair Display'
        mt={32}
        as='h1'
      >
        Buy and sell reference books online.
      </Heading>
      <Text textAlign='center' mt={2}>
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
    </DashboardShell>
  )
}

export default Home
