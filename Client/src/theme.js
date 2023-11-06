import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  colors: {
    brand: {
      100: "#050315",
      200: "#FBFBFE",
      300: "#4961E9",
      400: "#DEDCFF",
      500: "#0624D9"
    },
  },
})

export default theme