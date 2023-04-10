import { Button, Input, Modal, TextInput, Stack } from '@mantine/core';
import { useEffect, useState } from 'react'
import { showNotification} from "@mantine/notifications";
import {IconAbc, IconAt, IconBallpen, IconCalendarEvent} from '@tabler/icons';
import { useForm } from '@mantine/form';
import jwt from 'jwt-simple'
import { User, Stamp } from '../tstypes/types'
import styles from '../styles/mystyles.module.css'
import {DatePicker} from "@mantine/dates";

interface Props {
    handleViewModalClose: Function,
    handleGetAllUserStamps: Function,
    user: User,
    date: Date
}

export const CreateStampForm: React.FC<Props> = ({user, handleGetAllUserStamps, date, handleViewModalClose}) => {

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            createdAt: date
                // new Date(Date.UTC(2023, 1, 4)),
        },
        validate: {
            title: (value) => (value.length < 2 ? 'Title must have at least two letters' : null),
            content: (value) => (value.length < 2 ? 'Content must have at least two letters' : null),
            // createdAt: (value) => (value === undefined ? 'Stamp must have a date' : null)
        }
    })
    type FormValues = typeof form.values

    async function createStamp(values: FormValues): Promise<any> {
        const stampData: Stamp = {
            title: values.title,
            content: values.content,
            createdAt: new Date(Date.UTC(values.createdAt.getFullYear(), values.createdAt.getMonth(), values.createdAt.getDate())),
            authorId: user.id
        }
        const response = await fetch('../../api/stamp/stampAdd', {
            method: 'POST',
            body: JSON.stringify(stampData)
        })
        if (response.ok) {
            handleGetAllUserStamps(user);
            showNotification({title: 'Success!', message: 'Your stamp was created'})
            form.reset()
            handleViewModalClose();
        }
        else {
            showNotification({title: 'Error!', message: 'An error has occurred during stamp creation'})
            form.reset()
            handleViewModalClose();
        }
        return await response.json()
    }

    useEffect(() => {
        
    }, [])

    return (
        <>
            <form onSubmit={form.onSubmit(createStamp)}>
                <Stack spacing={'xs'}>
                    <TextInput
                        label='Name'
                        icon={<IconBallpen size='22px'/>}
                        placeholder='Stamp Name'
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        icon={<IconAbc size='22px'/>}
                        label='Description'
                        placeholder='Stamp Content...'
                        {...form.getInputProps('content')}
                    />
                    {/* <Input placeholder='Stamp content' mt='lg' {...form.getInputProps('content')}/> */}
                    <DatePicker disabled={true} icon={<IconCalendarEvent size='22px'/>} placeholder={'Pick date'} label='Stamp date' {...form.getInputProps('createdAt')}/>
                    <Button mt="md" className={styles.ButtonStatic} variant='white' color='dark' type='submit'>Submit</Button>
                </Stack>
            </form>
        </>
    )
}

export default CreateStampForm;