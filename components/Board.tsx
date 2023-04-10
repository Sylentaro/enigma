import {Accordion, ActionIcon, Box, Group, Input, Space, Stack, Text, Tooltip} from "@mantine/core";
import {useMantineTheme} from "@mantine/core";
import {IconArrowBigRightLines, IconPencil, IconTrash} from "@tabler/icons";
import { IconChecklist, IconCheckbox } from '@tabler/icons';
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useContext} from "react";
import {TasklistsContext, TasksContext} from "../pages/_app";
import {Task} from "../tstypes/types";

interface Props {
    viewId: string | string [],
    title: string,
    handleDeleteBoard: Function,
    handleTitleChange: Function
}
export const BoardComponent: React.FC<Props> = ({title, viewId, handleDeleteBoard, handleTitleChange}) => {
    const theme = useMantineTheme()
    const router = useRouter()
    const [editTitle, setEditTitle] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const tasklists = useContext(TasklistsContext)
    const tasks = useContext(TasksContext)
    const boardTasks: Task[] = []
    tasklists.state.filter(item => item.boardId === viewId).forEach((item) => {
        tasks.state.filter(element => element.taskListId === item.id).forEach((object) => {
            boardTasks.push(object)
        })
    })
    // referencja dla componentu Input (nazwa Boardu)
    const inputRef = useRef<HTMLInputElement>(null)
    // @ts-ignore
    useEffect(() => {
        //ustawienie focusu na elemencie poprzez ref
        //znak zapytania sprawdza czy wlasciwosc 'current istnieje', jesli tak wywoluje focus()
        inputRef.current?.focus()
    }, [editTitle])
    return (
        <Box sx={{position: 'relative', userSelect: 'none', border: `1px solid ${theme.colors.arctic[1]}`, borderRadius: '2px', }} w={'300px'} h={'150px'} bg={'navy.5'} >
            <Group w={'100%'} h={'100%'}>
            {/*@ts-ignore*/}
            <Stack w={'202px'} h={'100%'} spacing='0px'>
                <Group ml={'10px'} mt={'4px'} position='center'>
                    <Box>
                        {editTitle === true
                            ? (
                                <Input h={'36px'} styles={(theme) => {
                                return {
                                    input: {
                                        textAlign: 'center'
                                    },
                                }
                            }} ref={inputRef} onBlur={() => {
                                if (inputRef.current.value !== null && inputRef.current.value !== '') {
                                    handleTitleChange(viewId, inputRef.current.value);
                                }
                                setEditTitle(false)}
                            } placeholder={title}/>)
                            : (
                                <Box h={'36px'}>
                                <Text size={'lg'} truncate={true}>{title}</Text>
                                <Tooltip label={'Edit title'} position={'top'} withArrow={true}>
                                    <Box onClick={() => {setEditTitle(true)}} sx={{position: 'absolute', top: '4px', right: '90px', '&:hover': {cursor: 'pointer'}}}>
                                        <IconPencil/>
                                    </Box>
                                </Tooltip>
                                </Box>)
                        }
                    </Box>
                </Group>
                {/*@ts-ignore*/}
                <Group ml={'12px'} spacing={'1px'} mt={'16px'} position='center'>
                    <IconChecklist/>
                    <Text>Lists: </Text>
                    <Box ml={'25px'}></Box>
                    <IconCheckbox/>
                    <Text>Tasks: </Text>
                </Group>
                <Text sx={{position: 'absolute', right: '205px', bottom: '35px'}} w={'35px'} truncate={true}>{tasklists.state.filter(item => item.boardId === viewId).length}</Text>
                <Text sx={{position: 'absolute', right: '120px', bottom: '35px'}} w={'35px'} truncate={true}>{boardTasks.length}</Text>
                <Tooltip label={confirmDelete === true ? 'Are you sure?' : 'Delete board'} withArrow={true} position={'right'}>
                    <Box onClick={() => {
                        if (confirmDelete === true) {
                            handleDeleteBoard(viewId)
                        }
                        else (
                            setConfirmDelete(true)
                        )
                    }} sx={{position: 'absolute', bottom: '5px', left: '10px', '&:hover': {cursor: 'pointer'}}}>
                        {/*@ts-ignore*/}
                        {confirmDelete === true ? (<ActionIcon variant={'filled'} color={'red'}><IconTrash/></ActionIcon>) : (<ActionIcon variant={'white'} color={'dark'}><IconTrash/></ActionIcon>)}
                    </Box>
                </Tooltip>
            </Stack>
            <Stack w={'80px'} h={'150px'}>
                <Box onClick={() => {router.push(`/boards/${viewId}`)}} sx={{position: 'absolute', bottom: '0px', '&:hover': {cursor: 'pointer'}}} w={"80px"} h={"149px"} bg={'arctic.1'}>
                    <div style={{position: 'absolute', bottom: '45px', left: '16px'}}>
                        <IconArrowBigRightLines size={'48px'} strokeWidth={'1.0'}/>
                    </div>
                </Box>
            </Stack>
        </Group>
        </Box>
    )
}

export default BoardComponent