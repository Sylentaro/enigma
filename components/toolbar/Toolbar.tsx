import {ActionIcon, MantineTheme, Title} from "@mantine/core"
import { Box } from "@mantine/core"
import { Accordion } from "@mantine/core"
import classes from '../../styles/mystyles.module.css'
import {IconArrowLeft} from "@tabler/icons";
import {useRouter} from "next/router";
interface Props {
    title: String,
}

export const Toolbar: React.FC<Props> = (props) => {
    const router = useRouter()
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
            <ActionIcon onClick={() => {
                router.push('/boards')
                {/*@ts-ignore*/}
            }} className={classes.ButtonStatic} sx={{position: 'absolute', bottom: '10px', left: '10px'}} variant={'white'} color={'dark'}>
                <IconArrowLeft/>
            </ActionIcon>
        </Box>
    )
}

export default Toolbar;