import { useState } from "react";
import { UsageAddTask, UsageFilterBtn, UsageRemoveBtn } from "../data/DataButton-2-todolist";
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
                <MainInput newTaskTitle={newTaskTitle} setNewTaskTitle={setNewTaskTitle}  AddTask = {AddTask}/>
                
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