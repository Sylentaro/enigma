import { TextInput, Button, Group, Box, Stack, Checkbox, Text, LoadingOverlay} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Background from "../components/Background";
import { showNotification} from "@mantine/notifications";
const RegisterForm = () => {
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
    },[router])

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
        setVisible(true)
        const response = await fetch('api/register', {
            method: 'POST',
            body: JSON.stringify(values)
        })

        if (response.ok) {
            // form.setValues({
            //     name: '',
            //     password: "",
            //     email: '',
            // })
            showNotification({title: 'Success!', message: 'Account was created, now login with your credentials!'})
            await router.push("/login")
        }
        else {
            setVisible(false)
            showNotification({title: 'Error', message: 'An error occurred in account creation'})
        }
        // if (!response.ok) {
        //     throw new Error(response.statusText)
        // }
        return await response.json()
    }
//labelProps={ {style: {color: "white"}}}
    return (
       <form onSubmit={form.onSubmit(registerAccount)}>
        <LoadingOverlay visible={visible} overlayBlur={2}/>
        <TextInput size="md" w="300px" label="Name" placeholder="Name" {...form.getInputProps('name')} />
        <TextInput size="md" w="300px" type="password" mt="sm" label="Password" placeholder="Password" {...form.getInputProps('password')} />
        <TextInput size="md" w="300px" mt="sm" label="Email" placeholder="Email"
          {...form.getInputProps('email')}
        />
        <Button sx={{userSelect: 'none'}} ml="75px" w="50%" type="submit" mt="sm">
          Register
        </Button>
        <Link href="/login">
            <Text color="blue.8" variant="link" mt="sm" size="15px">
            {'Already have an account? Log in!'}
            </Text>
        </Link>
       </form>
    );
}

export const RegisterPage = () => {
    return (
        <Background>
            <Group position='center'>
                <RegisterForm/>
            </Group>
        </Background>
    )
}

export default RegisterPage