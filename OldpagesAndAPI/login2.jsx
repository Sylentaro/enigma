import { Box,  Group, TextInput, Button, Stack, Checkbox } from "@mantine/core"
import { useForm } from "@mantine/form"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import Background from "../components/Background"

const LoginForm = () => {
  const router = useRouter()

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
    
    const response = await fetch("/api/login", 
    {
      method: "POST",
      body: JSON.stringify(values)
    })
    // await Cookies.set('authToken', 'test', {expires: 2/24})
    // console.log(Cookies.get('authToken'))
    if (response.ok) {
      // form.setValues({
      //   name: "",
      //   password: "",
      //   email: "",
      //   remember: false
      // })
      // location.replace("/")
      router.push("/hub")
    }
    else {
      alert("login error has occured")
    }
    return await response.json()
  }

  return (
    <form onSubmit={form.onSubmit(login)}>
      {/* <Stack align="flex-start" spacing="xs"> */}
        <TextInput size="md" w="300px" label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput size="md" w="300px" type="password" mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
        <TextInput size="md" w="300px" mt="sm" label="Email" placeholder="Email"
          {...form.getInputProps('email')}
        />
        <Checkbox mt="sm" sx={{userSelect: 'none'}} label="Remember me" {...form.getInputProps('remember')}/>
        <Button sx={{userSelect: 'none'}} ml="75px" w="50%" type="submit" mt="sm">
          Log in
        </Button>
      {/* </Stack> */}
    </form>
  )
}

export const LoginPage = () => {
    return (
        <Background>
          <Group align="flex-start" position="center">
            <LoginForm/>
          </Group>
        </Background>
      )
}
export default LoginPage