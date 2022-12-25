import '../styles/globals.css'
import { MantineProvider } from '@mantine/core'

export default function App({ Component, pageProps }) {
  return (
  <MantineProvider theme={{colorScheme: 'dark'}}>
    <Component {...pageProps} />
  </MantineProvider>
  )
}
