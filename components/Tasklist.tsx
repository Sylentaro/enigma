import React, {useContext, useEffect, useRef, useState} from "react";
import { v4 } from 'uuid';
import {
    Box,
    Stack,
    useMantineTheme,
    Text,
    Group,
    Space,
    Tooltip,
    ActionIcon,
    Divider,
    Input,
    Button
} from "@mantine/core";
import TaskComponent from "./Task";
import {Task, TasklistsContextType, TasksContextType, User} from "../tstypes/types";
import {IconTrash, IconCircleCheck, IconCirclePlus, IconPencil, IconCheckbox} from "@tabler/icons";
import {TasklistsContext, TasksContext} from "../pages/_app";
import {showNotification} from "@mantine/notifications";

interface Props {
    idProp: number | string,
    title: string,
    handleTitleChange: Function
    handleTasklistDelete: Function,
    user: User,
    handleGetUserTasks: Function,
}
export const TasklistComponent: React.FC<Props> = ({user, idProp, title, handleTitleChange, handleTasklistDelete, handleGetUserTasks}) => {
    const theme = useMantineTheme()
    // const tasklists = useContext<TasklistsContextType>(TasklistsContext)
    // const listHeight = tasklists.state[tasklists.state.findIndex((item) => item.id === idProp)].height
    const [editTitle, setEditTitle] = useState(false)
    const tasks = useContext<TasksContextType>(TasksContext)
    const listTasks = useContext<TasksContextType>(TasksContext).state.filter(item => item.taskListId === idProp)
    const listHeight = listTasks.length === 0 ? 100 : listTasks.length * 75 + 100;
    // referencja dla componentu Input (nazwa tasklisty)
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleAddTask() {
        const response = await fetch('/api/task/taskAdd', {method: 'POST', body: JSON.stringify(
                {
                    content: '', status: false, taskListId: idProp, authorId: user.id
                })
        })
        if (response.ok) {
            await handleGetUserTasks(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during task add, try again'})
        }
        // tasks.dispatch({type: 'add', body: {id: v4(), content: '', status: false, taskListId: idProp}})
    }
    async function handleContentChange(id, value) {
        const response = await fetch('/api/task/taskUpdate', {method: 'POST', body: JSON.stringify(
                {
                    TYPE: 'CONTENTCHANGE', id: id, content: value
                })
        })
        if (response.ok) {
            await handleGetUserTasks(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during task update, try again'})
        }
        // tasks.dispatch({type: 'contentChange', body: {id: id, content: value, status: false, taskListId: idProp}})
    }
    async function handleStatusChange(id, value) {
        const response = await fetch('/api/task/taskUpdate', {method: 'POST', body: JSON.stringify(
                {
                    TYPE: 'STATUSCHANGE', id: id, status: value
                })
        })
        if (response.ok) {
            await handleGetUserTasks(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during task update, try again'})
        }
        // tasks.dispatch({type: 'statusChange', body: {id: id, content: '', status: value, taskListId: idProp}})
    }
    async function handleTaskDelete(id) {
        const response = await fetch('/api/task/taskDelete', {method: 'POST', body: JSON.stringify(
                {
                    id: id,
                    TYPE: 'SINGLE'
                })
        })
        if (response.ok) {
            await handleGetUserTasks(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during task delete, try again'})
        }
        // tasks.dispatch({type: 'delete', body: {id: id, content: '', status: false, taskListId: idProp}})
    }
    useEffect(() => {
        //Ustawienie focusu na elemencie poprzez referencję
        inputRef.current?.focus();
    }, [editTitle])

    return (
        <Box sx={{position: 'relative', userSelect: 'none', border: `1px solid ${theme.colors.arctic[1]}`, borderRadius: '2px'}} w={'350px'} h={`${listHeight}px`} bg={'navy.5'} >
            {/*@ts-ignore*/}
            <Stack spacing={'4px'} align={'center'}>
                {editTitle === true ? (<Input h={'40px'} styles={(theme) => {
                    return {
                        input: {
                            textAlign: 'center'
                        },
                    }
                    }} ref={inputRef} onBlur={async () => {
                    if (inputRef.current.value !== null && inputRef.current.value !== '') {
                       await handleTitleChange(idProp, inputRef.current.value);
                    }
                    setEditTitle(false)}
                } placeholder={title}/>) :
                    (<Box h={'40px'}>
                        <Text mt={'2px'} size={'lg'} truncate={true}>
                            {title}
                        </Text>
                            <Tooltip position='top' withArrow={true} label={'Edit title'}>
                                <Box sx={{position: 'absolute', left: '310px', top: '5px', '&:hover': {cursor: 'pointer'}}} onClick={() => {
                                    setEditTitle(true)
                                }}>
                                    <IconPencil/>
                                </Box>
                            </Tooltip>
                        </Box>
                    )}
                {/*{tasks.state.map((item, index) => {*/}
                {/*    if (item.taskListId === idProp) {*/}
                {/*        return (<TaskComponent key={v4()} handleTaskDelete={handleTaskDelete} id={item.id} content={item.content} status={item.status} handleContentChange={handleContentChange} handleStatusChange={handleStatusChange}/>)*/}
                {/*    }*/}
                {/*})}*/}
                {listTasks.map((item, index) => {
                        return (<TaskComponent tooltips={editTitle} key={v4()} handleTaskDelete={handleTaskDelete} id={item.id} content={item.content} status={item.status} handleContentChange={handleContentChange} handleStatusChange={handleStatusChange}/>)
                })}
                <Space h={'xs'}/>
                <Tooltip disabled={editTitle} position='right' withArrow={true} label={'Delete list'}>
                    <Box sx={{position: 'absolute', bottom: '14px', left: '20px', '&:hover': {cursor: 'pointer'}}} onClick={() => {handleTasklistDelete(idProp)}}>
                        <IconTrash/>
                    </Box>
                </Tooltip>
                <Tooltip disabled={editTitle} position='right' withArrow={true} label={'Add task'}>
                    <Box sx={{position: 'absolute', bottom: '14px', '&:hover': {cursor: 'pointer'}}} onClick={handleAddTask}>
                        <IconCirclePlus/>
                    </Box>
                </Tooltip>
                <Tooltip disabled={editTitle} label={'Finished tasks'} withArrow={true} position={"bottom"}>
                <Box sx={{position: 'absolute', bottom: '4px', right: '20px', }}>
                    {/*@ts-ignore*/}
                    <Stack spacing={'1px'} align={'center'}>
                        <IconCheckbox/>
                        <Text>{`${tasks.state.filter(item => item.taskListId === idProp).filter((item) => item.status === true).length}/${tasks.state.filter(item => item.taskListId === idProp).length}`}</Text>
                    </Stack>
                </Box>
                </Tooltip>
            </Stack>
        </Box>
    )
}
export default TasklistComponent