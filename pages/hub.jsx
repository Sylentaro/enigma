import { Box, Text, Group, Button, Stack, Flex, LoadingOverlay } from "@mantine/core"
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
    const [loading, setLoading] = useState(true)
    
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
            const decodedUser = jwt.decode(authToken, "my-secret")
            // setUser({id: decodedUser.id, name: decodedUser.name})
            setUser(decodedUser)
            setLoading(false)
        }
        else {
            setUser(null)
            // setLoading(false)
            router.push('/unauthorized', undefined, {shallow: false})
        }
    }, [])

    return (
        <Background>
        <LoadingOverlay visible={loading} overlayBlur={2}/>
        <CustomNavbar overlay={false}/>
        {!loading && 
        (
            <Group ml="100px">
                <Text>Welcome: {user.name}, {user.id}</Text>
                <Button radius="lg" variant="light" onClick={handleLogout}>Log out</Button>
                {/* <Link href="/hub">refresh</Link>
                <Link href="/" shallow={false}>home</Link> */}
            </Group>  
        )} 
        </Background>
    )
}

export default UserHubPage