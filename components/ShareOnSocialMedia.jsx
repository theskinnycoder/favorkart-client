import {
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import {
  FacebookFilledIcon,
  LinkedInFilledIcon,
  RedditIcon,
  ShareIcon,
  TelegramIcon,
  TwitterFilledIcon,
  WhatsAppIcon,
} from '~/icons'

export default function ShareOnSocialMedia({ path, title, hashtag }) {
  const { isOpen, onClose, onOpen } = useDisclosure()

  return (
    <Popover
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <IconButton
          colorScheme='gray'
          size='lg'
          borderRadius='md'
          onClick={onOpen}
          icon={<ShareIcon />}
        />
      </PopoverTrigger>
      <PopoverContent
        minW='sm'
        mx='auto'
        _focus={{
          outline: 'none',
          boxShadow: 'none',
        }}
      >
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          <Text
            weight='600'
            mb='xs'
          >
            Share this vendor&apos;s profile...
          </Text>
        </PopoverHeader>
        <PopoverBody
          w='full'
          mx='auto'
        >
          <HStack
            mx='auto'
            justify='center'
          >
            {/* Twitter */}
            <TwitterShareButton
              url={`https://favorkart-client.vercel.app${path}`}
              title={title}
            >
              <IconButton
                colorScheme='twitter'
                variant='ghost'
                size='lg'
                radius='md'
              >
                <TwitterFilledIcon />
              </IconButton>
            </TwitterShareButton>

            {/* FaceBook */}
            <FacebookShareButton
              url={`https://favorkart-client.vercel.app${path}`}
              quote={title}
              hashtag={hashtag}
            >
              <IconButton
                colorScheme='facebook'
                variant='ghost'
                size='lg'
                radius='md'
              >
                <FacebookFilledIcon />
              </IconButton>
            </FacebookShareButton>

            {/* Reddit */}
            <RedditShareButton
              url={`https://favorkart-client.vercel.app${path}`}
              title={title}
            >
              <IconButton
                colorScheme='red'
                variant='ghost'
                size='lg'
                radius='md'
              >
                <RedditIcon />
              </IconButton>
            </RedditShareButton>

            {/* WhatsApp */}
            <WhatsappShareButton
              url={`https://favorkart-client.vercel.app${path}`}
              title={title}
              separator='-'
            >
              <IconButton
                colorScheme='whatsapp'
                variant='ghost'
                size='lg'
                radius='md'
              >
                <WhatsAppIcon />
              </IconButton>
            </WhatsappShareButton>

            {/* LinkedIn */}
            <LinkedinShareButton
              url={`https://favorkart-client.vercel.app${path}`}
              title={title}
              summary='Do check out other articles on this blog!'
            >
              <IconButton
                colorScheme='linkedin'
                variant='ghost'
                size='lg'
                radius='md'
              >
                <LinkedInFilledIcon />
              </IconButton>
            </LinkedinShareButton>

            {/* Telegram */}
            <TelegramShareButton
              url={`https://favorkart-client.vercel.app${path}`}
              title={title}
            >
              <IconButton
                colorScheme='telegram'
                variant='ghost'
                size='lg'
                radius='md'
              >
                <TelegramIcon />
              </IconButton>
            </TelegramShareButton>
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
