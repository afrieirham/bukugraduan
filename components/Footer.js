import React from 'react'
import { format } from 'date-fns'
import { Flex, Link, Stack, Text } from '@chakra-ui/react'
import { BookOpen } from 'react-feather'

function Footer() {
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      p={16}
      isInline
      spacing={4}
      color='gray.500'
      fontSize='xs'
      fontWeight='semibold'
    >
      <Flex justifyContent='center' alignItems='center'>
        <BookOpen size='20' />
        <Text ml={2}>Buku Graduan &copy; {format(new Date(), 'yyyy')}</Text>
      </Flex>
      <Link
        href='https://www.freeprivacypolicy.com/live/d70c76da-faca-422e-be8e-5d61c7e3e843'
        isExternal
      >
        Privacy
      </Link>
      <Link href='https://instagram.com/bukugraduan' isExternal>
        Instagram
      </Link>
      <Link href='mailto:afrieirham@outlook.com' isExternal>
        Contact
      </Link>
    </Stack>
  )
}

export default Footer
