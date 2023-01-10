import React from 'react';
import { Box } from '@mantine/core';

// interface Props {
//     children?: React.ReactNode;
// }
type Props = React.PropsWithChildren<{}>;

export const Background: React.FC<Props> = ({children}) => {
    // const {children} = props
    return (
        <Box p="xl" bg="dark" w="100vw" h="100vh">
            {children}
        </Box>
    )
}

export default Background;