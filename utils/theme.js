import {
  extendTheme,
  theme as defaultTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react'

const brandColor = defaultTheme.colors.green

const semanticTokens = {
  colors: {
    primary: {
      default: 'brand.500',
    },
  },
}

const colors = {
  brand: {
    100: brandColor[100],
    200: brandColor[200],
    300: brandColor[300],
    400: brandColor[400],
    500: brandColor[500],
    600: brandColor[600],
    700: brandColor[700],
    800: brandColor[800],
    900: brandColor[900],
    50: brandColor[50],
  },
}

const fonts = {
  heading: `Poppins, ${defaultTheme.fonts.heading}`,
  body: `Poppins, ${defaultTheme.fonts.body}`,
}

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const components = {
  Link: {
    baseStyle: {
      '&:not(:focus-visible)': {
        boxShadow: 'none',
      },
    },
  },
  Button: {
    baseStyle: {
      _focus: {
        '&:not(:focus-visible)': {
          boxShadow: 'none',
        },
      },
    },
  },
  IconButton: {
    baseStyle: {
      '&:not(:focus-visible)': {
        boxShadow: 'none',
      },
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: 'brand.500',
    },
  },
}

const theme = extendTheme(
  {
    colors,
    fonts,
    config,
    components,
    semanticTokens,
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
  }),
)

export default theme
