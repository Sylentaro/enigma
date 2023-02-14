import React, { useState, useEffect } from 'react';
import {Button, Divider, Group, MantineTheme, Stack, Box, LoadingOverlay, Indicator} from '@mantine/core'
import { Calendar, DatePicker } from '@mantine/dates';
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
    const [userStamps, setUserStamps] = useState<Stamp[]>([])
    const [dateStamps, setDateStamps] = useState<Stamp[]>([])
    const [navOverlay, setNavOverlay] = useState<boolean>(false);
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)
    const [openedViewModal, setOpenedViewModal] = useState(false)

    const router = useRouter()

    async function handleChangeCalendarValue(newDate: Date): Promise<any> {
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
            setDateStamps(fetchedStamps)
            setOpenedViewModal(true)
            setNavOverlay(true)
        }
        else {
            alert('error')
        }
    }
    async function getAllUserStamps(user: User): Promise<any> {
        //pobranie wszystkich stampów dla usera z parametru
        //ustawienie stampów w useState 'UserStamps'
        const response = await fetch('/api/stampGet', {method: 'POST', body: JSON.stringify(
                {
                    createdAt: 'ALL',
                    authorId: user.id,
                })
        })
        if (response.ok) {
            setUserStamps(await response.json());
            setLoading(false)
            setNavOverlay(false)
        }
        else {
            alert('error getting user stamps')
        }
    }
    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        if (authToken) {
            const decodedUser: User = jwt.decode(authToken, 'my-secret')
            setUser(decodedUser)
            getAllUserStamps(decodedUser)
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
                        <CreateStampModalButton user={user} handleNavOverlay={setNavOverlay} handleGetAllUserStamps={getAllUserStamps}/>
                        <ViewDateModal stamps={dateStamps}
                                       user={user}
                                       date={value}
                                       opened={openedViewModal}
                                       handleNavOverlay={setNavOverlay}
                                       handleOpened={setOpenedViewModal}
                                       setStamps={setDateStamps}
                                       handleGetAllUserStamps={getAllUserStamps}
                        />
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
                        renderDay={(date) => {
                            let display: boolean
                            userStamps.forEach((item) => {
                                const itemDate = new Date(item.createdAt)
                                if (itemDate.getFullYear() === date.getFullYear()) {
                                    if (itemDate.getMonth() === date.getMonth()) {
                                        if (itemDate.getDate() === date.getDate()) {
                                            display = true
                                        }
                                    }
                                }
                                else {
                                    display = false
                                }
                            })
                            return (
                                <Indicator size={8} color='red' offset={8} disabled={!display}>
                                    <div>{date.getDate()}</div>
                                </Indicator>
                            )
                        }}
                    />
                </Group>
        </Background>
    )
}

export default CalendarPage;
