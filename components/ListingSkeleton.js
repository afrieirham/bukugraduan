import NextImage from 'next/image'
import NextLink from 'next/link'
import { formatDistance, parseISO } from 'date-fns'
import {
  Flex,
  Heading,
  Text,
  Badge,
  LinkBox,
  LinkOverlay,
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from '@chakra-ui/react'

import UserInfo from './UserInfo'

function ListingSkeleton() {
  return (
    <Flex
      mt={8}
      mx='auto'
      width='full'
      height='300px'
      backgroundColor='white'
      boxShadow='lg'
      _hover={{ shadow: '2xl' }}
    >
      <Flex direction='column'>
        <Skeleton width='220px' height='full' position='relative' />
      </Flex>
      <Flex p={6} width='full' flexDirection='column' position='relative'>
        <Flex justifyContent='space-between' alignItems='center'>
          <Skeleton height='15px' width='40px' />
          <Skeleton height='10px' width='90px' />
        </Flex>
        <Skeleton mt={6} height='30px' width='200px' />
        <Skeleton mt={2} height='15px' width='50px' />
        <SkeletonText mt={8} noOfLines={3} spacing='2' />
        <Flex alignItems='center' position='absolute' bottom='0' mb='6'>
          <SkeletonCircle mr={4} size='10' />
          <Flex flexDirection='column'>
            <Skeleton height='10px' width='100px' />
            <Skeleton height='10px' width='100px' mt={2} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ListingSkeleton
