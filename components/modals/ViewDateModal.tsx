import { useEffect, useState } from 'react'
import { Button, Input, Modal, TextInput, Title, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons';
import jwt from 'jwt-simple'
import { Stamp, User } from '../../tstypes/types'
import styles from '../../styles/mystyles.module.css'

interface Props {
    handleNavOverlay: Function
    opened: boolean,
    handleOpened: Function
    stamps: Stamp[]
    date: Date
}
export const ViewDateModal: React.FC<Props> = ({stamps, date, opened, handleNavOverlay, handleOpened}) => {

    useEffect(() => {
        
    }, [])

    return (
        <>
            <Modal opened={opened} onClose={() => {handleOpened(false), handleNavOverlay(false)}} title="View Stamps">
                {/* <Title size="h4">{`Stamps on: ${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} (${date.getDay()})`}</Title>  */}
                <Title size="h4">{`Stamps on: ${date.toLocaleDateString()} (${date.toLocaleDateString(undefined, {weekday: 'long'})})`}</Title>
                {stamps.map((item, index) => (
                    <Text key={index}>{item.title + ' content: ' +item.content}</Text>
                ))}        
            </Modal>
            {/* <Button className='btnstatic' variant='white' color='dark' onClick={() => {setOpened(true), handleNavOverlay(true)}}>Create Stamp</Button> */}
        </>
    )
}

export default ViewDateModal;