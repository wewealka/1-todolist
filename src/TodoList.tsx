import { FiltersValuesType } from './App'; 

export type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    RemoveTask: (id: number) => void;
    ChangeFilter:(value:FiltersValuesType) => void;
    }

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}






export const TodoList = (props:TodoListPropsType) => {

    const TaskList: Array<JSX.Element> = props.tasks.map((tasks: TaskType) => {
        return (
            <li key={tasks.id}>
                <input type="checkbox" checked={tasks.isDone} /> 
                <span>{tasks.title}</span>
                <button onClick={() => {props.RemoveTask(tasks.id)}}>X</button>
            </li>
        )
    })



    return (
        <div className="Todolist">
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
                <ul>
                    {TaskList}
                    
                </ul>
            <div>
                <button onClick={() => props.ChangeFilter("All")}>All</button>
                <button onClick={() => props.ChangeFilter("Active")}>Active</button>
                <button onClick={() => props.ChangeFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}