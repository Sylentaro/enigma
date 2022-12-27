import { TextInput, Button, Group, Box, Stack, Checkbox} from '@mantine/core';
import { useForm } from '@mantine/form';

const RegisterForm = () => {
    const form = useForm({
        initialValues: {
            name: '',
            password: "",
            email: '',
        },
        validate: {
            name: (value) => (value.length < 2 ? 'Name must have at least two letters' : null),
            password: (value) => (value.length < 6 ? 'Password must have at least six characters' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        },
    });

    async function registerAccount (values) {
        const response = await fetch('api/register', {
            method: 'POST',
            body: JSON.stringify(values)
        })

        if (response.ok) {
            form.setValues({
                name: '',
                password: "",
                email: '',
            })
        }
        else {
            alert("error has occured during register")
        }
        // if (!response.ok) {
        //     throw new Error(response.statusText)
        // }
        return await response.json()
    }
//labelProps={ {style: {color: "white"}}}
    return (
       <form onSubmit={form.onSubmit(registerAccount)}>
        <TextInput size="md" w="300px" label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput size="md" w="300px" type="password" mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
        <TextInput size="md" w="300px" mt="sm" label="Email" placeholder="Email"
          {...form.getInputProps('email')}
        />
        <Button sx={{userSelect: 'none'}} ml="75px" w="50%" type="submit" mt="sm">
          Register
        </Button>
       </form>
    );
}

export const RegisterPage = () => {
    return (
        <Box bg='gray.8' w="100vw" h="100vh" p="xl">
            <Group position='center'>
                <RegisterForm/>
            </Group>
        </Box>
    )
}

export default RegisterPage