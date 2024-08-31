import React, { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './TodoList';


export function App() {
///BLL
    const TodoListTitle_1:string = "What to learn";
    const TodoListTitle_2:string = "What to buy";

    let InitialTasks_1: Array<TaskType> = [
        {id: 1, title:"HTMl", isDone: true},
        {id: 2, title:"CSS", isDone: true},
        {id: 3, title:"JS/TS", isDone: false },
        {id: 4, title:"Redux", isDone: false},
    ]

    let InitialTasks_2: Array<TaskType> = [
        {id: 5, title:"Cola", isDone: true},
        {id: 6, title:"Whiskey", isDone: true},
        {id: 7, title:"Ice", isDone: false},
    ]


///useState используем чтобы сохранить состояние первым параметром указываем data - тобишь наш массив, вторым - функция, что мы хотим сделать с нашим массивом
    const [Tasks_1, setTasks_1] = useState(InitialTasks_1)
    const [Tasks_2, setTasks_2] = useState(InitialTasks_2)

    function RemoveTask (id:number) {
        let FilterderTasks_1 = Tasks_1.filter( Tasks_1 => Tasks_1.id !== id);
        setTasks_1(FilterderTasks_1);

        let FilterderTasks_2 = Tasks_2.filter( Tasks_2 => Tasks_2.id !== id);
        setTasks_2(FilterderTasks_2);
    }


    ///UI
    return (
        <div className="App">
            <TodoList 
                title={TodoListTitle_1} 
                tasks={Tasks_1}
                RemoveTask={RemoveTask}
                />
            
            <TodoList
                title={TodoListTitle_2} 
                tasks={Tasks_2}
                RemoveTask={RemoveTask}
                />

        </div>
    );
}

export default App;
