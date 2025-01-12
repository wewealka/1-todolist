
import { todolistsReducer } from "./todolist-reducer";
import { v1 } from "uuid";
type FilterValuesType = "all" | "active" | "completed";
type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type todolistsType = {
    cwId: string
    title: string
    filter: FilterValuesType
}
const idCreater = () => {
    return v1()
}

const keyListId_1 = idCreater()
const keyListId_2 = idCreater()
const keyListId_3 = idCreater()
const keyListId_4 = idCreater()
const keyListId_5 = idCreater()
const keyListId_6 = idCreater()

const initialEXternalData: Array<todolistsType> = [
    { cwId: keyListId_1, title: "What to learn", filter: 'all' },
    { cwId: keyListId_2, title: "What to buy", filter: 'all' },
    { cwId: keyListId_3, title: "What a Goal", filter: 'all' },
    { cwId: keyListId_4, title: "device_by", filter: 'all' },
    { cwId: keyListId_5, title: "AI make up", filter: 'all' },
    { cwId: keyListId_6, title: "encrypt/decrypt", filter: 'all' },
];

const initialINternalData = {
    [keyListId_1]: [
        { id: v1(), title: "HTML", isDone: true },
        { id: v1(), title: "CSS", isDone: true },
        { id: v1(), title: "JS/TS", isDone: false },
        { id: v1(), title: "Redux", isDone: false }
    ],
    [keyListId_2]: [
        { id: v1(), title: "Cola", isDone: false },
        { id: v1(), title: "Whiskey", isDone: false },
        { id: v1(), title: "Ice", isDone: false },
    ],
    [keyListId_3]: [
        { id: v1(), title: "Comp", isDone: false },
        { id: v1(), title: "Mouse", isDone: false },
        { id: v1(), title: "Keyboard", isDone: false },
    ],
    [keyListId_4]: [
        { id: v1(), title: "Main", isDone: false },
        { id: v1(), title: "Contacts", isDone: false },
        { id: v1(), title: "Header", isDone: false },
        { id: v1(), title: "About us", isDone: false },
        { id: v1(), title: "Store", isDone: false },
    ],
    [keyListId_5]: [
        { id: v1(), title: "Global", isDone: false },
        { id: v1(), title: "Documents", isDone: false },
        { id: v1(), title: "Start", isDone: false },
        { id: v1(), title: "Mid game", isDone: false },
        { id: v1(), title: "Late game", isDone: false },
        { id: v1(), title: "WIN", isDone: false },
    ],
    [keyListId_6]: [
        { id: v1(), title: "encrypt", isDone: true },
        { id: v1(), title: "Documents", isDone: false },
    ],
}
test('user reducer should incremet only age', () => {

    const startState: Array<todolistsType> = [
        { cwId: keyListId_1, title: "What to learn", filter: 'all' },
        { cwId: keyListId_2, title: "What to buy", filter: 'all' },
        { cwId: keyListId_3, title: "What a Goal", filter: 'all' },
        { cwId: keyListId_4, title: "device_by", filter: 'all' },
        { cwId: keyListId_5, title: "AI make up", filter: 'all' },
        { cwId: keyListId_6, title: "encrypt/decrypt", filter: 'all' },
    ]

    const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', cwId: string })

    expect(endState.length).toBe(4)
    expect(endState[0].cwId).toBe()
}); 