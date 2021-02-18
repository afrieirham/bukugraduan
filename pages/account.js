import React, { useEffect } from 'react'
import Router from 'next/router'
import { Flex, Avatar, Text } from '@chakra-ui/react'

import { useAuth } from '@/utils/auth'
import { useSEO } from '@/hooks/useSEO'
import AccountDisclaimer from '@/components/AccountDisclaimer'
import AccountInfoForm from '@/components/AccountInfoForm'
import DashboardShell from '@/components/DashboardShell'

function Account() {
  const { user } = useAuth()
  const { CustomNextSeo } = useSEO()

  useEffect(() => {
    if (!user) {
      Router.push('/')
    }
  }, [user])

  return (
    <DashboardShell>
      <CustomNextSeo />
      <Flex justifyContent='center' mt={8}>
        <Flex
          flexDirection='column'
          justifyContent='flex-start'
          alignItems='center'
          maxWidth='600px'
          width='full'
        >
          <Avatar size='xl' src={user?.photoUrl} />
          <Text fontSize='4xl' fontWeight='bold' mt={4}>
            {user?.name}
          </Text>
          <Text>{user?.email}</Text>
          <AccountInfoForm />
          <AccountDisclaimer />
        </Flex>
      </Flex>
    </DashboardShell>
  )
}

export default Account
