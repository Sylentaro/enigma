import '../styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
    <MantineProvider theme={{colorScheme: 'dark'}}>
      <Component {...pageProps} />
    </MantineProvider>
    </ChakraProvider>
  )
}
