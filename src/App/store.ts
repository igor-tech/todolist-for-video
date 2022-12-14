import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux';


import thunkMiddleware, {ThunkDispatch} from 'redux-thunk';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/todolists-reducer';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>


// @ts-ignore
window.store = store
