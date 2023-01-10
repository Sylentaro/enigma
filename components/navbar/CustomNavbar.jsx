import { Center, Flex, Space } from '@mantine/core';
import { useState } from 'react';
import { Button, Group, Box, Overlay, Stack, Navbar} from '@mantine/core';
import NavButton from './NavButton';
import { Icon24Hours } from '@tabler/icons';
import { IconHome2 } from '@tabler/icons'; 

export const CustomNavbar = () => {

    return (

        <Navbar p="sm" bg="gray.9" w="100px" sx={{position: "fixed", top: "0", right: "0"}}>
            <Center>
                <NavButton icon={[<IconHome2 size="22"/>]} tooltip="Strona Główna"/>
            </Center>
            <Navbar.Section mt="lg">
                <Stack spacing="4px" align="center">
                    <NavButton/>
                    <NavButton/>
                    <NavButton/>
                </Stack>
            </Navbar.Section>
        </Navbar>
      
    )
}

export default CustomNavbar