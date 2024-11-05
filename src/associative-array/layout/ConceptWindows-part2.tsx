import React, { useState } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { EditableSpan } from "../components/editableSpan/EditableSpan";
import { MainButton } from "../components/mainbtn/MainButton";
import { CombinedInput } from "../components/input/InputU";
import { addTask, removeTask, usageChangeStatusBtn, usageFilterBtn } from "../data/DataUsageBtn";

export type FiltersValuesType = "All" | "Active" | "Completed";

export type INternalDataType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type EXternalDataType = {
    cwId: string;
    title: string;
}

export type INternalDataList = {
    [keyListId: string]: INternalDataType[];
}

export type ConceptWindowsPropsType = {
    exObj: EXternalDataType;
    tasks: INternalDataList;
    setTasks: React.Dispatch<React.SetStateAction<INternalDataList>>;
}

export type MainType = {
    mainObj: ConceptWindowsPropsType;
    onRemoveWindow: (title: string) => void;
    onNewTitleChangeHandler: (taskId: string, newTitle: string) => void;
}

export const ConceptWindows: React.FC<MainType> = ({ mainObj, onRemoveWindow, onNewTitleChangeHandler }) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const [activeFilter, setActiveFilter] = useState<FiltersValuesType>("All");
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const addTaskHandler = () => {
        const updatedTasks = addTask(mainObj.tasks, newTaskTitle, mainObj.exObj.cwId);
        mainObj.setTasks(updatedTasks);
        setNewTaskTitle("");
    }

    const removeTaskHandler = (taskId: string) => {
        const updatedTasks = removeTask(mainObj.tasks, taskId, mainObj.exObj.cwId);
        mainObj.setTasks(updatedTasks);
    }

    const changeStatus = (id: string, newStatus: boolean) => {
        const updatedTasks = usageChangeStatusBtn(mainObj.tasks, id, mainObj.exObj.cwId, newStatus);
        mainObj.setTasks(updatedTasks);
    }

    const newTitleTaskChangeHandler = (taskId: string, newTitle: string) => {
        const updatedTasks = {
            ...mainObj.tasks,
            [mainObj.exObj.cwId]: mainObj.tasks[mainObj.exObj.cwId].map(t =>
                t.id === taskId ? { ...t, title: newTitle } : t
            ),
        };
        mainObj.setTasks(updatedTasks);
    }

    const filteredTasks = usageFilterBtn(mainObj.tasks, activeFilter, mainObj.exObj.cwId);

    const taskList = filteredTasks.map((task) => (
        <li key={task.id}>
            <input
                type="checkbox"
                onChange={(e) => changeStatus(task.id, e.currentTarget.checked)}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} onChange={(str) => newTitleTaskChangeHandler(task.id, str)} />
            <MainButton name={"X"} callBack={() => removeTaskHandler(task.id)} />
        </li>
    ));

    return (
        <div>
            <h3>
                <EditableSpan title={mainObj.exObj.title} onChange={(str) => onNewTitleChangeHandler(mainObj.exObj.cwId, str)} />
                <MainButton name={"X"} callBack={() => onRemoveWindow(mainObj.exObj.cwId)} />
            </h3>
            <div>
                <p>add task ⬇</p>
                <CombinedInput
                    newTaskTitle={newTaskTitle}
                    setNewTaskTitle={setNewTaskTitle}
                    onSubmit={addTaskHandler}
                />
            </div>
            <ul ref={listRef}>
                {taskList}
            </ul>
            <div>
                {["All", "Active", "Completed"].map((filter) => (
                    <MainButton
                        key={filter}
                        name={filter}
                        className={activeFilter === filter ? "active" : undefined}
                        callBack={() => setActiveFilter(filter as FiltersValuesType)}
                    />
                ))}
            </div>
        </div>
    );
};
