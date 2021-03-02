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
        height={{
          sm: '250px',
          md: '300px',
        }}
        backgroundColor='white'
        boxShadow='lg'
        _hover={{ shadow: '2xl' }}
        direction={{ base: 'column', sm: 'row' }}
      >
        <Flex direction='column' alignItems='center' p={{ base: 6, sm: 0 }}>
          <Box
            width={{
              base: '150px',
              sm: '200px',
              md: '220px',
            }}
            height={{
              base: '200px',
              sm: 'full',
            }}
            position='relative'
            boxShadow={{ base: 'xl', sm: 'none' }}
          >
            <NextImage layout='fill' src={photoUrl} objectFit='cover' />
          </Box>
        </Flex>
        <Flex
          p={{
            base: 6,
            md: 6,
          }}
          width='full'
          height='full'
          flexDirection='column'
          position='relative'
        >
          <Flex justifyContent='space-between' alignItems='center'>
            <Badge variant='subtle' colorScheme={condition === 'used' ? 'orange' : 'green'}>
              {condition}
            </Badge>
            <Text fontSize='xs' color='gray.500'>
              {formatDistance(parseISO(createdAt), new Date(), { addSuffix: true })}
            </Text>
          </Flex>
          <Heading
            as='h3'
            fontSize={{
              base: 'sm',
              sm: 'lg',
              md: 'xl',
            }}
            mt={{
              base: 4,
              md: 6,
            }}
            isTruncated
            noOfLines={2}
          >
            <NextLink href={`/listing/${id}`} passHref>
              <LinkOverlay>{title}</LinkOverlay>
            </NextLink>
          </Heading>
          <Text
            mt={1}
            color='gray.700'
            fontSize={{
              base: 'sm',
              md: 'md',
            }}
          >
            {price ? `RM${price}` : 'Free'}
          </Text>
          <Text
            mt={4}
            color='gray.500'
            fontSize={{ base: 'xs', sm: 'sm' }}
            isTruncated
            noOfLines={3}
            whiteSpace='pre-wrap'
          >
            {description}
          </Text>
          <UserInfo authorId={authorId} />
        </Flex>
      </Flex>
    </LinkBox>
  )
}

export default Listing
