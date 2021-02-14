import NextImage from 'next/image'
import NextLink from 'next/link'
import { formatDistance, parseISO } from 'date-fns'
import { Flex, Heading, Text, Badge, LinkBox, LinkOverlay } from '@chakra-ui/react'

import UserInfo from './UserInfo'

function Listing({ id, title, price, condition, description, photoUrl, authorId, createdAt }) {
  return (
    <LinkBox>
      <Flex mt={8} ml='auto' mr='auto' width='full' backgroundColor='white' boxShadow='lg'>
        <NextImage width={325} height={270} src={photoUrl} objectFit='cover' />
        <Flex p={6} width='full' flexDirection='column'>
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
          <Text mt={4} color='gray.500' fontSize='sm'>
            {description}
          </Text>
          <UserInfo authorId={authorId} />
        </Flex>
      </Flex>
    </LinkBox>
  )
}

export default Listing
