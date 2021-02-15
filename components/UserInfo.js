import React from 'react'
import useSWR from 'swr'
import { Avatar, Flex, Skeleton, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react'

import fetcher from '@/utils/fetcher'

function UserInfo({ authorId }) {
  const { data } = useSWR(`/api/user/${authorId}`, fetcher)

  if (!data) {
    return (
      <Flex alignItems='center' position='absolute' bottom='0' mb='6'>
        <SkeletonCircle mr={4} size='10' />
        <Flex flexDirection='column'>
          <Skeleton height='10px' width='100px' />
          <Skeleton height='10px' width='100px' mt={2} />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex alignItems='center' position='absolute' bottom='0' mb='6'>
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
