import React, { ChangeEvent, useState } from "react";
import { usageAddTask, usageChangeStatusBtn, usageFilterBtn, usageRemoveBtn } from "../data/DataButton-2-todolist";
import { MainButton } from "../components/mainbtn/MainButton";
import { useAutoAnimate } from '@formkit/auto-animate/react';
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
};

export const ConceptWindows: React.FC<MainType> = ({ mainObj, onRemoveWindow }) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>();
    const [tasks, setTasks] = useState<TaskType[]>(mainObj.tasks);
    const [activeFilter, setActiveFilter] = useState<FiltersValuesType>("All");
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");

    const removeTask = (id: string) => {
        const updatedTasks = usageRemoveBtn(tasks, id);
        setTasks(updatedTasks);
    };

    const changeStatus = (id: string, newStatus: boolean) => {
        const updatedTasks = usageChangeStatusBtn(tasks, id, newStatus);
        setTasks(updatedTasks);
    };

    const addTask = () => {
        const updatedTasks = usageAddTask(tasks, newTaskTitle);
        setTasks(updatedTasks);
        setNewTaskTitle(""); 
    };

    const filteredTasks = usageFilterBtn(tasks, activeFilter);

    const taskList = filteredTasks.map((task: TaskType) => (
        <li key={task.id}>
            <input
                type="checkbox"
                onChange={(e) => changeStatus(task.id, e.currentTarget.checked)}
                checked={task.isDone}
            />
            <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
            <MainButton name={"X"} callBack={() => removeTask(task.id)} />
        </li>
    ));

    return (
        <div>
            <h3>
                {mainObj.title}
                <MainButton name={"X"} callBack={() => onRemoveWindow(mainObj.cwId)} />
            </h3>
            <div>
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