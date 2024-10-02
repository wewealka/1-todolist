import { useState } from "react";
import { UsageFilterBtn, UsageRemoveBtn } from "../data/DataButton-2-todolist";
import { MainButton } from "../components/MainButton";

export type FiltersValuesType = "All" | "Active" | "Completed"

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type ConceptWindowsPropsType = {
    title: string;
    tasks: Array<TaskType>;
}


export const ConceptWindows = (props: ConceptWindowsPropsType) => {


    const [TasksFilter] = useState<TaskType[]>(props.tasks)
    const [CurrentTask, setCurrentTask] = useState(TasksFilter)



    const ChooseOptionForTask = (filter: FiltersValuesType) => {
        setCurrentTask(UsageFilterBtn(props.tasks, filter))
    }
    const removeTask = (id: number) => {
        setCurrentTask(prevTasks => UsageRemoveBtn(prevTasks, id));
    };



    const TaskList: Array<JSX.Element> = CurrentTask.map((tasks: TaskType) => {
        return (
            <li key={tasks.id}>
                <input type="checkbox" checked={tasks.isDone} />
                <span>{tasks.title}</span>
                <MainButton name={"X"} callBack={() => removeTask(tasks.id)} />
            </li>
        )
    })
    return (
        <div className="ConceptWindows">
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
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