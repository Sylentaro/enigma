import { Text, } from "@mantine/core";
import Link from "next/link";
import Background from "../components/Background"

export const UnauthorizedPage: React.FC = () => {
    return (
        <Background>
            <Text>You must be
            <u style={{color: "powderblue"}}> <Link href="/login"> logged in
            </Link>
            </u> to see contents of this page!
            </Text>
                {/* <Flex sx={{'&hover': {color: '#eee', textDecoration: 'underline'}}}>    
                    <Link href="/login">logged in</Link> 
                </Flex> */}
        </Background>
    )
}

export default UnauthorizedPage;