import { ChangeEvent, KeyboardEvent, useState } from "react";
import { MainButton } from "../mainbtn/MainButton";
import { usageAddTask, usageAddNote } from "../../data/DataButton-2-todolist";
import { TaskType, ConceptWindowsPropsType } from "../../layout/ConceptWindows";

type CombinedInputProps = {
    newTaskTitle: string;
    setNewTaskTitle: (title: string) => void;
    tasksFilter?: TaskType[]; 
    setTasksFilter?: React.Dispatch<React.SetStateAction<TaskType[]>>; 
    newNote?: ConceptWindowsPropsType[]; 
    setNewNote?: React.Dispatch<React.SetStateAction<ConceptWindowsPropsType[]>>; 
    // tasksFilter?setTasksFilter? - 1func  newNote?setNewNote? - 2 func 
};

export const CombinedInput: React.FC<CombinedInputProps> = ({
    newTaskTitle,
    setNewTaskTitle,
    tasksFilter,
    setTasksFilter,
    newNote,
    setNewNote,
}) => {
    const [inputError, setInputError] = useState<boolean>(false);
    const inputController = !newTaskTitle;
    const uLM = `${20 - newTaskTitle.length} chars left`;
    const uLMcontrollerUI = newTaskTitle.length > 20;
    const uLMcontroller = newTaskTitle.length <= 20;

    const newTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() !== "" && !/ {2}/.test(value)) {
            setInputError(false);
        }
        setNewTaskTitle(value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            uLMcontroller ? addNoteOrTask() : console.log("");
        }
    };

    const addNoteOrTask = () => {
        if (newTaskTitle?.trim() === "" || / {2}/.test(newTaskTitle || "")) {
            setInputError(true);
            setNewTaskTitle?.("");
        } else if (tasksFilter && setTasksFilter) {
            const updatedTasks = usageAddTask(tasksFilter, newTaskTitle);
            setTasksFilter(updatedTasks);
            setNewTaskTitle?.("");
            setInputError(false);
        } else if (newNote && setNewNote) {
            const currentState = usageAddNote(newNote, newTaskTitle || "");
            setNewNote(currentState);
            setNewTaskTitle("");
            setInputError(false);
        }
    };

    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={newTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={inputError ? "error" : undefined}
            />
            <MainButton
                disabled={inputController || uLMcontrollerUI}
                name={"+"}
                callBack={addNoteOrTask}
            />
            {(!inputController && !uLMcontrollerUI && !inputError) && <div>{uLM}</div>}
            {uLMcontrollerUI && <div style={{ color: "red" }}>Too many chars</div>}
            {inputError && <div style={{ color: "red" }}>Title is required!</div>}
        </div>
    );
};