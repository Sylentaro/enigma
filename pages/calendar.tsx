import { useState, useEffect } from 'react';
import { Button, Divider, Group, MantineTheme, Stack, Box, LoadingOverlay } from '@mantine/core'
import { Calendar } from '@mantine/dates';
import { Background } from "../components/Background"
import { CustomNavbar } from "../components/navbar/CustomNavbar"
import Toolbar from '../components/Toolbar';
import CreateStampModalButton from '../components/modals/CreateStampModalButton';
import ViewDateModal from '../components/modals/ViewDateModal';
import { User, Stamp } from '../tstypes/types';
import jwt from 'jwt-simple'
import { useRouter } from 'next/router';


interface Props {}
export const CalendarPage: React.FC<Props> = () => {
    const [value, setValue] = useState<Date | null>(new Date());
    const [currentDayStamps, setCurrentDayStamps] = useState<Stamp[]>([])
    const [navOverlay, setNavOverlay] = useState<boolean>(true);
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)
    const [openedViewModal, setOpenedViewModal] = useState(false)

    const router = useRouter()

    async function handleChangeCalendarValue(newDate: Date): Promise<any> {
        console.log(newDate)
        setValue(newDate)
        // const dateSql: Date = new Date(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`)
        const dateUTC = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()))
        const response = await fetch('/api/stampGet', {method: 'POST', body: JSON.stringify(
        {
            createdAt: dateUTC,
            authorId: user.id
        })})
        if (response.ok) {
            const fetchedStamps: Stamp[] = await response.json()
            setCurrentDayStamps(fetchedStamps)
            setOpenedViewModal(true)
            setNavOverlay(true)
        }
        else {
            alert('error')
        }
    }

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        if (authToken) {
            const decodedUser: User = jwt.decode(authToken, 'my-secret')
            setUser(decodedUser)
            setLoading(false)
            setNavOverlay(false)
        }
        else {
            router.push('/unauthorized')
        }
    }, [])

    return (
        <Background>
            <CustomNavbar overlay={navOverlay}/>
            <LoadingOverlay visible={loading}/>
            <Toolbar title='Calendar Page'/>
                <Group ml="100px" align='flex-start'>
                    <Divider orientation='vertical'/>
                    <Stack justify='flex-start' align='center'>
                        <CreateStampModalButton user={user} handleNavOverlay={setNavOverlay}/>
                        <ViewDateModal stamps={currentDayStamps} date={value} opened={openedViewModal} 
                        handleNavOverlay={setNavOverlay} handleOpened={setOpenedViewModal}/>
                    </Stack>
                    <Divider orientation='vertical'/>
                    <Calendar 
                        value={value}
                        onChange={handleChangeCalendarValue}
                        fullWidth = {false}
                        size='xl'
                        styles={(theme: MantineTheme) => (
                            {
                                cell: {border: `1px solid ${
                                    theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
                                }`,
                                },
                                day: { borderRadius: 0, height: 70, fontSize: theme.fontSizes.lg },
                                weekday: { fontSize: theme.fontSizes.lg },
                                weekdayCell: {
                                    fontSize: theme.fontSizes.xl,
                                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
                                    border: `1px solid ${
                                        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                                    }`,
                                    height: 70,
                                },
                            }
                        )} 
                    />
                </Group>
        </Background>
    )
}

export default CalendarPage;
