import React, { useState } from "react";
import { usageAddTask, usageChangeStatusBtn, usageFilterBtn, usageRemoveBtn } from "../data/DataButton-2-todolist";
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { EditableSpan } from "../components/editableSpan/EditableSpan";
import { MainButton } from "../components/mainbtn/MainButton";
import { CombinedInput } from "../components/input/InputU";


export type FiltersValuesType = "All" | "Active" | "Completed";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
export type ConceptWindowsPropsType = {
    cwId: string
    title: string;
    tasks: Array<TaskType>;
};
export type MainType = {
    mainObj: ConceptWindowsPropsType;
    onRemoveWindow: (title: string) => void;
    onNewTitleChangeHandler:(taskId:string, newTitle: string) => void

};

export const ConceptWindows: React.FC<MainType> = ({ mainObj, onRemoveWindow, onNewTitleChangeHandler }) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const [tasks, setTasks] = useState<TaskType[]>(mainObj.tasks);
    const [activeFilter, setActiveFilter] = useState<FiltersValuesType>("All");
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const removeTask = (id: string) => {
        setTasks(usageRemoveBtn(tasks, id));
    };

    const changeStatus = (id: string, newStatus: boolean) => {
        setTasks(usageChangeStatusBtn(tasks, id, newStatus));
    };

    const addTask = () => {
        setTasks(usageAddTask(tasks, newTaskTitle));
        setNewTaskTitle(""); 
    };

    const newTitleTaskChangeHandler = (taskId:string, newTitle: string) => {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, title: newTitle } : t))
    };




    const filteredTasks = usageFilterBtn(tasks, activeFilter);

    const taskList = filteredTasks.map((task: TaskType) => (
        <li key={task.id}>
            <input
                type="checkbox"
                onChange={(e) => changeStatus(task.id, e.currentTarget.checked)}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} onChange={(str)=> newTitleTaskChangeHandler(task.id, str) }/>
            <MainButton name={"X"} callBack={() => removeTask(task.id)} />
        </li>
    ));

    return (
        <div>
            <h3>
            <EditableSpan title={mainObj.title} onChange={(str)=> onNewTitleChangeHandler(mainObj.cwId, str)}/>
                <MainButton name={"X"} callBack={() => onRemoveWindow(mainObj.cwId)} />
            </h3>
            <div>
                <p>add task ⬇</p>
                <CombinedInput
                    newTaskTitle={newTaskTitle}
                    setNewTaskTitle={setNewTaskTitle}
                    onSubmit={addTask}
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

