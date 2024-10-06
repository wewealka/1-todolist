
import styled from 'styled-components';
import {  InitialTasks} from './data/DataAppBLL-1-todolist';
import { ConceptWindows } from './layout/ConceptWindows';



export const TodoList = () => {
    return (
        <StyledCon>
            <StyledTodoList>
                {InitialTasks.map((taskGroup, index) => (
                    <StyledTaskGroup key={index}>
                        <ConceptWindows title={taskGroup.title} tasks={taskGroup.tasks} />
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
    flex: 1 1 calc(25% - 20px); /* Задает ширину каждого блока (25% от родителя с учетом отступов) */
    min-width: 200px; 
    border: 1px solid black; 
    border-radius: 5px; 
    padding: 10px; 
    background-color: aqua;
`;