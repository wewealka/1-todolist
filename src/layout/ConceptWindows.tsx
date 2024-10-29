import React, { ChangeEvent, useState } from "react";
import { usageChangeStatusBtn, usageFilterBtn, usageRemoveBtn } from "../data/DataButton-2-todolist";
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
    title: string;
    tasks: Array<TaskType>;
};
export type MainType = {
    mainObj: ConceptWindowsPropsType
}



export const ConceptWindows: React.FC<MainType> = ({ mainObj}) => {
    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const [tasks, setTasks] = useState<TaskType[]>(mainObj.tasks);
    const [activeFilter, setActiveFilter] = useState<FiltersValuesType>("All");
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const filteredTasks = usageFilterBtn(tasks, activeFilter);

    const removeTask = (id: string) => {
        const updatedTasks = usageRemoveBtn(tasks, id);
        setTasks(updatedTasks);
    };

    const changeStatus = (id: string, nesStatus: boolean) => {
        const updatedTasks = usageChangeStatusBtn(tasks, id, nesStatus);
        setTasks(updatedTasks);
    };


    const filters: FiltersValuesType[] = ["All", "Active", "Completed"];
    const buttonList = filters.map(filter => (
        <MainButton
            key={filter}
            name={filter}
            className={activeFilter === filter ? "active" : undefined}
            callBack={() => setActiveFilter(filter)}
        />
    ))

    const taskList = filteredTasks.map((task: TaskType) => {
        const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeStatus(task.id, e.currentTarget.checked)
        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    onChange={changeStatusHandler}
                    checked={task.isDone}

                />
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <MainButton name={"X"} callBack={() => removeTask(task.id)} />
            </li>
        )
    });
    
    return (
        <div>
            <h3>{mainObj.title}</h3>
            <div>
                <CombinedInput
                    newTaskTitle={newTaskTitle}
                    setNewTaskTitle={setNewTaskTitle}
                    tasksFilter={tasks}
                    setTasksFilter={setTasks}
                />
            </div>
            <ul ref={listRef}>
                {taskList}
            </ul>
            <div>
                {buttonList}
            </div>
        </div>
    );
};
