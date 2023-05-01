import React, { useState, useEffect } from 'react';
import {
    Button,
    Divider,
    Group,
    MantineTheme,
    Stack,
    Box,
    LoadingOverlay,
    Indicator,
    useMantineTheme
} from '@mantine/core'
import { Calendar, DatePicker } from '@mantine/dates';
import { Background } from "../components/Background"
import { CustomNavbar } from "../components/navbar/CustomNavbar"
import Toolbar from '../components/toolbar/Toolbar';
import CreateStampModalButton from '../components/CreateStampForm';
import ViewDateModal from '../components/modals/ViewDateModal';
import { User, Stamp } from '../tstypes/types';
import jwt from 'jwt-simple'
import { useRouter } from 'next/router';
import {showNotification} from "@mantine/notifications";


interface Props {}
export const CalendarPage: React.FC<Props> = () => {
    const theme = useMantineTheme()
    const [value, setValue] = useState<Date | null>(new Date());
    const [userStamps, setUserStamps] = useState<Stamp[]>([])
    const [dateStamps, setDateStamps] = useState<Stamp[]>([])
    const [navOverlay, setNavOverlay] = useState<boolean>(false);
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)
    const [openedViewModal, setOpenedViewModal] = useState(false)

    const router = useRouter()

    function handleChangeCalendarValue(newDate: Date): void {
        // const dateSql: Date = new Date(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`)
        const dateUTC = new Date(Date.UTC(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()))
        const copy = userStamps.filter((item) => item.createdAt === dateUTC.toISOString())
        setValue(newDate)
        setDateStamps(copy)
        setOpenedViewModal(true)
        setNavOverlay(true)
    }
    async function getAllUserStamps(user: User, initial: boolean): Promise<any> {
        //pobranie wszystkich stampów dla usera z parametru
        //ustawienie stampów w useState 'UserStamps'
        const response = await fetch('/api/stamp/stampGet', {method: 'POST', body: JSON.stringify(
                {
                    createdAt: 'ALL',
                    authorId: user.id,
                })
        })
        if (response.ok) {
            setUserStamps(await response.json());
            if (initial) {
                setLoading(false)
                setNavOverlay(false)
            }
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during stamp fetch, reload page'})
        }
    }
    useEffect(() => {
        const authToken: string = localStorage.getItem('authToken')
        if (authToken) {
            const decodedUser: User = jwt.decode(authToken, 'my-secret')
            setUser(decodedUser)
            getAllUserStamps(decodedUser, true)
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
                <Group ml="0px" align='flex-start' position={'center'}>
                    <Divider orientation='vertical'/>
                        {/*<CreateStampModalButton user={user} handleNavOverlay={setNavOverlay} handleGetAllUserStamps={getAllUserStamps}/>*/}
                        <ViewDateModal stamps={dateStamps}
                                       user={user}
                                       date={value}
                                       opened={openedViewModal}
                                       handleNavOverlay={setNavOverlay}
                                       handleOpened={setOpenedViewModal}
                                       setStamps={setDateStamps}
                                       handleGetAllUserStamps={getAllUserStamps}
                        />
                    <Calendar
                        value={value}
                        onChange={handleChangeCalendarValue}
                        fullWidth = {false}
                        size='xl'
                        styles={(theme: MantineTheme) => (
                            {
                                cell: {
                                //     border: `1px solid ${
                                //     theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
                                // }`,
                                },
                                day: { borderRadius: '15px', height: 70, fontSize: theme.fontSizes.lg,},
                                weekday: { fontSize: theme.fontSizes.lg,
                                },
                                weekdayCell: {
                                    fontSize: theme.fontSizes.xl,
                                    // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
                                    // border: `0px solid ${
                                    //     theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                                    // }`,
                                    height: 70,
                                    borderRadius: '15px',
                                },
                            }
                        )}
                        dayStyle={(date) => {
                            if (date.getDate() === value.getDate() && date.getFullYear() === value.getFullYear() && date.getMonth() === value.getMonth()) {
                                return {backgroundColor: theme.colors.arctic[1], color: 'black'}
                            }
                            else {
                                return null
                            }
                        }}
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
                        weekdayLabelFormat='ddd'
                    />
                    <Divider orientation='vertical'/>
                </Group>
        </Background>
    )
}

export default CalendarPage;
