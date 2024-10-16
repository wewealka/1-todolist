import { ChangeEvent, KeyboardEvent } from "react";
import { MainButton } from "../MainButton";
import { UsageAddTask } from "../../data/DataButton-2-todolist";
import { TaskType } from "../../layout/ConceptWindows";

{/* interface */} type MainInputProps = {
    newTaskTitle: string;
    setNewTaskTitle: (title: string) => void;
    TasksFilter:TaskType[]
    setCurrentTask: React.Dispatch<React.SetStateAction<TaskType[]>>
    setTasksFilter: React.Dispatch<React.SetStateAction<TaskType[]>>
}

const defaultAddTitle = () => {};//Fallback 

export const MainInput: React.FC<MainInputProps> = ({newTaskTitle,setNewTaskTitle, TasksFilter, setCurrentTask, setTasksFilter}) => {

    const InputController = !newTaskTitle
    const ULM = `${10-newTaskTitle.length} chars left`
    const ULMcontrollerUI = newTaskTitle.length > 10 
    const ULMcontroller = newTaskTitle.length <= 10 

    
    const NewTitleChangeHeandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            ULMcontroller ? AddTask() : alert("Message should be correct");
        }
    }

    const AddTask = () => {
        if (newTaskTitle.trim()) {
            const updatedTasks = UsageAddTask(TasksFilter, newTaskTitle);
            setCurrentTask(updatedTasks);
            setTasksFilter(updatedTasks);
            setNewTaskTitle("");
        } else {
            alert("Message should be correct");
        }
    };
    return (
        <div>
            <input
            value={newTaskTitle}
            onChange={NewTitleChangeHeandler}
            onKeyDown={onKeyPressHandler}/>
            <MainButton
                disabled = {InputController || ULMcontrollerUI}
                name={"+"}
                callBack={AddTask} />
            {(!InputController && !ULMcontrollerUI) && <div>{ULM}</div>}
            {ULMcontrollerUI && <div style={{color: "red"}}>Too many chars</div>}
        </div>
    );
}; 
