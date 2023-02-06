import '../styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }) {
  return (
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'dark', colors: {
        'navy': ['#152ae5','#1325cb','#1121b3','#0f1d9f','#0c1883','#0b1674','#091263','#080f54', '#060c41' ,'#040931']
      }}}>
        <Component {...pageProps} />
      </MantineProvider>   
  )
}
