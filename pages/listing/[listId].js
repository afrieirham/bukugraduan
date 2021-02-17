import React from 'react'
import NextImage from 'next/image'
import { useRouter } from 'next/router'
import { ChevronLeft } from 'react-feather'
import { formatDistance, parseISO } from 'date-fns'
import { Flex, Button, Avatar, Text, Badge, Heading, Box } from '@chakra-ui/react'

import { useAuth } from '@/utils/auth'
import { withAuthModal } from '@/components/Auth'
import { getAllListings, getListing, getUserDetails } from '@/utils/db-admin'
import DashboardShell from '@/components/DashboardShell'

export async function getStaticProps(context) {
  const { listing } = await getListing(context.params.listId)
  const { user } = await getUserDetails(listing.authorId)
  return {
    props: {
      listing,
      author: user,
    },
    revalidate: 1,
  }
}

export async function getStaticPaths() {
  const { listings } = await getAllListings()
  const paths = listings.map((list) => ({
    params: {
      listId: list.id,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

function ListingPage({ openAuthModal, listing, author }) {
  const router = useRouter()
  const { user } = useAuth()

  const onClick = () => {
    if (!user) {
      openAuthModal()
    }
  }

  return (
    <DashboardShell>
      <Flex mt={{ base: 4, md: 12 }} mb={{ base: 4, md: 8 }}>
        <Button
          variant='link'
          leftIcon={<ChevronLeft size='20' />}
          onClick={() => router.push('/')}
        >
          back to Home
        </Button>
      </Flex>
      <Flex width='100%' maxWidth='900px' mx='auto' direction={{ base: 'column', md: 'row' }}>
        <Flex direction='column' alignItems='center'>
          <Box
            width={{ base: '250px', md: '300px' }}
            height={{ base: '350px', md: '380px' }}
            boxShadow={{ base: 'lg', md: 'none' }}
            position='relative'
          >
            <NextImage layout='fill' src={listing?.photoUrl} objectFit='cover' />
          </Box>
        </Flex>
        <Flex
          width='full'
          flexDirection='column'
          bg='white'
          p={6}
          ml={{ base: 0, md: 8 }}
          mt={{ base: 8, md: 0 }}
        >
          <Flex justifyContent='space-between' alignItems='center' mb={{ base: 8, sm: 6 }}>
            <Badge
              variant='subtle'
              colorScheme={listing?.condition === 'used' ? 'orange' : 'green'}
            >
              {listing?.condition}
            </Badge>
            <Text fontSize='xs' color='gray.500'>
              {listing?.createdAt &&
                formatDistance(parseISO(listing.createdAt), new Date(), { addSuffix: true })}
            </Text>
          </Flex>
          <Flex
            justifyContent='space-between'
            alignItems={{ base: 'flex-start', sm: 'center' }}
            mb={8}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Flex justifyContent='center' alignItems='center' mb={{ base: 6, sm: 0 }}>
              <Avatar mr={4} size='md' src={author?.photoUrl} />
              <Flex flexDirection='column'>
                <Text fontWeight='semibold'>{author?.name}</Text>
                <Text color='gray.500' fontSize='sm'>
                  {author?.university}
                </Text>
              </Flex>
            </Flex>
            <Button variant='solid' onClick={onClick} width={{ base: 'full', sm: 'auto' }}>
              Contact Seller
            </Button>
          </Flex>
          <Heading fontSize='xl' as='h1' mb={4}>
            {listing?.title}
          </Heading>
          <Text fontSize='lg' mb={8}>
            {listing?.price ? `RM${listing?.price}` : 'Free'}
          </Text>
          <Text>{listing?.description}</Text>
        </Flex>
      </Flex>
    </DashboardShell>
  )
}

export default withAuthModal(ListingPage)
