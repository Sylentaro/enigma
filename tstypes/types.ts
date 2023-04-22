// export type User = {
//     id: number,
//     name: string
// }
import {Dispatch} from "react";

//Typy kontekstowe i dispatcherów
export type BoardsContextType = {
    state: Board[],
    dispatch: Dispatch<BoardDispatchType>
}
export type BoardDispatchType = {
    type: string,
    body: Board
}

export type TasklistsContextType = {
    state: Tasklist[],
    dispatch: Dispatch<TasklistDispatchType>
}
export type TasklistDispatchType = {
    type: string,
    body: Tasklist
}

export type TasksContextType = {
    state: Task[]
    dispatch: Dispatch<TaskDispatchType>
}
export type TaskDispatchType = {
    type: string,
    body: Task
}
//Typy modelów bazy danych
export type User = {
    id: number,
    name: string,
    password: string,
    email: string
}
export type Stamp = {
    id?: number
    title: string,
    content: string,
    createdAt: Date | string,
    authorId: number
}
export type Subject = {
    id?: number | string[],
    title: string,
    currentGrade: string,
    wantedGrade: string,
    completed: boolean
}
export type Board = {
    id?: number
    viewId?: string[] | string
    title: string,
    authorId: number
}
export type Tasklist = {
    id?: number,
    title: string,
    boardId: number | string | string[],
    authorId: number
}
export type Task = {
    id?: number,
    content: string,
    status: boolean,
    taskListId: number | string,
    authorId: number
}
// export type Stamp = {
//     title: string,
//     content: string,
//     createdAt: Date,
// }