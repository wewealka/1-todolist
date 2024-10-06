import { ChangeEvent, KeyboardEvent, useState } from "react";
import { UsageAddTask, UsageFilterBtn, UsageRemoveBtn } from "../data/DataButton-2-todolist";
import { MainButton } from "../components/MainButton";


export type FiltersValuesType = "All" | "Active" | "Completed"

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type ConceptWindowsPropsType = {
    title: string;
    tasks: Array<TaskType>;
}


export const ConceptWindows = (props: ConceptWindowsPropsType) => {



    const [TasksFilter] = useState<TaskType[]>(props.tasks);
    const [CurrentTask, setCurrentTask] = useState(TasksFilter);
    const [newTaskTitle, setNewTaskTitle] = useState("");


    const ChooseOptionForTask = (filter: FiltersValuesType) => {
        setCurrentTask(UsageFilterBtn(props.tasks, filter))
    }
    const RemoveTask = (id: string) => {
        setCurrentTask(prevTasks => UsageRemoveBtn(prevTasks, id));
    };

    const AddTask = () => {
        if (newTaskTitle.trim()) {
            const updatedTask = UsageAddTask(CurrentTask, newTaskTitle)
            setCurrentTask(updatedTask)
            setNewTaskTitle("")
        }else {
            alert("the field must be filled in")
        }
    };


// избавимся от js в разметке input
    const NewTitleChangeHeandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                AddTask()
            }
    }
 // избавимся от js в разметке input



    const TaskList: Array<JSX.Element> = CurrentTask.map((tasks: TaskType) => {
        return (
            <li key={tasks.id}>
                <input type="checkbox" checked={tasks.isDone} />
                <span>{tasks.title}</span>
                <MainButton name={"X"} callBack={() => RemoveTask(tasks.id)} />
            </li>
        )
    })
    return (
        <div className="ConceptWindows">
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={NewTitleChangeHeandler}  // вот пор эту разметку 
                    onKeyUp={onKeyPressHandler} // вот пор эту разметку 
                    />
                <MainButton name={"+"} callBack={AddTask} />
            </div>
            <ul>
                {TaskList}
            </ul>
            <div>
                <MainButton name={"ALL"} callBack={() => ChooseOptionForTask("All")} />
                <MainButton name={"Active"} callBack={() => ChooseOptionForTask("Active")} />
                <MainButton name={"Completed"} callBack={() => ChooseOptionForTask("Completed")} />
            </div>
        </div>
    )
}