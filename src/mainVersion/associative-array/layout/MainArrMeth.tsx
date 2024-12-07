import React, { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './todolist/Todolist';
import { FilterValuesType, initialEXternalData, initialINternalData, todolistsType } from '../data/DataApp';
import { CombinedInput } from '../components/Input';

function MainWidArr() {
    const [todolists, setTodolists] = useState<Array<todolistsType>>(initialEXternalData);
    const [tasks, setTasks] = useState(initialINternalData);
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const removeTask = (keyListId: string, id: string) => {
        setTasks({ ...tasks, [keyListId]: tasks[keyListId].filter(t => t.id !== id) });
    };

    const addTask = (keyListId: string, title: string) => {
        setTasks({ ...tasks, [keyListId]: [{ id: v1(), title, isDone: false }, ...tasks[keyListId]] });
    };

    const changeStatus = (keyListId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [keyListId]: tasks[keyListId].map(t => t.id === taskId ? { ...t, isDone } : t)
        });
    };

    const changeFilter = (keyListId: string, value: FilterValuesType) => {
        setTodolists(todolists.map(t => t.cwId === keyListId ? { ...t, filter: value } : t));
    };

    const addNoteHandler = () => {
        if (newTaskTitle.trim()) {
            const newTodolistId = v1();
            const newTodolist: todolistsType = {
                cwId: newTodolistId,
                title: newTaskTitle,
                filter: 'all',
            };
            setTodolists([newTodolist, ...todolists]);
            setTasks({ ...tasks, [newTodolistId]: [] }); // Инициализация массива задач для нового Todolist
            setNewTaskTitle("");
        }
    };

    const removeNote = (keyListId: string) => {
        setTodolists(todolists.filter(todolist => todolist.cwId !== keyListId));
        const updatedTasks = { ...tasks };
        delete updatedTasks[keyListId];
        setTasks(updatedTasks);
    };

    const spansChanger = (keyListId: string, title: string) => {
        setTodolists(todolists.map(t => t.cwId === keyListId ? { ...t, title } : t));
    };
    
    const changeTaskTitle = (keyListId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks,[keyListId]: tasks[keyListId].map(t => t.id === taskId ? { ...t, title: newTitle } : t)});
    };


    return (
        <div style={{ display: "flex", border: "1px solid red", width: "1280px", flexWrap: "wrap", gap: "15px", margin:"100px"}}>
            <CombinedInput newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} onSubmit={addNoteHandler} />
            {todolists.map((todolist: todolistsType) => {
                let tasksForTodolist = tasks[todolist.cwId] || [];
                if (todolist.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (todolist.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                return (
                    <Todolist
                        key={todolist.cwId}
                        keyListId={todolist.cwId}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={todolist.filter}
                        removeNote={removeNote}
                        spansChanger={spansChanger}
                        changeTaskTitle={changeTaskTitle}
                    />
                );
            })}
        </div>
    );
}

export default MainWidArr;
