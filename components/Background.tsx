import React from 'react';
import { MantineTheme, MantineProvider, Box, useMantineTheme } from '@mantine/core';

// interface Props {
//     children?: React.ReactNode;
// }
type Props = React.PropsWithChildren<{}>;

export const Background: React.FC<Props> = ({children}) => {
    // const {children} = props
    // const theme = useMantineTheme();
    return (
        // <MantineProvider inherit theme={{}}>
        <Box p="xl" sx={(theme: MantineTheme) => (
            {backgroundImage: theme.fn.gradient({from: theme.colors.navy[9], to: theme.colors.navy[6]})}
            )} w="100vw" h="100vh">
            {children}
        </Box>


        // <Box p="xl" bg='navy.9' w="100vw" h="100vh">
        //     {children}
        // </Box>
    )
}

export default Background;