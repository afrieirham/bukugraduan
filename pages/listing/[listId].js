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
      <Flex mt={12} mb={8}>
        <Button
          variant='link'
          leftIcon={<ChevronLeft size='20' />}
          onClick={() => router.push('/')}
        >
          back to Home
        </Button>
      </Flex>
      <Flex width='100%' maxWidth='900px' mx='auto'>
        <Flex direction='column'>
          <Box width='350px' height='450px' position='relative'>
            <NextImage layout='fill' src={listing?.photoUrl} objectFit='cover' />
          </Box>
        </Flex>
        <Flex width='full' flexDirection='column' bg='white' p={6} ml={8}>
          <Flex justifyContent='space-between' alignItems='center' mb={6}>
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
          <Flex justifyContent='space-between' alignItems='center' mb={8}>
            <Flex justifyContent='center' alignItems='center'>
              <Avatar mr={4} size='md' src={author?.photoUrl} />
              <Flex flexDirection='column'>
                <Text fontWeight='bold' fontSize='xl'>
                  {author?.name}
                </Text>
                <Text color='gray.500'>{author?.university}</Text>
              </Flex>
            </Flex>
            <Button variant='solid' size='md' onClick={onClick}>
              Contact Seller
            </Button>
          </Flex>
          <Flex mb={4}></Flex>
          <Heading size='lg' as='h1' mb={4}>
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
