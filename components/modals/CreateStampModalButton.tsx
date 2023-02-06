import { Button, Input, Modal, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react'
import { IconAt } from '@tabler/icons';
import { useForm } from '@mantine/form';
import jwt from 'jwt-simple'
import { User, Stamp, StampData } from '../../tstypes/types'
import styles from '../../styles/mystyles.module.css'

interface Props {
    handleNavOverlay: Function
    user: User
}

export const CreateStampModalButton: React.FC<Props> = ({user, handleNavOverlay}) => {
    // const [user, setUser] = useState<User>({
    //     id: null,
    //     name: null
    // })
    const [opened, setOpened] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            title: '',
            content: '',
            createdAt: new Date(Date.UTC(2023, 1, 4)),     
        },
        validate: {
            title: (value) => (value.length < 2 ? 'Title must have at least two letters' : null),
            content: (value) => (value.length < 2 ? 'Content must have at least two letters' : null)
        }
    })
    type FormValues = typeof form.values

    async function createStamp(values: FormValues): Promise<any> {
        const stampData: StampData = {
            title: values.title,
            content: values.content,
            createdAt: values.createdAt,
            authorId: user.id
        }
        const response = await fetch('../../api/stampAdd', {
            method: 'POST',
            body: JSON.stringify(stampData)
        })
        if (response.ok) {
            alert("stamp created!")
        }
        else {
            alert("error occured")
        }
        return await response.json()
    }

    useEffect(() => {
        
    }, [])

    return (
        <>
            <Modal opened={opened} onClose={() => {setOpened(false), handleNavOverlay(false), form.reset()}} title="Create new Stamp">
                <form onSubmit={form.onSubmit(createStamp)}>
                    <TextInput
                        icon={<IconAt size='22px'/>}
                        placeholder='Stamp Name'
                        {...form.getInputProps('title')}
                    />
                    <TextInput 
                        icon={<IconAt size='22px'/>}
                        placeholder='Stamp Content...'
                        mt="lg"
                        {...form.getInputProps('content')}
                    />

                    {/* <Input placeholder='Stamp content' mt='lg' {...form.getInputProps('content')}/> */}
                
                    <Button mt="md" variant='light' type='submit'>Submit</Button>
                </form>
            </Modal>
            <Button className={styles.btnstatic} variant='white' color='dark' onClick={() => {setOpened(true), handleNavOverlay(true)}}>Create Stamp</Button>
        </>
    )
}

export default CreateStampModalButton;