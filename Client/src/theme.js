import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    text: {
      main: '#050315',
    },
    background: {
      main: '#ffffff',
      50: '#f2f2f2',
      100: '#e6e6e6',
      200: '#cccccc',
      300: '#b3b3b3',
      400: '#999999',
      500: '#808080',
      600: '#666666',
      700: '#4d4d4d',
      800: '#333333',
      900: '#1a1a1a',
    },
    primary: {
      main: '#0f2f72',
      50: '#e8effc',
      100: '#d2def9',
      200: '#a5bef3',
      300: '#789ded',
      400: '#4a7ce8',
      500: '#1d5ce2',
      600: '#1749b5',
      700: '#123787',
      800: '#0c255a',
      900: '#06122d',
    },
    secondary: {
      main: '#23a9e8',
      50: '#e8f6fd',
      100: '#d1edfa',
      200: '#a3dbf5',
      300: '#75c9f0',
      400: '#46b7ec',
      500: '#18a5e7',
      600: '#1384b9',
      700: '#0f638a',
      800: '#0a425c',
      900: '#05212e',
    },
    accent: {
      main: '#f2a648',
      50: '#fdf3e7',
      100: '#fce8cf',
      200: '#f8d0a0',
      300: '#f5b970',
      400: '#f2a240',
      500: '#ee8b11',
      600: '#bf6f0d',
      700: '#8f530a',
      800: '#5f3707',
      900: '#301c03',
    },
  },
})

// const theme = extendTheme({
//   colors: {
//     brand: {
//       100: "#050315",
//       200: "#f2f4fc",
//       300: "#4961E9",
//       400: "#DEDCFF",
//       500: "#0624D9"
//     },
//   },
// })

export default theme
