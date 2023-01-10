import { Box, Text, Group, Button, Stack, Flex } from "@mantine/core"
import { useRouter } from "next/router";
import Link from "next/link";
import CustomNavbar from "../components/navbar/CustomNavbar";
import Background from "../components/Background";
// import cookie from "js-cookie";
// import { Cookies } from "cookies-next"
import jwt from 'jwt-simple'
import { useEffect, useState } from "react";

export const UserHubPage = () => {
    
    const [user, setUser] = useState(null)
    
    const router = useRouter()

    async function handleLogout() {
        await localStorage.removeItem("authToken")
        router.push('/login', undefined, {shallow: false})
        // location.href = "/hub"
        // location.assign("/hub")
        // location.reload()
        // router.reload()
            
        // await router.push('/', undefined, {shallow: false})
        // router.push('/hub', undefined, {shallow: false})
    }

    useEffect(() => {
        const authToken = localStorage.getItem("authToken")
        if (authToken) {
            const decodedToken = jwt.decode(authToken, "my-secret")
            setUser({id: decodedToken.id, name: decodedToken.name})
        }
        else {
            setUser(null)
        }
    }, [])

    return (
        <>
        {user ? 
        (
        <Background>
            <CustomNavbar/>
                <Group ml="100px">
                    <Text color="white">Welcome: {user.name}, {user.id}</Text>
                    <Button radius="lg" onClick={handleLogout}>Log out</Button>
                    {/* <Link href="/hub">refresh</Link>
                    <Link href="/" shallow={false}>home</Link> */}
                    <div></div>
            </Group>
        </Background>) : 
        (
        <Background>
            <Text color="white">You must be logged in to see contents of this page!</Text>
        </Background>
        )
        }
        </>
    )
}

export default UserHubPage