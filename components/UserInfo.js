import React from 'react'
import { Avatar, Flex, Text } from '@chakra-ui/react'
import useSWR from 'swr'
import fetcher from '@/utils/fetcher'

function UserInfo({ authorId }) {
  const { data } = useSWR(`/api/user/${authorId}`, fetcher)
  return (
    <Flex mt={12} alignItems='center'>
      <Avatar size='sm' mr={4} src={data?.user?.photoUrl} />
      <Flex flexDirection='column'>
        <Text fontWeight='bold' fontSize='sm'>
          {data?.user?.name}
        </Text>
        <Text fontSize='sm' color='gray.500'>
          {data?.user?.university}
        </Text>
      </Flex>
    </Flex>
  )
}

export default UserInfo
