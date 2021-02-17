import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { v4 as uuid } from 'uuid'
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
  useBreakpointValue,
} from '@chakra-ui/react'
import { ChevronLeft, Trash, UploadCloud } from 'react-feather'

import { useAuth } from '@/utils/auth'
import { addBook } from '@/utils/db'
import { uploadPhoto } from '@/utils/storage'

function AddBookForm() {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuth()

  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(null)
  const [previewError, setPreviewError] = useState(false)

  const { handleSubmit, register, errors } = useForm()
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setPreview(null)
      setPreview(URL.createObjectURL(acceptedFiles[0]))
      setPhoto(null)
      setPhoto(acceptedFiles[0])
    },
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

  const uploadButtonSize = useBreakpointValue({ base: 'sm', md: 'md' })

  const onSubmit = async ({ title, price, condition, description }) => {
    if (!validatePhoto()) return

    const id = uuid()

    // Upload photo to firebase storage
    const upload = await uploadPhoto(id, photo)
    const photoUrl = await upload.ref.getDownloadURL()

    const newBooklist = {
      title,
      price: Number(price),
      condition,
      description,
      photoUrl,
      isSold: false,
      authorId: user.uid,
      createdAt: new Date().toISOString(),
    }

    // Store listing info in db
    addBook(id, newBooklist)

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
      <Flex mt={{ base: 2, md: 6 }} mb={4}>
        <Button leftIcon={<ChevronLeft size='20' />} variant='link' onClick={() => router.back()}>
          back
        </Button>
      </Flex>
      <Flex flexDirection='column'>
        <Heading as='h1' fontSize={{ base: '2xl', md: '3xl' }}>
          Tell us what you're listing
        </Heading>
        <Flex
          mt={4}
          bg='white'
          p={{ base: 4, md: 8 }}
          borderRadius='8px'
          direction={{ base: 'column', md: 'row' }}
          justifyContent='space-between'
        >
          <Flex
            minWidth={{ base: '250px', md: '250px' }}
            maxWidth={{ base: '250px', md: 'none' }}
            width='48%'
            height={{ base: '400px', md: 'auto' }}
            mx={{ base: 'auto', md: '0' }}
            {...getRootProps()}
          >
            {preview ? (
              <Flex
                height={{ base: 'full', md: '600px' }}
                width='full'
                flexDirection='column'
                alignItems='center'
                justifyContent='flex-start'
              >
                <Image
                  mb={4}
                  width='full'
                  height={{ base: 'full', md: '500px' }}
                  src={preview}
                  objectFit='cover'
                  borderRadius='4px'
                  boxShadow='lg'
                />
                <IconButton
                  aria-label='Delete photo'
                  icon={<Trash size='15' />}
                  onClick={() => setPreview(null)}
                />
              </Flex>
            ) : (
              <Flex
                height={{ base: 'full', md: '500px' }}
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
                    py={{ base: 5, md: 6 }}
                    size={uploadButtonSize}
                    backgroundColor='teal.200'
                    color='teal.800'
                    _hover={{ bg: 'teal.300' }}
                    _active={{ bg: 'teal.400' }}
                    leftIcon={<UploadCloud size='20' />}
                  >
                    Upload a photo
                  </Button>
                </Flex>
                <Text fontWeight='semibold' fontSize={{ base: 'xs', md: 'sm' }}>
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
            width={{ base: 'full', md: '48%' }}
            mx={{ base: 'auto', md: '' }}
            mt={{ base: 16, md: 0 }}
          >
            <Text mb={{ base: 2, md: 0 }} fontWeight='semibold'>
              Book Title
            </Text>
            <Input
              variant='outline'
              placeholder='Web Development for Dummies'
              name='title'
              ref={register({ required: true })}
              isInvalid={!!errors.title}
            />
            <Text mt={6} mb={{ base: 2, md: 0 }} fontWeight='semibold'>
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
            <Text mt={6} mb={{ base: 2, md: 0 }} fontWeight='semibold'>
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
            <Text mt={6} mb={{ base: 2, md: 0 }} fontWeight='semibold'>
              Description
            </Text>
            <Textarea
              rows={7}
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
                width={{ base: 'full', sm: 'auto' }}
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
