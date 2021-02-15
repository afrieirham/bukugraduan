import NextImage from 'next/image'
import NextLink from 'next/link'
import { formatDistance, parseISO } from 'date-fns'
import { Flex, Heading, Text, Badge, LinkBox, LinkOverlay, Box } from '@chakra-ui/react'

import UserInfo from './UserInfo'

function Listing({ id, title, price, condition, description, photoUrl, authorId, createdAt }) {
  return (
    <LinkBox>
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
          <Box width='220px' height='full' position='relative'>
            <NextImage layout='fill' src={photoUrl} objectFit='cover' />
          </Box>
        </Flex>
        <Flex p={6} width='full' flexDirection='column' position='relative'>
          <Flex justifyContent='space-between' alignItems='center'>
            <Badge variant='subtle' colorScheme={condition === 'used' ? 'orange' : 'green'}>
              {condition}
            </Badge>
            <Text fontSize='xs' color='gray.500'>
              {formatDistance(parseISO(createdAt), new Date(), { addSuffix: true })}
            </Text>
          </Flex>
          <Heading as='h3' size='md' mt={6}>
            <NextLink href={`/listing/${id}`} passHref>
              <LinkOverlay>{title}</LinkOverlay>
            </NextLink>
          </Heading>
          <Text mt={1} color='gray.700'>
            {price ? `RM${price}` : 'Free'}
          </Text>
          <Text mt={4} color='gray.500' fontSize='sm' isTruncated noOfLines={3}>
            {description}
          </Text>
          <UserInfo authorId={authorId} />
        </Flex>
      </Flex>
    </LinkBox>
  )
}

export default Listing
