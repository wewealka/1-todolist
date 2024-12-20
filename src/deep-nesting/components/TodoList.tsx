import styled from 'styled-components';


import { useState } from 'react';
import { CombinedInput } from './input/InputU';
import { ConceptWindows, ConceptWindowsPropsType } from '../layout/ConceptWindows';
import { usageAddNote, usageRemoveWinBtn } from '../data/DataButton-2-todolist';
import { InitialTasks } from '../data/DataAppBLL-1-todolist';


export const TodoList = () => {
    let [newNote, setNewNote] = useState<ConceptWindowsPropsType[]>(InitialTasks);
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    

    const removeWindow = (cwId: string) => {
        setNewNote(usageRemoveWinBtn(newNote, cwId));
    };

    const addWindow = () => {
        setNewNote(usageAddNote(newNote, newTaskTitle));
        setNewTaskTitle("");  
    };

    const newTitleChanger = (taskId:string, newTitle: string) => { 
        setNewNote (newNote.map(t => t.cwId === taskId ? { ...t, title: newTitle } : t))
    };


    return (
        <StyledCon>
            <p>deep-nesting</p>
            <StyledInput>
                <p>New Note</p>
                <CombinedInput
                    newTaskTitle={newTaskTitle}
                    setNewTaskTitle={setNewTaskTitle}
                    onSubmit={addWindow}
                />
            </StyledInput>
            <StyledTodoList>
                {newNote.map((taskGroup) => (
                    <StyledTaskGroup key={taskGroup.cwId}>
                        <ConceptWindows
                            mainObj={taskGroup}
                            onRemoveWindow={removeWindow}
                            onNewTitleChangeHandler={newTitleChanger}
                        />
                    </StyledTaskGroup>
                ))}
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

const StyledInput = styled.div`
    display: flex;
    justify-content: center; 
    align-items: center;
    flex-direction: column;
    margin-top: 0px ;
    background-color: rgba(12, 3, 27, 0.3);
    margin-bottom: 15px ;
`
