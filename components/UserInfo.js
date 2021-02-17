import React from 'react'
import useSWR from 'swr'
import { Avatar, Flex, Skeleton, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react'

import fetcher from '@/utils/fetcher'

function UserInfo({ authorId }) {
  const { data } = useSWR(`/api/user/${authorId}`, fetcher)

  if (!data) {
    return (
      <Flex
        alignItems='center'
        position={{ base: 'static', sm: 'absolute' }}
        bottom={{ sm: 0 }}
        mt={{ base: 6 }}
        mb={{ base: 0, sm: 6 }}
      >
        <SkeletonCircle mr={4} size='10' />
        <Flex flexDirection='column'>
          <Skeleton height='10px' width='100px' />
          <Skeleton height='10px' width='100px' mt={2} />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex
      alignItems='center'
      position={{ base: 'static', sm: 'absolute' }}
      bottom={{ sm: 0 }}
      mt={{ base: 6 }}
      mb={{ base: 0, sm: 6 }}
    >
      <Avatar size='sm' mr={{ base: 2, sm: 4 }} src={data?.user?.photoUrl} />
      <Flex flexDirection='column'>
        <Text
          fontWeight='bold'
          fontSize={{ base: 'xs', sm: 'sm' }}
          isTruncated
          noOfLines={{ base: 1, sm: 3 }}
        >
          {data?.user?.name}
        </Text>
        <Text fontSize={{ base: 'xs', sm: 'sm' }} color='gray.500'>
          {data?.user?.university}
        </Text>
      </Flex>
    </Flex>
  )
}

export default UserInfo
