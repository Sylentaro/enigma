import { Box, Text, Group, Button, Stack, Flex } from "@mantine/core"
import { useRouter } from "next/router";
import Link from "next/link";
import CustomNavbar from "../components/navbar/CustomNavbar";
import Background from "../components/Background";
// import cookie from "js-cookie";
// import { Cookies } from "cookies-next"
import jwt from 'jwt-simple'


export async function getServerSideProps({req, res}) {
    // const authToken = getCookie('authToken', {req, res})
    const authToken = req.cookies.authToken
    var user = {}
    if (authToken) {
        const decodedToken = jwt.decode(authToken, "my-secret")
        user = {id: decodedToken.id, name: decodedToken.name}
    }
    else {
        // user = {id: "id not found", name: "name not found"}
        user = null
    }

    return {
        props: {user,}
    }
}

export const UserHubPage = ({user}) => {
    
    const router = useRouter()

    async function handleLogout() {
        const res = await fetch("/api/logout", {method: "POST"})
        if (!res.ok) {
            alert("error has occured: res not ok")
        }
        else {
            router.push('/login', undefined, {shallow: false})
            // location.href = "/hub"
            // location.assign("/hub")
            // location.reload()
            // router.reload()
            
            // await router.push('/', undefined, {shallow: false})
            // router.push('/hub', undefined, {shallow: false})
        }
        return await res.json();
    }

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