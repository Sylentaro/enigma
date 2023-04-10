import { useEffect, useState } from "react"
import { Box,  Group, TextInput, Button, Stack, Checkbox, LoadingOverlay, Text, Flex } from "@mantine/core"
import { useForm } from "@mantine/form"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Link from "next/link"
import Background from "../components/Background"
import {showNotification} from "@mantine/notifications";


const LoginForm = () => {
  const router = useRouter()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    if (authToken) {
      router.push("/hub")
    }
    else {
      setVisible(false)
    }
  }, [router])

  const form = useForm({
    initialValues: {
      name: '',
      password: "",
      email: '',
      remember: false
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least two letters' : null),
      password: (value) => (value.length < 6 ? 'Password must have at least six characters' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
    },
  })

  async function login(values) {
    setVisible(true)
    const response = await fetch("/api/login", 
    {
      method: "POST",
      body: JSON.stringify(values)
    })
    // await Cookies.set('authToken', 'test', {expires: 2/24})
    // console.log(Cookies.get('authToken'))
    if (response.ok) {
      const authToken = await response.json()
      await localStorage.setItem("authToken", authToken)
      router.push("/hub")
    }
    else {
      setVisible(false)
        showNotification({title: 'Error', message: 'Login error has occurred'})
    }
    // return await response.json()
  }

  return (
    // <div style={{ width: 400, position: 'relative' }}>
      // <LoadingOverlay visible={visible} overlayBlur={2} />
      <form onSubmit={form.onSubmit(login)}>
        <LoadingOverlay visible={visible} overlayBlur={2} />
      {/* <Stack align="flex-start" spacing="xs"> */}
        
        <TextInput size="md" w="300px" label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput size="md" w="300px" type="password" mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
        <TextInput size="md" w="300px" mt="sm" label="Email" placeholder="Email"
        {...form.getInputProps('email')}
        />
        {/* <Checkbox mt="sm" sx={{userSelect: 'none'}} label="Remember me" {...form.getInputProps('remember')}/> */}
        <Button sx={{userSelect: 'none'}} ml="75px" w="50%" type="submit" mt="sm">
          Log in
        </Button>
        <Link href="/register" >
          <Text color="blue.8" variant="link" mt="sm" size="15px">
            {'Not registered? Create account now!'}
          </Text>
        </Link>
        
      {/* </Stack> */}
      </form>
    // </div>
  )
}

export const LoginPage = () => {
  // const router = useRouter()
  // useEffect(() => {
  //   const authToken = localStorage.getItem("authToken")
  //   if (authToken) {
  //     router.push("/hub")
  //   }
  //   else {

  //   }
  // }, [])
    return (
        <Background>
          <Group align="flex-start" position="center">
            <LoginForm/>
          </Group>
        </Background>
      )
}
export default LoginPage