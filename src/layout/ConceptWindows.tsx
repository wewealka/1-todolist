import { ChangeEvent, useState } from "react";
import { UsageAddTask, UsageChangeStatusBtn, UsageFilterBtn, UsageRemoveBtn } from "../data/DataButton-2-todolist";
import { MainButton } from "../components/MainButton";
import { MainInput } from "../components/input/MainInput";


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

    const [TasksFilter, setTasksFilter] = useState<TaskType[]>(props.tasks);
    const [CurrentTask, setCurrentTask] = useState(TasksFilter);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [activeFilter, setActiveFilter] = useState<FiltersValuesType>("All");

    const ChooseOptionForTask = (filter: FiltersValuesType) => {
        const filteredTasks = UsageFilterBtn(TasksFilter, filter);
        setCurrentTask(filteredTasks);
        setActiveFilter(filter);
    };

    const RemoveTask = (id: string) => {
        const updatedTasks = UsageRemoveBtn(TasksFilter, id);
        setCurrentTask(updatedTasks);
        setTasksFilter(updatedTasks);
    };


    const ChangeStatus = (id: string, status: boolean) => {
        const updatedTasks = UsageChangeStatusBtn(CurrentTask, id, status);
        setCurrentTask([...updatedTasks]);
        setTasksFilter([...updatedTasks]);
    };



    const TaskList: Array<JSX.Element> = CurrentTask.map((tasks: TaskType) => {

        const OnChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            ChangeStatus(tasks.id, e.currentTarget.checked)
        }
        return (
            <li key={tasks.id}>
                <input
                    type="checkbox"
                    onChange={OnChangeStatusHandler}
                    checked={tasks.isDone} 
                    className={tasks.isDone ? "checked" : ""}
                    />
                <span>{tasks.title}</span>
                <MainButton name={"X"} callBack={() => RemoveTask(tasks.id)} />
            </li>
        )
    })
    return (
        <div className="ConceptWindows">
            <h3>{props.title}</h3>
            <div>
                <MainInput
                    newTaskTitle={newTaskTitle}
                    setNewTaskTitle={setNewTaskTitle}
                    TasksFilter={TasksFilter}
                    setCurrentTask={setCurrentTask}
                    setTasksFilter={setTasksFilter}
                />
            </div>
            <ul>
                {TaskList}
            </ul>
            <div>
                <MainButton 
                className={activeFilter === "All" ? "active" : ""} 
                name={"ALL"} 
                callBack={() => ChooseOptionForTask("All")}
                />
                <MainButton
                className={activeFilter === "Active" ? "active" : ""}
                name={"Active"} 
                callBack={() => ChooseOptionForTask("Active")} 
                />
                <MainButton 
                className={activeFilter === "Completed" ? "active" : ""} 
                name={"Completed"} 
                callBack={() => ChooseOptionForTask("Completed")} 
                />
            </div>
        </div>
    )
}

// const inputRef = useRef<HTMLInputElement>(null)

// ref={inputRef}
// onKeyUp={onKeyPressHandler}

// const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter" && inputRef.current) {
//         const newTaskTitle = inputRef.current.value.trim();
//     }  newTaskTitle ? (
//     setCurrentTask(UsageAddTask(CurrentTask, newTaskTitle)),
//     inputRef.current.value = ''
// ) : alert("the field must be filled in");
//         }
//     }
// }