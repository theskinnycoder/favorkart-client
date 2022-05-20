import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useStorage from '~/hooks/use-storage'
import useUser from '~/hooks/use-user'
import ProfileLayout from '~/layouts/ProfileLayout'
import { BASE_API_URL } from '~/utils/constants'
import { getToken } from '~/utils/functions'

export default function CreateNewProductPage() {
  const { user } = useUser()
  const { push } = useRouter()

  useEffect(() => {
    if (!user) push('/auth')
  }, [push, user])

  const toast = useToast()
  const id = 'shop-name-toast'

  useEffect(() => {
    if (!user?.displayName && !toast.isActive(id)) {
      toast({
        id,
        title: 'Aw, Snap!',
        description: 'you need to setup a shop name (display name) first.',
        status: 'info',
        isClosable: true,
        position: 'bottom',
        variant: 'subtle',
      })
      push('/me/profile/edit')
    }
  }, [push, toast, user?.displayName])

  const {
    register: formRegister,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm()
  const { uploadImage } = useStorage(user?.uid)

  async function submitHandler({
    name,
    description,
    countInStock,
    price,
    primaryImage,
  }) {
    const product = {
      name,
      description,
      countInStock: countInStock,
      price,
    }
    const url = await uploadImage(primaryImage[0], 'products')
    const token = getToken()
    await fetch(`${BASE_API_URL}/products`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify({
        ...product,
        primaryImage: url,
      }),
    })
    reset()
    push('/me/profile')
  }

  return (
    <ProfileLayout>
      <VStack
        align='start'
        experimental_spaceY={5}
        w='full'
      >
        <Heading>add a new product.</Heading>
        <VStack
          align='start'
          experimental_spaceY={5}
          as='form'
          onSubmit={handleSubmit(data => submitHandler(data))}
          noValidate
        >
          <FormControl
            isInvalid={errors?.name}
            isRequired
          >
            <FormLabel
              fontWeight='semibold'
              color='primary'
            >
              name
            </FormLabel>
            <InputGroup>
              <Input
                w='lg'
                size='lg'
                {...formRegister('name', {
                  required: {
                    value: true,
                    message: 'name is required.',
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors?.description}
            isRequired
          >
            <FormLabel
              fontWeight='semibold'
              color='primary'
            >
              description
            </FormLabel>
            <InputGroup>
              <Textarea
                w='lg'
                size='lg'
                {...formRegister('description', {
                  required: {
                    value: true,
                    message: 'description is required.',
                  },
                  minLength: {
                    value: 20,
                    message: 'description must be at least 20 characters.',
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.description?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors?.primaryImage}
            isRequired
          >
            <FormLabel
              fontWeight='semibold'
              color='primary'
            >
              primary image
            </FormLabel>
            <InputGroup>
              <Input
                w='lg'
                size='lg'
                variant='unstyled'
                type='file'
                {...formRegister('primaryImage', {
                  required: {
                    value: true,
                    message: 'a primary image is required.',
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>{errors?.primaryImage?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors?.countInStock}
            isRequired
          >
            <FormLabel
              fontWeight='semibold'
              color='primary'
            >
              count in stock
            </FormLabel>
            <InputGroup>
              <NumberInput
                defaultValue={1}
                step={1}
                size='lg'
              >
                <NumberInputField
                  {...formRegister('countInStock', {
                    required: {
                      value: true,
                      message:
                        'please provide how many items of this product you have in stock.',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            <FormErrorMessage>{errors?.countInStock?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={errors?.price}
            isRequired
          >
            <FormLabel
              fontWeight='semibold'
              color='primary'
            >
              price
            </FormLabel>
            <InputGroup>
              <NumberInput
                precision={2}
                step={1}
                size='lg'
              >
                <NumberInputField
                  {...formRegister('price', {
                    required: {
                      value: true,
                      message: 'please provide the price of the product.',
                    },
                  })}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            <FormErrorMessage>{errors?.price?.message}</FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            isDisabled={isSubmitting}
            isLoading={isSubmitting}
            size='lg'
          >
            + add product
          </Button>
        </VStack>
      </VStack>
    </ProfileLayout>
  )
}
