import styled from 'styled-components';
import { useState } from 'react';
import { CombinedInput } from './input/InputU';
import { ConceptWindows, EXternalDataType, INternalDataList } from '../layout/ConceptWindows-part2';
import { initialEXternalData, initialINternalData } from '../data/DataAppBLL-2-todolist';
import { usageAddNote, usageRemoveWinBtn } from '../data/DataUsageBtn';
import { v1 } from 'uuid';

export const TodoListKey = () => {
    let [newNote, setNewNote] = useState<EXternalDataType[]>(initialEXternalData);
    let [internalData, setInternalData] = useState<INternalDataList>(initialINternalData);
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const removeWindow = (cwId: string) => {
        const updatedNotes = usageRemoveWinBtn(newNote, cwId);
        setNewNote(updatedNotes);
    };

    const addWindow = () => {
        const keyListId = v1();
        const updatedNotes = usageAddNote(newNote, newTaskTitle, keyListId);
        setNewNote(updatedNotes);
        setInternalData({ ...internalData, [keyListId]: [] }); 
        setNewTaskTitle("");
    };

    const newTitleChanger = (taskId: string, newTitle: string) => {
        const newTitleCw = newNote.map(t => t.cwId === taskId ? { ...t, title: newTitle } : t);
        setNewNote(newTitleCw);
    };

    return (
        <StyledCon>
            <p>associative-array</p>
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
                            mainObj={{ exObj: taskGroup, tasks: internalData, setTasks: setInternalData }}
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
`;
