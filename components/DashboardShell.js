import NextLink from 'next/link'
import { Flex, Button, Stack, Avatar, Link, LinkOverlay, LinkBox } from '@chakra-ui/react'

import { useAuth } from '@/utils/auth'
import { BookOpen } from 'react-feather'

function DashboardShell({ children }) {
  const { user, signInWithGoogle, signOut } = useAuth()

  return (
    <Flex flexDirection='column' justifyContent='center'>
      <Flex bg='white' borderTop='8px solid #4FD1C5'>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          width='full'
          maxWidth='900px'
          mx='auto'
          py={4}
        >
          <Stack spacing={6} isInline alignItems='center'>
            <Stack spacing={2} isInline justifyContent='flex-start' alignItems='center'>
              <NextLink href='/' passHref>
                <Link>
                  <BookOpen />
                </Link>
              </NextLink>
            </Stack>
            <NextLink href='/booklist' passHref>
              <Link>My Booklist</Link>
            </NextLink>
          </Stack>

          {user ? (
            <Stack spacing={4} isInline alignItems='center'>
              <NextLink href='/account' passHref>
                <Link>Account</Link>
              </NextLink>
              <Avatar size='sm' src={user.photoUrl} />
            </Stack>
          ) : (
            <Button size='sm' onClick={() => signInWithGoogle()}>
              Log In
            </Button>
          )}
        </Flex>
      </Flex>
      <Flex minHeight='100vh' bg='gray.100'>
        <Flex
          mx='auto'
          width='full'
          maxWidth='900px'
          flexDirection='column'
          justifyContent='flex-start'
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DashboardShell
