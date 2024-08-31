import { Button } from "./Button"

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    RemoveTask: Function   
    }

export type TaskType = {
    id: number
    title: string
    isDone: boolean
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
                <Button title="+"/>
            </div>
                <ul>
                    {TaskList}
                    
                </ul>
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>
            </div>
        </div>
    )
}