import React, {useEffect, useState, useContext} from "react";
import Background from "../../components/Background";
import CustomNavbar from "../../components/navbar/CustomNavbar";
import {ActionIcon, Button, Group, LoadingOverlay, Text, Tooltip} from "@mantine/core";
import Toolbar from "../../components/toolbar/Toolbar";
import {useRouter} from "next/router";
import {Task, Tasklist, User, TasklistsContextType, Board} from "../../tstypes/types";
import jwt from "jwt-simple";
import TasklistComponent from "../../components/Tasklist";
import {IconCirclePlus} from "@tabler/icons";
import {v4} from "uuid";
import {BoardsContext, TasklistsContext, TasksContext} from '../_app'
import {showNotification} from "@mantine/notifications";


export const BoardViewPage: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [navOverlay, setNavoverlay] = useState(false)
    // const [tasklists, setTasklists] = useState<TaskList[]>([])
    const [user, setUser] = useState(null)
    const boards = useContext(BoardsContext)
    const tasklists = useContext<TasklistsContextType>(TasklistsContext)
    const tasks = useContext(TasksContext)
    const router = useRouter();
    // const [boardViewId, setBoardViewId] = useState(null)
    const {boardViewId} = router.query
    const [board, setBoard] = useState<Board>(null)
    // const board = boards.state.find(item => item.viewId === boardViewId)
    async function handleAddTasklist() {
        // const copy = [...tasklists]
        // copy.push({id: v4(), title: 'List name', boardId: boardViewId})
        // setTasklists(copy)
        const response = await fetch('/api/tasklist/tasklistAdd', {method: 'POST', body: JSON.stringify(
                {
                    title: 'List name', boardId: board.id, authorId: user.id
                })
        })
        if (response.ok) {
            await getUserTasklists(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during tasklist add, try again'})
        }
        // tasklists.dispatch({type: 'add', body: {id: v4(), title: 'List name', boardId: boardViewId, height: 100, authorId: user.id}})
    }
    async function handleTitleTasklist(id, value) {
        const response = await fetch('/api/tasklist/tasklistUpdate', {method: 'POST', body: JSON.stringify(
                {
                    TYPE: 'TITLECHANGE', id: id, title: value, boardId: board.id, authorId: user.id
                })
        })
        if (response.ok) {
            await getUserTasklists(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during tasklist update, try again'})
        }
        // tasklists.dispatch({type: 'titleChange', body: {id: id, title: value, boardId: boardViewId, authorId: user.id}})
        // tasklists.dispatch({type: 'test', body: {id: id, title: value, boardId: boardViewId}})
    }
    async function handleDeleteTasklist(id) {
        const response = await fetch('/api/tasklist/tasklistDelete', {method: 'POST', body: JSON.stringify(
                {
                    id: id, title: 'we dont need title', authorId: user.id
                })
        })
        if (response.ok) {
            await getUserTasklists(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during tasklist delete, try again'})
        }
        // tasklists.dispatch({type: 'delete', body: {id: id, title: 'we dont need title', boardId: boardViewId, authorId: user.id}})
    }

    async function getUserBoards(user: User) {
        const response = await fetch('/api/board/boardGet', {method: 'POST', body: JSON.stringify(
                {
                    authorId: user.id
                })
        })
        if (response.ok) {
            const resBody = await response.json()
            boards.dispatch({type: 'setBoards', body: resBody})
            const thisBoard = await resBody.find(item => item.viewId === boardViewId)
            if (thisBoard) {
                setBoard(thisBoard)
            }
            await getUserTasklists(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during board fetch, reload page'})
        }
    }
    async function getUserTasklists(user: User) {
        const response = await fetch('/api/tasklist/tasklistGet', {method: 'POST', body: JSON.stringify(
                {
                    authorId: user.id
                })
        })
        if (response.ok) {
            tasklists.dispatch({type: 'setTasklists', body: await response.json()})
            await getUserTasks(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during tasklist fetch, reload page'})
        }
    }
    async function getUserTasks(user: User) {
        const response = await fetch('/api/task/taskGet', {method: 'POST', body: JSON.stringify(
                {
                    authorId: user.id
                })
        })
        if (response.ok) {
            tasks.dispatch({type: 'setTasks', body: await response.json()})
            setLoading(false)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during task fetch, reload page'})
        }
    }

    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        if (!boardViewId) {
            return;
        }
        else {
            if (authToken) {
                const decodedUser: User = jwt.decode(authToken, 'my-secret')
                setUser(decodedUser)
                getUserBoards(decodedUser)
            }
            else {
                router.push('/unauthorized')
            }
        }
    }, [boardViewId])

    if (!loading) {
        return (
            <Background>
                <CustomNavbar overlay={navOverlay}/>
                <LoadingOverlay visible={loading}/>
                {/*@ts-ignore*/}
                <Toolbar title={board ? board.title : 'Board'}/>
                <Group ml={'100px'} align={'flex-start'}>
                    {board && tasklists.state.filter(item => item.boardId === board.id).map((item: Tasklist, index) => {
                        return (<TasklistComponent key={v4()} user={user} idProp={item.id} title={item.title} handleGetUserTasks={getUserTasks} handleTitleChange={handleTitleTasklist} handleTasklistDelete={handleDeleteTasklist}/>)
                    })}
                    {board ? (
                        <Tooltip position='right' withArrow={true} label={'Add list'}>
                            {/*@ts-ignore*/}
                            <ActionIcon onClick={handleAddTasklist} size={'lg'} variant={'white'} color={'dark'}>
                                <IconCirclePlus/>
                            </ActionIcon>
                        </Tooltip>
                    ) : (
                        <Text>{`Board: '${boardViewId}' does not exist, go back to boards page and select board manually!`}</Text>
                    )}
                </Group>
            </Background>
        )
    }
    else if (loading) {
        return (
            <></>
        )
    }
}
export default BoardViewPage;