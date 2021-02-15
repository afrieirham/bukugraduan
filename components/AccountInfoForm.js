import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Flex, Input, Stack, Text, useToast } from '@chakra-ui/react'

import { getFirestoreUser, saveUser } from '@/utils/db'
import { useAuth } from '@/utils/auth'

function AccountInfoForm() {
  const { user, signOut } = useAuth()
  const { handleSubmit, register, setValue } = useForm()
  const toast = useToast()

  useEffect(async () => {
    if (user) {
      const { mobile, university } = await getFirestoreUser(user.uid)
      setValue('mobile', mobile)
      setValue('university', university)
    }
  }, [user])

  const onSubmit = (userInfo) => {
    saveUser({ ...userInfo, uid: user.uid })
    toast({
      title: 'Success!',
      description: "You're profile has been updated",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }

  return (
    <Flex flexDirection='column' width='full' backgroundColor='white' boxShadow='md' mt={8}>
      <Flex
        justifyContent='space-between'
        alignItems='center'
        backgroundColor='gray.50'
        borderBottom='1px solid'
        borderBottomColor='gray.200'
        p={4}
      >
        <Text textTransform='uppercase' fontSize='xs' color='gray.500' fontWeight='semibold'>
          Personal Information
        </Text>
      </Flex>
      <Flex direction='column' p={4} as='form' onSubmit={handleSubmit(onSubmit)}>
        <Text fontWeight='semibold' fontSize='sm'>
          Mobile number
        </Text>
        <Input type='text' name='mobile' placeholder='60182731234' ref={register} />
        <Text fontSize='xs' color='gray.600' mt={1}>
          Please include country code
        </Text>
        <Text fontWeight='semibold' fontSize='sm' mt={6}>
          University
        </Text>
        <Input type='text' name='university' placeholder='Universiti Malaya' ref={register} />

        <Stack mt={12} spacing={2} isInline justifyContent='flex-end'>
          <Button variant='ghost' onClick={() => signOut()}>
            Log Out
          </Button>
          <Button
            type='submit'
            backgroundColor='teal.200'
            color='teal.900'
            _hover={{ bg: 'teal.300' }}
            _active={{ bg: 'teal.400' }}
          >
            Update Profile
          </Button>
        </Stack>
      </Flex>
    </Flex>
  )
}

export default AccountInfoForm
