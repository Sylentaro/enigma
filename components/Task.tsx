import React, {useContext, useRef, useState} from "react";
import {Box, Stack, useMantineTheme, Text, Textarea, Tooltip, Group, Button} from "@mantine/core";
import {IconCircleCheck, IconCircleX, IconTrash} from "@tabler/icons";
import {Task, TasksContextType} from "../tstypes/types";
import {TasksContext} from "../pages/_app";
import classes from '../styles/mystyles.module.css'

interface Props {
    id: number,
    status: boolean,
    content: string,
    handleTaskDelete: Function,
    handleContentChange: Function,
    handleStatusChange: Function,
    tooltips: boolean
}

export const TaskComponent: React.FC<Props> = ({id, status, content, handleTaskDelete, handleContentChange, handleStatusChange, tooltips}) => {
    const theme = useMantineTheme()
    const [contents, setContents] = useState(content)
    // const thisTask: Task = useContext<TasksContextType>(TasksContext).state.find((item) => item.id === id)
    const textAreaRef = useRef(null)
    return (
        <Box key={id} sx={{borderTop: `1px solid ${theme.colors.arctic[1]}`}}>
            <Group mt={'4px'} align={'flex-start'}>
                {status === true ? (<Box className={classes.customScroll} sx={{
                        border: `1px solid ${theme.colors.dark[3]}`,
                        borderRadius: '4px',
                        fontSize: '14px',
                        height: '65px',
                        overflow: 'auto',
                        overflowWrap: 'break-word',
                        width: '275px'
                    }} bg={'teal.8'} p={'8px'}>
                        {contents}
                    </Box>)
                    : <Textarea
                    ref={textAreaRef}
                    placeholder="Autosize with 4 rows max"
                    minRows={1}
                    maxRows={2}
                    autosize={true}
                    value={contents}
                    onBlur={() => {handleContentChange(id, textAreaRef.current.value)}}
                    onChange={(event) => {setContents(textAreaRef.current.value)}}
                    styles={(theme) => (
                        {
                            input: {
                                height: '80px',
                                width: '275px',
                            }
                        }
                    )}
                />
                }
                {/*@ts-ignore*/}
                <Stack spacing={'4px'}>
                    {!status ?
                        (
                            <Tooltip disabled={tooltips} position='bottom' withArrow={true} label={'Mark as complete'}>
                                <Box sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => {handleStatusChange(id, true)}}>
                                    <IconCircleCheck/>
                                </Box>
                            </Tooltip>
                        )
                        :
                        (
                            <Tooltip disabled={tooltips} position='bottom' withArrow={true} label={'Mark as incomplete'}>
                                <Box sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => {handleStatusChange(id, false)}}>
                                    <IconCircleX/>
                                </Box>
                            </Tooltip>
                        )
                    }
                    <Tooltip disabled={tooltips} position='bottom' withArrow={true} label={'Delete task'}>
                        <Box sx={{'&:hover': {cursor: 'pointer'}}} onClick={() => {handleTaskDelete(id)}}>
                            <IconTrash/>
                        </Box>
                    </Tooltip>
                </Stack>
            </Group>
        </Box>
    )
}
export default TaskComponent