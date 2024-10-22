import { ChangeEvent, KeyboardEvent, useState } from "react";
import { MainButton } from "../mainbtn/MainButton";
import { usageAddTask } from "../../data/DataButton-2-todolist";
import { TaskType } from "../../layout/ConceptWindows";

type MainInputProps = {
    newTaskTitle: string
    setNewTaskTitle: (title: string) => void
    tasksFilter: TaskType[]
    setTasksFilter: React.Dispatch<React.SetStateAction<TaskType[]>>
};

export const MainInput: React.FC<MainInputProps> = ({newTaskTitle, setNewTaskTitle, tasksFilter, setTasksFilter,}) => {

    const [inputError, setInputError] = useState<boolean>(false);
    const inputController = !newTaskTitle;
    const uLM = `${10 - newTaskTitle.length} chars left`;
    const uLMcontrollerUI = newTaskTitle.length > 10;
    const uLMcontroller = newTaskTitle.length <= 10;

    const newTitleChangeHeandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() !== "" && !/ {2}/.test(value)) {
            setInputError(false);
        }
        setNewTaskTitle(value);
        
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            uLMcontroller ? addTask() : console.log("");
        }
    };

    const addTask = () => {
        if (newTaskTitle.trim() === "" || / {2}/.test(newTaskTitle)) {
            setInputError(true);
            setNewTaskTitle("");
        } else {
            const updatedTasks = usageAddTask(tasksFilter, newTaskTitle);
            setTasksFilter(updatedTasks);
            setNewTaskTitle("");
            setInputError(false);
        }
    };

    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={newTitleChangeHeandler}
                onKeyDown={onKeyPressHandler}
                className={inputError ? "idiot" : undefined}
            />
            <MainButton
                disabled={inputController || uLMcontrollerUI}
                name={"+"}
                callBack={addTask}
            />
            {(!inputController && !uLMcontrollerUI && !inputError) && <div>{uLM}</div>}
            {uLMcontrollerUI && <div style={{ color: "red" }}>Too many chars</div>}
            {inputError && <div style={{ color: "red" }}>Title is required!</div>}
        </div>
    );
};
