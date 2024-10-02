
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
    flex-wrap: wrap; /* Позволяет блокам переходить на новую строку, если не помещаются в текущую */
    gap: 40px; /* Отступы между элементами по 20px */
    justify-content: space-between; /* Выравнивание элементов по горизонтали */
    margin: 0; /* Убираем отступы у контейнера */
    padding: 0; /* Убираем внутренние отступы у контейнера */

`;

const StyledCon = styled.div`
    margin: 30px; /* Отступы вокруг блока TodoList */
    padding: 10px; /* Внутренние отступы, если нужно */


`;

const StyledTaskGroup = styled.div`
    flex: 1 1 calc(25% - 20px); /* Задает ширину каждого блока (25% от родителя с учетом отступов) */
    min-width: 200px; /* Минимальная ширина блока */
    border: 1px solid black; /* Граница для каждого блока */
    border-radius: 5px; /* Сглаживание углов блока */
    padding: 10px; /* Внутренние отступы для блока */
    background-color: aqua;
`;