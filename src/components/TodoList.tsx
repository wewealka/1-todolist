
import styled from 'styled-components';
import { InitialTasks } from '../data/DataAppBLL-1-todolist';
import { ConceptWindows } from '../layout/ConceptWindows';
import { useState } from 'react';
import { CombinedInput } from './input/InputU';

export const TodoList = () => {
    let [newNote, setNewNote] = useState(InitialTasks)
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const taskList = newNote.map((taskGroup, index) => (
        <StyledTaskGroup key={index}>
            <ConceptWindows mainObj={taskGroup}/>
        </StyledTaskGroup>
    ));
    return (
        <StyledCon>
            <div><CombinedInput newNote={newNote} setNewNote={setNewNote} newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle}/></div>
            <StyledTodoList>
                {taskList}
            </StyledTodoList>
        </StyledCon>
    );
};

const StyledTodoList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    justify-content: space-between;
    margin: 0;
    padding: 0;
`;

const StyledCon = styled.div`
    margin: 30px;
    padding: 10px;
`;

const StyledTaskGroup = styled.div`
    flex: 1 1 calc(25% - 20px);
    min-width: 200px;
    border-radius: 5px;
    padding: 15px;
    background-color: cadetblue;
    border: 3px solid aqua;
`;