import { Box, Text, Group, Button, Stack, Flex } from "@mantine/core"
import CustomNavbar from "../components/navbar/CustomNavbar";
import cookie from "js-cookie";
// import { Cookies } from "cookies-next"
import jwt from 'jwt-simple'

export async function getServerSideProps({req, res}) {
    // const cookies = new Cookies(context.req.headers.cookie)
    const authToken = req.cookies.authToken
    var user = ''
    if (authToken) {
        const decodedToken = jwt.decode(authToken, "my-secret")
        user = decodedToken.id
    }
    else {
        user = "not found"
    }

    return {
        props: {user,}
    }
}

export const UserHubPage = ({user}) => {
    
    return (
        <Box p="xl" bg="gray.8" w="100vw" h="100vh">
        <CustomNavbar/>
            <Group ml="12vw">
                <Text color="white">Welcome user: {user}</Text>
            </Group>
            {/* </Group>  */}
        </Box>
    )
}

export default UserHubPage