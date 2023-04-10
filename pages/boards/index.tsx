import React, {useContext, useEffect, useState} from "react";
import CustomNavbar from "../../components/navbar/CustomNavbar";
import Toolbar from "../../components/toolbar/Toolbar";
import Background from "../../components/Background";
import {ActionIcon, Button, Group, LoadingOverlay, Text, Tooltip} from "@mantine/core";
import {User, Board, BoardsContextType} from "../../tstypes/types";
import jwt from "jwt-simple";
import {useRouter} from "next/router";
import BoardComponent from "../../components/Board";
import {IconCirclePlus} from "@tabler/icons";
import {v4} from "uuid";
import {BoardsContext, TasklistsContext, TasksContext} from "../_app";
import {showNotification} from "@mantine/notifications";
export const BoardsPage: React.FC = () => {
    const [navOverlay, setNavOverlay] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)
    const boards = useContext<BoardsContextType>(BoardsContext)
    const tasklists = useContext(TasklistsContext)
    const tasks = useContext(TasksContext)
    const router = useRouter();

    async function handleAddBoard() {
        const response = await fetch('/api/board/boardAdd', {method: 'POST', body: JSON.stringify(
                {
                    viewId: v4(),
                    title: 'New Board',
                    authorId: user.id
                })
        })
        if (response.ok) {
            await getUserBoards(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during board add, try again'})
        }
        // boards.dispatch({type: 'add', body: {viewId: v4(), title: 'New Board', authorId: user.id}})
    }
    async function handleTitleChange(id, value) {
        const response = await fetch('/api/board/boardUpdate', {method: 'POST', body: JSON.stringify(
                {
                    TYPE: 'TITLECHANGE',
                    viewId: id,
                    title: value,
                    authorId: user.id
                })
        })
        if (response.ok) {
            await getUserBoards(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during title change, try again'})
        }
        // boards.dispatch({type: 'titleChange', body: {viewId: id, title: value, authorId: user.id}})
    }
    async function handleDeleteBoard(id) {
        const response = await fetch('/api/board/boardDelete', {method: 'POST', body: JSON.stringify(
                {
                    viewId: id,
                })
        })
        if (response.ok) {
            await getUserBoards(user)
        }
        else {
            showNotification({title: 'Error', message: 'An error has occurred during board delete, try again'})
        }
        // boards.dispatch({type: 'delete', body: {viewId: id, title: 'doesntmatter', authorId: user.id}})
    }
    async function getUserBoards(user: User) {
        const response = await fetch('/api/board/boardGet', {method: 'POST', body: JSON.stringify(
                {
                    authorId: user.id
                })
        })
        if (response.ok) {
            boards.dispatch({type: 'setBoards', body: await response.json()})
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
            showNotification({title: 'Error', message: 'An error has occurred during tasklist fetch, reload page'})
        }
    }
    useEffect(() => {
        const authToken = localStorage.getItem('authToken')
        if (authToken) {
            const decodedUser: User = jwt.decode(authToken, 'my-secret')
            setUser(decodedUser)
            getUserBoards(decodedUser)
        }
        else {
            router.push('/unauthorized')
        }
    }, [])

    return (
        <Background>
            <CustomNavbar overlay={navOverlay}/>
            <LoadingOverlay visible={loading}/>
            <Toolbar title={'Tablice'}/>
            <Group ml='100px'>
                {boards.state.map((item) => <BoardComponent key={v4()} viewId={item.viewId} title={item.title} handleDeleteBoard={handleDeleteBoard} handleTitleChange={handleTitleChange}/>)}
                <Tooltip label={'Add board'} position={"right"} withArrow={true}>
                    {/*@ts-ignore*/}
                    <ActionIcon onClick={handleAddBoard} size={'lg'} variant={'white'} color={'dark'}>
                        <IconCirclePlus/>
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Background>
    )
}

export default BoardsPage