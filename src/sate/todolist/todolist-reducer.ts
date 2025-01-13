import {FilterValuesType, initialEXternalData, todolistsType} from "../../mainVersion/associative-array/data/DataApp"
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    cwId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    cwId: string
    title: string
}
export type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    cwId: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleTodolistActionType
    | ChangeFilterTodolistActionType

export const todolistReducer = (state: Array<todolistsType>, action: ActionTypes): Array<todolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todolist => todolist.cwId !== action.cwId);
        case 'ADD-TODOLIST':
            return [{
                cwId: v1(),
                title: action.title,
                filter: 'all',
            }, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.cwId === action.cwId ? {...t, title: action.title} : t);
        case'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.cwId === action.cwId ? {...t, filter: action.filter} : t);
        default:
            throw new Error("i don't understand this action type")
    }
}

export const RemoveTodolistAC = (cwId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', cwId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title}
}
export const ChangeNameTodolistAC = (cwId: string, title: string): ChangeTitleTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        cwId,
        title
    }
}
export const ChangeFilterTodolistAC = (cwId: string, filter: FilterValuesType): ChangeFilterTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        cwId,
        filter
    }
}
