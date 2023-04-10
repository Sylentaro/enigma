import {useEffect, useRef, useState} from 'react'
import {
    Modal,
    Title,
    Text,
    Box,
    Divider,
    Accordion,
    Space,
    Group,
    ActionIcon,
    Button,
    Tabs,
    MantineTheme, Menu, Popover, TextInput, Input
} from '@mantine/core';
import {useMantineTheme} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
    IconTrash,
    Icon123,
    IconSettings,
    IconPhoto,
    IconMessageCircle,
    IconSearch,
    IconArrowsLeftRight,
    IconPencil, IconBallpen, IconAbc, IconCheck, IconCircleCheck
} from '@tabler/icons';
import jwt from 'jwt-simple'
import { Stamp, User } from '../../tstypes/types'
import CreateStampForm from "../CreateStampForm";
import styles from '../../styles/mystyles.module.css'

interface Props {
    handleNavOverlay: Function
    opened: boolean,
    handleOpened: Function
    setStamps: Function
    handleGetAllUserStamps: Function
    stamps: Stamp[]
    user: User
    date: Date
}
export const ViewDateModal: React.FC<Props> = ({stamps, date, user, opened, handleNavOverlay, handleOpened, setStamps, handleGetAllUserStamps}) => {
    const [activeTab, setActiveTab] = useState<string | null>('view');
    const [activeAccordion, setActiveAccordion] = useState([])
    const [edit, setEdit] = useState([])
    const inputRef = useRef(null)
    function handleSetEditAccordion(value, index) {
        setEdit(edit.map((item, idx) => {
                if (idx === index) {
                    return value
                }
                return item
            }
        ))
    }
    function editDefaultValue() {
        setEdit(stamps.map(item => ''))
    }
    function handleSetActiveAccordion(value, index) {
        setActiveAccordion(activeAccordion.map((item, idx) => {
            if (idx === index) {
                return value
            }
            return item
        }
        ))
    }
    function handleInitialAccordionState() {
        setActiveAccordion(stamps.map(item => null))
    }
    const theme = useMantineTheme()

    async function deleteStamp(id: number) {
        const response = await fetch('../../api/stamp/stampDelete', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
        if (response.ok) {
            handleInitialAccordionState()
            updateStamps(id, 'delete');
            handleGetAllUserStamps(user.id, false)
            showNotification({title: 'Success!', message: 'Your stamp was deleted'})
        }
        else {
            showNotification({title: 'Error!', message: 'An error has occurred during stamp delete'})
        }
    }
    async function titleChangeStamp(id: number, value) {
        const response = await fetch('../../api/stamp/stampUpdate', {
            method: 'POST',
            body: JSON.stringify({
                TYPE: 'TITLECHANGE',
                id: id,
                title: value
            })
        })
        if (response.ok) {
            // handleInitialState();
            handleInitialAccordionState();
            updateStamps(id, 'title', value);
            handleGetAllUserStamps(user.id, false)
            showNotification({title: 'Success!', message: 'Your stamp was updated'})
        }
        else {
            showNotification({title: 'Error!', message: 'An error has occurred during stamp update'})
        }
    }
    async function contentChangeStamp(id: number, value) {
        const response = await fetch('../../api/stamp/stampUpdate', {
            method: 'POST',
            body: JSON.stringify({
                TYPE: 'CONTENTCHANGE',
                id: id,
                content: value
            })
        })
        if (response.ok) {
            // handleInitialState();
            updateStamps(id, 'content', value);
            handleGetAllUserStamps(user.id, false)
            showNotification({title: 'Success!', message: 'Your stamp was updated'})
        }
        else {
            showNotification({title: 'Error!', message: 'An error has occurred during stamp update'})
        }
    }
    function updateStamps(index: number, type: string, value?: string) {
        const copy = [...stamps]
        if (type === 'delete') {
            const array = copy.filter((item) => {
                return item.id !== index
            })
            setStamps(array)
        }
        else if (type === 'title') {
            const array = copy.map((item) => {
                if (item.id === index) {
                    return {...item, title: value}
                }
                return {...item}
            })
            setStamps(array)
        }
        else if (type === 'content') {
            const array = copy.map((item) => {
                if (item.id === index) {
                    return {...item, content: value}
                }
                return {...item}
            })
            setStamps(array)
        }
    }
    function handleModalClose() {
        handleOpened(false);
        handleNavOverlay(false);
        // setActiveTab('view')
        // handleInitialAccordionState()
    }
    useEffect(() => {
        handleInitialAccordionState();
        editDefaultValue();
        setActiveTab('view')
    }, [opened])

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit])

    return (
        <>
            <Modal styles={(theme) => ({
                modal: {
                    // backgroundColor: theme.colors.navy[5]
                    backgroundImage: theme.fn.gradient({from: theme.colors.navy[8], to: theme.colors.navy[7]}),
                    border: `1px solid ${theme.colors.arctic[1]}`,
                    borderRadius: '10px'
                },
                body: {

                },
            })}
             opened={opened} onClose={handleModalClose} title="View Stamps" >
                {/* <Title size="h4">{`Stamps on: ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} (${date.getDay()})`}</Title>  */}
                <Tabs value={activeTab} onTabChange={setActiveTab} color={'arctic.1'}>
                    <Tabs.List position='center' grow={true}>
                        <Tabs.Tab value='view'>View Stamps</Tabs.Tab>
                        <Tabs.Tab value='create'>Create Stamp</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value='view'>
                        <Space h='xs'/>
                        <Title size="h4">{`Stamps on: ${date.toLocaleDateString()} (${date.toLocaleDateString(undefined, {weekday: 'long'})})`}</Title>
                        <Space h='xs'/>
                        {stamps.length === 0 ? (<><Text>No stamps on this date, <Text sx={{cursor: 'pointer'}} span c="blue" td={'underline'} onClick={() => {setActiveTab('create')}} inherit>create</Text> one now!</Text>
                                {/*<CreateStampModalButton handleNavOverlay={} handleGetAllUserStamps={} user={}   */}
                            </>)
                            : (stamps.map((item, index) => (
                                <Box key={index}>
                                    <Group position='center' align='flex-start'>
                                        <Accordion w='85%' value={activeAccordion[index]} onChange={(value) => {
                                            if(edit[index] === '') {
                                                handleSetActiveAccordion(value, index)
                                                // console.log('e')
                                            }
                                        }}>
                                            <Accordion.Item value="stamp">
                                                <Accordion.Control>
                                                    <Group position={'apart'}>
                                                        {edit[index] !== 'title' ? item.title : (<>
                                                            <Input ref={inputRef}/>
                                                            <IconCircleCheck onClick={async () => {
                                                                if (inputRef.current.value !== null && inputRef.current.value !== '') {
                                                                    await titleChangeStamp(item.id, inputRef.current.value);
                                                                }
                                                                handleSetEditAccordion('', index);
                                                            }
                                                            }/>
                                                        </>)}
                                                    </Group>
                                                </Accordion.Control>
                                                <Accordion.Panel>{edit[index] === 'content' ? item.content : (<>
                                                    <Input ref={inputRef}/>
                                                    <IconCircleCheck onClick={async () => {
                                                        if (inputRef.current.value !== null && inputRef.current.value !== '') {
                                                            await contentChangeStamp(item.id, inputRef.current.value);
                                                        }
                                                        handleSetEditAccordion('', index);
                                                    }
                                                    }/>
                                                </>)}</Accordion.Panel>
                                            </Accordion.Item>
                                        </Accordion>
                                        <Menu styles={(theme) => {
                                            return {
                                                // divider: {
                                                //     backgroundColor: theme.colors.arctic[1]
                                                // },
                                            }
                                        }} shadow="md" width={200} position={'bottom'}>
                                            <Menu.Target>
                                                <ActionIcon>
                                                    <IconPencil/>
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Label>Edit...</Menu.Label>
                                                <Menu.Item onClick={() => {handleSetActiveAccordion('stamp', index); handleSetEditAccordion('title', index);}} icon={<IconBallpen size={16} />}>Stamp Name</Menu.Item>
                                                <Menu.Item onClick={() => {handleSetActiveAccordion('stamp', index); handleSetEditAccordion('content', index);}} icon={<IconAbc size={16} />}>Stamp Content</Menu.Item>
                                                <Menu.Divider />
                                                <Menu.Item color="red" onClick={() => {deleteStamp(item.id)}} icon={<IconTrash size={16} />}>Delete stamp</Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                        {/*{state[index] === 'notclicked' ?*/}
                                        {/*    (<ActionIcon onClick={() => {handleState('clicked', index)}}*/}
                                        {/*        // @ts-expect-error*/}
                                        {/*                 variant='white'*/}
                                        {/*                 color='dark'>*/}
                                        {/*        <IconTrash/>*/}
                                        {/*    </ActionIcon>) :*/}
                                        {/*    (<ActionIcon onClick={() => {deleteStamp(item.id)}} variant='filled' color='red'>*/}
                                        {/*        <IconTrash/>*/}
                                        {/*    </ActionIcon>)*/}
                                        {/*}*/}
                                    </Group>
                                    {/*<Divider mt='sm'/>*/}
                                </Box>
                            )))
                        }
                    </Tabs.Panel>
                    <Tabs.Panel value='create'>
                        <Space h='xs'/>
                        <CreateStampForm handleViewModalClose={handleModalClose} handleGetAllUserStamps={handleGetAllUserStamps} user={user} date={date}/>
                    </Tabs.Panel>
                </Tabs>
            </Modal>
        </>
    )
}

export default ViewDateModal;