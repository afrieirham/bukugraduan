import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDropzone } from 'react-dropzone'
import {
  Flex,
  Text,
  Button,
  Heading,
  Image,
  Input,
  Textarea,
  IconButton,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { ChevronLeft, UploadCloud, X } from 'react-feather'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'

import { useAuth } from '@/utils/auth'
import { addBook } from '@/utils/db'

function AddBookForm() {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuth()

  const [preview, setPreview] = useState(null)
  const [previewError, setPreviewError] = useState(false)

  const { handleSubmit, register, errors } = useForm()
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: (acceptedFiles) => setPreview(URL.createObjectURL(acceptedFiles[0])),
  })

  useEffect(() => {
    return () => URL.revokeObjectURL(preview)
  }, [preview])

  const validatePhoto = () => {
    if (!preview) {
      setPreviewError(true)
    }

    return Boolean(preview)
  }

  const onSubmit = async ({ title, price, condition, description }) => {
    if (!validatePhoto()) return

    const newBooklist = {
      title,
      price: Number(price),
      condition,
      description,
      isSold: false,
      authorId: user.uid,
      authorName: user.name,
      authorUniversity: 'Universiti Malaya',
      authorContact: 'https://wa.me/60132661223',
      createdAt: new Date().toISOString(),
    }

    // Store in db
    await addBook(newBooklist)

    toast({
      title: 'Success!',
      description: "We've added your book in the listings.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    })

    mutate(['/api/booklist', user.token], null, false)
    router.push('/booklist')
  }

  return (
    <>
      <Flex mt={6} mb={4}>
        <Button leftIcon={<ChevronLeft size='20' />} variant='link' onClick={() => router.back()}>
          back
        </Button>
      </Flex>
      <Flex flexDirection='column'>
        <Heading>Tell us what you're listing</Heading>
        <Flex mt={4} bg='white' py={8} borderRadius='8px'>
          <Flex width='50%' pl={8} pr={4} {...getRootProps({ className: 'dropzone' })}>
            {preview ? (
              <Flex
                height='600px'
                width='full'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
              >
                <Image
                  src={preview}
                  objectFit='cover'
                  height='500px'
                  width='full'
                  mb={2}
                  borderRadius='4px'
                />
                <IconButton
                  aria-label='Delete photo'
                  icon={<X />}
                  onClick={() => setPreview(null)}
                />
              </Flex>
            ) : (
              <Flex
                height='500px'
                width='full'
                bg='gray.100'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                borderRadius='4px'
                border={previewError && '3px red solid'}
              >
                <input {...getInputProps()} />
                <Flex justifyContent='center' mb={2}>
                  <Button
                    py={6}
                    backgroundColor='teal.200'
                    color='teal.800'
                    _hover={{ bg: 'teal.300' }}
                    _active={{ bg: 'teal.400' }}
                    leftIcon={<UploadCloud size='20' />}
                  >
                    Upload a photo
                  </Button>
                </Flex>
                <Text fontWeight='semibold' size='sm'>
                  or drag here
                </Text>
              </Flex>
            )}
          </Flex>
          <Flex
            as='form'
            onSubmit={handleSubmit(onSubmit)}
            autoComplete='off'
            flexDirection='column'
            width='50%'
            pr={8}
            pl={4}
          >
            <Text fontWeight='semibold'>Book Title</Text>
            <Input
              variant='outline'
              placeholder='Web Development for Dummies'
              name='title'
              ref={register({ required: true })}
              isInvalid={!!errors.title}
            />
            <Text mt={6} fontWeight='semibold'>
              Price
            </Text>
            <InputGroup>
              <InputLeftAddon children='RM' />
              <Input
                type='number'
                placeholder='19.90'
                step='0.01'
                name='price'
                ref={register({ required: true })}
                isInvalid={!!errors.price}
              />
            </InputGroup>
            <Text mt={6} fontWeight='semibold'>
              Condition
            </Text>
            <RadioGroup defaultValue='used'>
              <Stack spacing={5} direction='row'>
                <Radio value='used' colorScheme='teal' name='condition' ref={register}>
                  Used
                </Radio>
                <Radio value='new' colorScheme='teal' name='condition' ref={register}>
                  New
                </Radio>
              </Stack>
            </RadioGroup>
            <Text mt={6} fontWeight='semibold'>
              Description
            </Text>
            <Textarea
              rows='5'
              placeholder={`You can put any extra info here such as meeting place or shipping method. \n\nThe book’s description would be fine too.`}
              name='description'
              ref={register}
            />
            <Flex justifyContent='flex-end' width='full' mt={6}>
              <Button
                type='submit'
                backgroundColor='teal.200'
                color='teal.800'
                _hover={{ bg: 'teal.300' }}
                _active={{ bg: 'teal.400' }}
              >
                List Now
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}

export default AddBookForm
