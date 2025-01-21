import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeNameTodolistAC,
    RemoveTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {
    FilterValuesType,
    initialEXternalData,
    todolistsType
} from "../../mainVersion/associative-array/data/DataApp";


const startStateEX: Array<todolistsType> = (initialEXternalData);


test('correct todolist should be removed', () => {
    const endState = todolistReducer(startStateEX, RemoveTodolistAC(initialEXternalData[0].cwId))

    expect(endState.length).toBe(5)
    expect(endState[0].cwId).toBe(initialEXternalData[1].cwId)
});
test('correct todolist should be added', () => {

    const newTodolistTitle = 'New Todolist Title'

    const endState = todolistReducer(startStateEX, AddTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(7)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')
});
test('correct todolist should change name', () => {

    const newTodolistTitle = 'New Todolist Title'

    const endState = todolistReducer(startStateEX, ChangeNameTodolistAC(initialEXternalData[0].cwId, newTodolistTitle))

    expect(endState.length).toBe(6)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[1].title).toBe('What to buy')
});
test('correct todolist filter should be changed', () => {

    const newTodolistFilter: FilterValuesType = 'completed'

    const endState = todolistReducer(startStateEX, ChangeFilterTodolistAC(initialEXternalData[0].cwId, newTodolistFilter))

    expect(endState.length).toBe(6)
    expect(endState[0].filter).toBe('completed')
    expect(endState[1].title).toBe('What to buy')
});
