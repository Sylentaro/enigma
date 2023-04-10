import { Center, Flex, Space } from '@mantine/core';
import { useState } from 'react';
import Link from 'next/link'
import { Button, Group, Box, Overlay, Stack, Navbar} from '@mantine/core';
import NavButton from './NavButton';
import {Icon24Hours, IconCalendar, IconChecklist} from '@tabler/icons';
import { IconHome2 } from '@tabler/icons'; 

export const CustomNavbar = ({overlay}) => {
    // const [visible, setVisible] = useState(overlay)
    return (
      <Navbar p="sm" bg="gray.9" w="100px" sx={{position: "fixed", top: "0", right: "0"}}>
            {overlay && <Overlay opacity={0.6} color='#000' zIndex={5}/>}
            <Center>
                <Link href='/hub'>
                    <NavButton icon={<IconHome2 size="22"/>} tooltip="Strona Główna"/>
                </Link>
            </Center>
            <Navbar.Section mt="lg">
                <Stack spacing="8px" align="center">
                    <Link href='/boards'>
                        <NavButton icon={<IconChecklist size="22"/>} tooltip='Tablice'/>
                    </Link>
                    <Link href='/calendar'>
                        <NavButton icon={<IconCalendar size="22"/>} tooltip='Kalendarz'/>
                    </Link>
                    <NavButton/>
                    <NavButton/>
                </Stack>
            </Navbar.Section>
        </Navbar>    
    )
}

export default CustomNavbar