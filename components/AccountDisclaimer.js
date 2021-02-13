import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

function AccountDisclaimer() {
  return (
    <Flex flexDirection='column' width='full' backgroundColor='white' boxShadow='md' mt={8}>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        backgroundColor='gray.50'
        borderBottom='1px solid'
        borderBottomColor='gray.200'
        p={4}
      >
        <Text textTransform='uppercase' fontSize='xs' color='gray.500' fontWeight='semibold'>
          Disclaimer
        </Text>
      </Flex>
      <Box p={4}>
        <Text>
          <b>Buku Graduan</b> requires you to add your phone number for contact purposes. In order
          to protect your privacy, we will only show your phone number once the user is logged in.
          We'll never share your private information with anyone else.
        </Text>
        <Text mt={4}>
          At the moment, only WhatsApp are supported. We will add more platform in the future.
        </Text>
      </Box>
    </Flex>
  )
}

export default AccountDisclaimer
