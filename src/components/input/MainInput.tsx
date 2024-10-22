import { ChangeEvent, KeyboardEvent } from "react";
import { MainButton } from "../mainbtn/MainButton";
import { usageAddTask } from "../../data/DataButton-2-todolist";
import { TaskType } from "../../layout/ConceptWindows";

type MainInputProps = {
    newTaskTitle: string;
    setNewTaskTitle: (title: string) => void;
    tasksFilter: TaskType[]
    setTasksFilter: React.Dispatch<React.SetStateAction<TaskType[]>>
}


export const MainInput: React.FC<MainInputProps> = ({ newTaskTitle, setNewTaskTitle, tasksFilter, setTasksFilter }) => {

    const inputController = !newTaskTitle
    const uLM = `${10 - newTaskTitle.length} chars left`
    const uLMcontrollerUI = newTaskTitle.length > 10
    const uLMcontroller = newTaskTitle.length <= 10


    const newTitleChangeHeandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            uLMcontroller ? addTask() : alert("Message should be correct");
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim()) {
            const updatedTasks = usageAddTask(tasksFilter, newTaskTitle);
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
                onChange={newTitleChangeHeandler}
                onKeyDown={onKeyPressHandler} />
            <MainButton
                disabled={inputController || uLMcontrollerUI}
                name={"+"}
                callBack={addTask} />
            {(!inputController && !uLMcontrollerUI) && <div>{uLM}</div>}
            {uLMcontrollerUI && <div style={{ color: "red" }}>Too many chars</div>}
        </div>
    );
}; 
