import React from 'react'
import { format } from 'date-fns'
import { Flex, Link, Stack, Text } from '@chakra-ui/react'
import { BookOpen } from 'react-feather'

function Footer() {
  return (
    <Flex
      direction='column'
      width='full'
      justifyContent='center'
      alignItems='center'
      color='gray.500'
      fontSize='xs'
      fontWeight='semibold'
      p={16}
    >
      <Stack justifyContent='center' alignItems='center' isInline spacing={4}>
        <Link
          href='https://www.freeprivacypolicy.com/live/d70c76da-faca-422e-be8e-5d61c7e3e843'
          isExternal
        >
          Privacy
        </Link>
        <Link href='https://forms.gle/hWE9cZXRViMAtFBu8' isExternal>
          Feedback
        </Link>
        <Link href='mailto:afrieirham@outlook.com' isExternal>
          Contact
        </Link>
        <Link href='https://instagram.com/bukugraduan' isExternal>
          Instagram
        </Link>
      </Stack>
    </Flex>
  )
}

export default Footer
