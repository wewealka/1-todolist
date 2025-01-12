import React, { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './todolist/Todolist';
import { FilterValuesType, initialEXternalData, initialINternalData, todolistsType } from '../data/DataApp';
import { CombinedInput } from '../components/Input';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

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
        const newId = v1()
        if (newTaskTitle.trim()) {
            setTodolists([{cwId: newId,title: newTaskTitle,filter: 'all'}, ...todolists]);
            setTasks({ ...tasks, [newId]: [] });
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
        setTasks({ ...tasks, [keyListId]: tasks[keyListId].map(t => t.id === taskId ? { ...t, title: newTitle } : t) });
    };


    return (
        <div>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <CombinedInput newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle} onSubmit={addNoteHandler} />
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((todolist: todolistsType) => {
                        let tasksForTodolist = tasks[todolist.cwId] || [];
                        if (todolist.filter === "active") {
                            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                        }
                        if (todolist.filter === "completed") {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                        }
                        return (
                            <Grid item>
                                <Paper style={{padding: "10px"}} elevation={3}>
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
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default MainWidArr;
