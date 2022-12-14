import React, {useCallback, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch, useAppSelector} from '../../App/store';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolists-reducer';
import {addTaskTC, deleteTaskTC, TasksStateType, updateTaskTC} from './tasks-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../Components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
type PropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(store => store.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(store => store.tasks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()



    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {

        dispatch(deleteTaskTC(id, todolistId));
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {

        dispatch(addTaskTC(title, todolistId))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [dispatch])

    const ChangeTaskFilter = useCallback((value: FilterValuesType, todolistId: string) => {

        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(id, newTitle)
        dispatch(thunk)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to='/login'/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map((tl) => {
                    let taskForTodolist = tasks[tl.id]

                    return (<Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    demo={demo}
                                    tasks={taskForTodolist}
                                    removeTask={removeTask}
                                    ChangeTaskFilter={ChangeTaskFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>

                        </Grid>

                    )

                })
            }
        </Grid>
    </>
}