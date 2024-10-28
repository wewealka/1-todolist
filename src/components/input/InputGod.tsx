import { ChangeEvent, KeyboardEvent, useState } from "react";
import { MainButton } from "../mainbtn/MainButton";
import { usageAddTask, usageAddNote } from "../../data/DataButton-2-todolist"; // Предполагается, что обе функции доступны
import { TaskType } from "../../layout/ConceptWindows";
import { ConceptWindowsPropsType } from "../../layout/ConceptWindows";

type InputProps = {
    newTaskTitle?: string; // Задача
    setNewTaskTitle?: (title: string) => void; // Установка задачи
    tasksFilter?: TaskType[]; // Опционально для задач
    setTasksFilter?: React.Dispatch<React.SetStateAction<TaskType[]>>; // Установка задач
    newNote?: ConceptWindowsPropsType[]; // Заметка
    setNewNote?: React.Dispatch<React.SetStateAction<ConceptWindowsPropsType[]>>; // Установка заметок
};

export const InputGod: React.FC<InputProps> = ({
    newTaskTitle,
    setNewTaskTitle,
    tasksFilter,
    setTasksFilter,
    newNote,
    setNewNote,
}) => {
    const [inputError, setInputError] = useState<boolean>(false);
    const inputController = !newTaskTitle;
    const uLM = `${20 - (newTaskTitle ? newTaskTitle.length : 0)} chars left`;
    const uLMcontrollerUI = newTaskTitle ? newTaskTitle.length > 20 : false;

    const newTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() !== "" && !/ {2}/.test(value)) {
            setInputError(false);
        }
        setNewTaskTitle?.(value); // Опциональный вызов
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNoteOrTask();
        }
    };

const addNoteOrTask = () => {
    if (newTaskTitle?.trim() === "" || / {2}/.test(newTaskTitle || "")) {
        setInputError(true);
        setNewTaskTitle?.("");
    } else if (tasksFilter && setTasksFilter) {
        if (newTaskTitle) { // Проверка на undefined
            const updatedTasks = usageAddTask(tasksFilter, newTaskTitle);
            setTasksFilter(updatedTasks);
            setNewTaskTitle?.("");
            setInputError(false);
        }
    } else if (newNote && setNewNote) {
        const currentState = usageAddNote(newNote, newTaskTitle || ""); // Замените на пустую строку, если undefined
        setNewNote(currentState);
        setNewTaskTitle?.("");
        setInputError(false);
    }
};

    return (
        <div>
            <input
                value={newTaskTitle || ""}
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