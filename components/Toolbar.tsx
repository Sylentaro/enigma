import { MantineTheme, Title } from "@mantine/core"
import { Box } from "@mantine/core"
import { Accordion } from "@mantine/core"
interface Props {
    title: String,
}

export const Toolbar: React.FC<Props> = (props) => {
    return (
        <Box sx={(theme: MantineTheme) => {
            return (
                {
                    backgroundImage: theme.fn.gradient({from: theme.colors.indigo[9], to: theme.colors.blue[9], deg: 360}),
                    position: 'relative',
                    bottom: '25px',
                    left: '75px'
                }
            )
        }
        } w='100vw' h='120px'>
            <Title sx={{userSelect: 'none'}}>
                {props.title}
            </Title>

        </Box>
    )
}

export default Toolbar;