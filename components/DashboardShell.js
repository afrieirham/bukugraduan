import NextLink from 'next/link'
import { Flex, Button, Stack, Avatar, Link, AvatarBadge } from '@chakra-ui/react'
import { BookOpen } from 'react-feather'

import { useAuth } from '@/utils/auth'
import { withAuthModal } from './Auth'
import Footer from './Footer'

function DashboardShell({ openAuthModal, maxWidth, children }) {
  const { user } = useAuth()

  return (
    <Flex flexDirection='column' justifyContent='center'>
      <Flex bg='white' borderTop='8px solid #4FD1C5'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          width='full'
          maxWidth='900px'
          mx='auto'
          p={4}
        >
          <Stack spacing={6} isInline alignItems='center'>
            <Stack spacing={2} isInline justifyContent='flex-start' alignItems='center'>
              <NextLink href='/' passHref>
                <Link>
                  <BookOpen />
                </Link>
              </NextLink>
            </Stack>
          </Stack>

          {user ? (
            <Stack spacing={4} isInline alignItems='center'>
              <NextLink href='/book-request' passHref>
                <Link fontSize='sm'>Book Request</Link>
              </NextLink>
              <NextLink href='/booklist' passHref>
                <Link fontSize='sm'>My Booklist</Link>
              </NextLink>
              <NextLink href='/account' passHref>
                <Link>
                  <Avatar size='sm' src={user.photoUrl}>
                    {!user.mobile && (
                      <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' />
                    )}
                  </Avatar>
                </Link>
              </NextLink>
            </Stack>
          ) : (
            <Stack spacing={4} isInline alignItems='center'>
              <NextLink href='/book-request' passHref>
                <Link fontSize='sm'>Book Request</Link>
              </NextLink>
              <Button size='sm' onClick={() => openAuthModal()}>
                Log In
              </Button>
            </Stack>
          )}
        </Flex>
      </Flex>
      <Flex minHeight='100vh' bg='gray.100' direction='column'>
        <Flex
          mx='auto'
          width='full'
          maxWidth={maxWidth ?? '900px'}
          flexDirection='column'
          justifyContent='flex-start'
          p={4}
        >
          {children}
        </Flex>
        <Footer />
      </Flex>
    </Flex>
  )
}

export default withAuthModal(DashboardShell)
