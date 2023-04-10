import '../styles/globals.css'
import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from "@mantine/notifications";
import {createContext, useContext, useReducer} from "react";
import {
    Board,
    BoardsContextType,
    BoardDispatchType,
    Task,
    TasksContextType,
    TaskDispatchType,
    Tasklist,
    TasklistsContextType,
    TasklistDispatchType
} from "../tstypes/types";


export const BoardsContext = createContext<BoardsContextType>({state: [], dispatch: ()=>{}});
function boardReducer(state: Board[], action: BoardDispatchType) {
    switch (action.type) {
        case 'add':
            return [...state, action.body]
        case 'delete':
            return state.filter((item) => item.viewId !== action.body.viewId)
        case 'titleChange':
            return state.map((item) => {
                if (item.id === action.body.id) {
                    return {...item, title: action.body.title}
                }
                return item
            })
        case 'setBoards':
            if(Array.isArray(action.body)) {
                // const copy = []
                // copy.push(action.body)
                // return copy
                return [...action.body]
            }
        default:
            return [...state]
    }
}
export const TasklistsContext = createContext<TasklistsContextType>({state: [], dispatch: () => {}});
function tasklistReducer(state: Tasklist[], action: TasklistDispatchType) {
    switch (action.type) {
        case 'add':
            return [...state, action.body]
        case 'delete':
            return state.filter((item) => item.id !== action.body.id)
        case 'titleChange':
            return state.map((item) => {
                if (item.id === action.body.id) {
                    return {...item, title: action.body.title}
                }
                return item
            })
        case 'setTasklists':
            if(Array.isArray(action.body)) {
                // const copy = []
                // copy.push(action.body)
                // return copy
                return [...action.body]
            }
        default:
            return [...state]
    }
}
export const TasksContext = createContext<TasksContextType>({state: [], dispatch: ()=>{}})
function taskReducer(state: Task[], action: TaskDispatchType) {
    switch (action.type) {
        case 'add':
            return [...state, action.body]
        case 'delete':
            return state.filter((item: Task) => item.id !== action.body.id)
        case 'contentChange':
            // return state.map((item: Task) => {
            //     if (item.id === action.body.id) {
            //         return { ...item, content: action.body.content }
            //     }
            //     return item
            // })
            const updatedTaskIndex = state.findIndex((task) => task.id === action.body.id);
            const updatedTask = {
                ...state[updatedTaskIndex],
                content: action.body.content
            };
            const updatedTasks = [...state];
            updatedTasks[updatedTaskIndex] = updatedTask;
            return updatedTasks;
        case 'statusChange':
            return state.map((item: Task) => {
                if (item.id === action.body.id) {
                    return { ...item, status: action.body.status }
                }
                return item
            })
        case 'setTasks':
            if(Array.isArray(action.body)) {
                // const copy = []
                // copy.push(action.body)
                // return copy
                return [...action.body]
            }
        default:
            return [...state]
    }
}
export default function App({ Component, pageProps }) {
    const [boards, boardsDispatch] = useReducer(boardReducer, []);
    const [tasklists, tasklistsDispatch] = useReducer(tasklistReducer, []);
    const [tasks, tasksDispatch] = useReducer(taskReducer, []);

    return (
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'dark', colors: {
        'navy': ['#152ae5','#1325cb','#1121b3','#0f1d9f','#0c1883','#0b1674','#091263','#080f54', '#060c41' ,'#040931'],
        'arctic': ['#ffffff', '#fff9f5']
      }}}>
          <NotificationsProvider>
              <BoardsContext.Provider value={{state: boards, dispatch: boardsDispatch}}>
                  <TasklistsContext.Provider value={{state: tasklists, dispatch: tasklistsDispatch}}>
                      <TasksContext.Provider value={{state: tasks, dispatch: tasksDispatch}}>
                          <Component {...pageProps} />
                      </TasksContext.Provider>
                  </TasklistsContext.Provider>
              </BoardsContext.Provider>
          </NotificationsProvider>
      </MantineProvider>   
  )
}
