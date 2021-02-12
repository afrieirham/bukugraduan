import { Flex, Text, Button, Stack, Avatar, Input, Box, Link } from '@chakra-ui/react'

import { useAuth } from '@/utils/auth'

export default function Home() {
  const { user } = useAuth()
  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
      backgroundColor='whiteAlpha.50'
    >
      <Flex bg='gray.50' borderTop='8px solid #4FD1C5'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          width='full'
          maxWidth='900px'
          mx='auto'
          py={4}
        >
          <Stack spacing={6} isInline alignItems='center'>
            <Stack spacing={2} isInline justifyContent='flex-start' alignItems='center'>
              +<Text fontWeight='bold'>Buku Graduan</Text>
            </Stack>
            <Link>My Listings</Link>
          </Stack>

          <Button
            variant='ghost'
            size='md'
            leftIcon={<Avatar size='sm' src={user?.photoUrl} mr={2} />}
          >
            Profile
          </Button>
        </Flex>
      </Flex>
      <Flex
        maxWidth='900px'
        width='full'
        ml='auto'
        mr='auto'
        justifyContent='flex-start'
        flexDirection='column'
        alignItems='stretch'
        mt={32}
      >
        <Text fontSize='5xl' fontWeight='bold' textAlign='center' fontFamily='Playfair Display'>
          Buy and sell reference books online.
        </Text>
        <Text textAlign='center' mt={2}>
          <i>
            <b>"Buku Graduan"</b>
          </i>{' '}
          is a marketplace for university student’s to buy and sell their reference books once they
          don’t use it anymore. It's still a work-in-progress, but you are welcomed to have a look
          around!
        </Text>
        <Box mt={16} position='relative'>
          <Input px={8} py={10} variant='filled' placeholder='Book title that you’re looking for' />
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
      </Flex>
    </Flex>
  )
}
