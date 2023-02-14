import { useEffect, useState } from 'react'
import {Modal, Title, Text, Box, Divider, Accordion, Space, Group, ActionIcon} from '@mantine/core';
import { IconTrash, Icon123 } from '@tabler/icons';
import jwt from 'jwt-simple'
import { Stamp, User } from '../../tstypes/types'
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
    const [state, setState] = useState<string[]>([])

    async function deleteStamp(id: number) {
        const response = await fetch('../../api/stampDelete', {
            method: 'POST',
            body: JSON.stringify({
                id: id
            })
        })
        if (response.ok) {
            handleInitialState();
            updateStamps(id);
            handleGetAllUserStamps(user.id)
            alert('stamp deleted')
        }
        else {
            alert('error')
        }
    }
    function handleInitialState() {
        const copy = []
        stamps.forEach((item) => {
            copy.push('notclicked')
        })
        setState(copy)
    }
    function handleState(clicked: string, index: number) {
        const copy = [...state]
        copy[index] = clicked
        setState(copy)
    }
    function updateStamps(index: number) {
        const copy = [...stamps]
        const array = copy.filter((item) => {
            return item.id !== index
        })
        setStamps(array)
    }
    useEffect(() => {
        handleInitialState();
    }, [opened])

    return (
        <>
            <Modal opened={opened} onClose={() => {handleOpened(false); handleNavOverlay(false); handleInitialState();}} title="View Stamps">
                {/* <Title size="h4">{`Stamps on: ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} (${date.getDay()})`}</Title>  */}
                <Title size="h4">{`Stamps on: ${date.toLocaleDateString()} (${date.toLocaleDateString(undefined, {weekday: 'long'})})`}</Title>
                <Space h='xs'/>
                {stamps.map((item, index) => (
                    <Box key={index}>
                        <Group position='center' align='flex-start'>
                        <Accordion w='85%'>
                            <Accordion.Item value="stamp">
                                <Accordion.Control>
                                    <Group>
                                        {item.title}
                                        {/*<ActionIcon variant='filled' color='red'>*/}
                                        {/*    <IconTrash/>*/}
                                        {/*</ActionIcon>*/}
                                    </Group>
                                </Accordion.Control>
                                <Accordion.Panel>{item.content}</Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                            {state[index] === 'notclicked' ?
                            (<ActionIcon onClick={() => {handleState('clicked', index)}}
                                         // @ts-expect-error
                                         variant='white'
                                         color='dark'>
                                <IconTrash/>
                            </ActionIcon>) :
                                (<ActionIcon onClick={() => {deleteStamp(item.id)}} variant='filled' color='red'>
                                    <IconTrash/>
                                </ActionIcon>)
                            }
                            {/*<ActionIcon variant='filled' color='red'>*/}
                            {/*    <IconTrash/>*/}
                            {/*</ActionIcon>*/}
                        </Group>
                        {/*<Divider mt='sm'/>*/}
                    </Box>
                ))}        
            </Modal>
            {/* <Button className='btnstatic' variant='white' color='dark' onClick={() => {setOpened(true), handleNavOverlay(true)}}>Create Stamp</Button> */}
        </>
    )
}

export default ViewDateModal;