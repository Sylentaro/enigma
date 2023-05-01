import {useEffect, useRef, useState} from 'react'
import {Button, Group, Text, Stack, LoadingOverlay, Grid, useMantineTheme, Box, Table, Input} from '@mantine/core'
import Background from '../components/Background'
import Link from 'next/link'
import Toolbar from "../components/toolbar/Toolbar";
import CustomNavbar from "../components/navbar/CustomNavbar";
import classes from '../styles/mystyles.module.css'
import {IconCircleCheck, IconCirclePlus} from "@tabler/icons";
import {v4} from "uuid";

export const GradelistPage = () => {
    const theme = useMantineTheme()
    const [users, setUsers] = useState([])
    const [editMode, setEditMode] = useState([])
    const [subjects, setSubjects] = useState([])
    const inputRef = useRef<HTMLInputElement>(null)
    function handleAddSubject() {
        setSubjects([...subjects, {id: v4(), title: 'New Subject', currentGrade: 'None', wantedGrade: 'None', completed: false}])
        setEditMode([...editMode, 'none'])
        // handleInitialState()
    }
    function handleDeleteSubject(id) {
        setSubjects(subjects.filter(item => item.id !== id))
        // const copy = [...editMode]
        // copy.pop()
        // setEditMode(copy)
        setEditMode(prev => prev.slice(0, -1));
        // handleInitialState()
    }
    // const elements = [
    //     { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    //     { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
    //     { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    //     { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    //     { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    // ];
    function handleInitialState() {
        const copy = []
        subjects.forEach((item) => {
            copy.push('none')
        })
        setEditMode(copy)
    }
    function changeState(value, idx) {
        setEditMode(editMode.map((item, index) => {
            if (index === idx) {
                return value
            }
            else {
                return item
            }
        }))
    }
    function handleUpdateSubject(id, value, TYPE) {
        setSubjects(subjects.map((item) => {
            if (item.id === id) {
                if (TYPE === 'STATUSCHANGE') {
                    return {...item, completed: value}
                }
                else if (TYPE === 'TITLECHANGE'){
                    return {...item, title: value}
                }
                else if (TYPE === 'CURRENTGRADECHANGE'){
                    return {...item, currentGrade: value}
                }
                else if (TYPE === 'WANTEDGRADECHANGE'){
                    return {...item, wantedGrade: value}
                }
                else {
                    return item
                }
            }
            else {
                return item
            }
        } ))
    }
    const rows = subjects.map((item, index) => (
        <tr style={{backgroundColor: `${item.completed && theme.colors.teal[9]}`, height: '52px'}} key={v4()}>
            <td style={{borderBottom: `1px solid ${theme.colors.arctic[1]}`, borderRight: `1px solid ${theme.colors.arctic[1]}`, textAlign: 'center'}}>
                {editMode[index] === 'title' ? (<Input styles={() => {
                    return {
                        input: {
                            textAlign: 'center'
                        }
                    }
                    }} ref={inputRef} onBlur={() => {
                        // if (inputRef.current.value !== null || inputRef.current.value !== '') {
                        //     await handleUpdateSubject(item.id, inputRef.current.value, "TITLECHANGE")
                        // }
                        changeState('none', index);
                    }}
                    />) :
                    (<Text onClick={() => {changeState('title', index)}} size={"md"}>
                    {item.title}
                    </Text>)
                }
            </td>
            <td style={{borderBottom: `1px solid ${theme.colors.arctic[1]}`, borderRight: `1px solid ${theme.colors.arctic[1]}`, textAlign: 'center'}}>
                {editMode[index] === 'currentGrade' ? (<Input styles={() => {
                        return {
                            input: {
                                textAlign: 'center'
                            }
                        }
                    }} ref={inputRef} onBlur={() => {changeState('none', index)}}/>) :
                    (<Text onClick={() => {changeState('currentGrade', index)}} size={"md"}>
                        {item.currentGrade}
                    </Text>)
                }
            </td>
            <td style={{borderBottom: `1px solid ${theme.colors.arctic[1]}`, borderRight: `1px solid ${theme.colors.arctic[1]}`, textAlign: 'center'}}>
                {editMode[index] === 'wantedGrade' ? (<Input styles={() => {
                        return {
                            input: {
                                textAlign: 'center'
                            }
                        }
                    }} ref={inputRef} onBlur={() => {changeState('none', index)}}/>) :
                    (<Text onClick={() => {changeState('wantedGrade', index)}} size={"md"}>
                        {item.wantedGrade}
                    </Text>)
                }
            </td>
            <td onClick={() => {handleUpdateSubject(item.id, !item.completed, 'STATUSCHANGE')}} style={{borderBottom: `1px solid ${theme.colors.arctic[1]}`, textAlign: 'center', cursor: 'pointer'}}>
                <IconCircleCheck size={'26px'}/>
            </td>
        </tr>
    ));
    useEffect(() => {
        inputRef.current?.focus();
    }, [editMode])
    useEffect(() => {
        handleInitialState();
    }, [])
    return (
        <Background>
            <LoadingOverlay visible={false} overlayBlur={2}/>
            <Toolbar title={'Grade list'}/>
            <CustomNavbar overlay={false}/>
            <Group ml="100px">
                <Box sx={{border: `1px solid ${theme.colors.arctic[1]}`, borderRadius: '2px' }}>
                <Table className={classes.UserSelectNone} w={'800px'} sx={{borderRadius: '1px' ,backgroundColor: theme.colors.navy[6]}}>
                    <thead>
                    <tr>
                        <th style={{borderBottom: `1px solid ${theme.colors.arctic[1]}`, fontSize: '18px',
                            borderRight: `1px solid ${theme.colors.arctic[1]}`,
                            textAlign: 'center', width: '400px'}}>Subject name</th>
                        <th style={{borderBottom: `1px solid ${theme.colors.arctic[1]}`, fontSize: '18px',
                            borderRight: `1px solid ${theme.colors.arctic[1]}`,
                            textAlign: 'center', width: '150px'}}>Current grade</th>
                        <th style={{borderBottom: `1px solid ${theme.colors.arctic[1]}`, fontSize: '18px',
                            borderRight: `1px solid ${theme.colors.arctic[1]}`,
                            textAlign: 'center', width: '150px'}}>Wanted grade</th>
                        <th style={{borderBottom: `1px solid ${theme.colors.arctic[1]}`, fontSize: '18px',
                            textAlign: 'center', width: '100px'}}>Completed</th>
                    </tr>
                    </thead>
                    <tbody>
                        {rows}
                        <tr onClick={handleAddSubject}>
                            <th colSpan={4} className={classes.TableAddRow} style={{textAlign: 'center'}}>
                                <IconCirclePlus size={'26px'}/>
                            </th>
                        </tr>
                    </tbody>
                </Table>
                </Box>
                {/*<Grid columns={34} sx={{border: `1px solid ${theme.colors.arctic[1]}`, borderRadius: '2px', backgroundColor: theme.colors.navy[6]}}>*/}
                {/*    <Grid.Col sx={{borderRight: `1px solid ${theme.colors.arctic[1]}`}} span={16}>*/}
                {/*        <Text align={'center'} className={classes.UserSelectNone}>Subject Name</Text>*/}
                {/*    </Grid.Col>*/}
                {/*    <Grid.Col sx={{borderRight: `1px solid ${theme.colors.arctic[1]}`}} span={7}>*/}
                {/*        <Text align={'center'}  className={classes.UserSelectNone}>Current Grade</Text>*/}
                {/*    </Grid.Col>*/}
                {/*    <Grid.Col sx={{borderRight: `1px solid ${theme.colors.arctic[1]}`}} span={7}>*/}
                {/*        <Text align={'center'} className={classes.UserSelectNone}>Wanted Grade</Text>*/}
                {/*    </Grid.Col>*/}
                {/*    <Grid.Col span={4}>*/}
                {/*        <IconCircleCheck/>*/}
                {/*    </Grid.Col>*/}
                {/*</Grid>*/}
            </Group>
        </Background>
    )
}
export default GradelistPage