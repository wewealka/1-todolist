import { todolistsType } from "../../mainVersion/associative-array/data/DataApp"

type StateType = {
    age: number
    childrenCount: number
    name: string
}

type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<todolistsType>, action: ActionType):Array<todolistsType> => {
    switch (action.type) {

        default:
            throw new Error("i don't understand this action type")
    }
}