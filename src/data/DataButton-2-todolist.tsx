import { v1 } from "uuid";
import { FiltersValuesType, TaskType } from "../layout/ConceptWindows"


export const usageRemoveBtn = (tasks: TaskType[], id: string): TaskType[] => {
    return tasks.filter(task => task.id !== id);
};


export const usageFilterBtn = (tasks: TaskType[], filter: FiltersValuesType) => {
    return filter === "Active" ? tasks.filter(task => !task.isDone) :
        filter === "Completed" ? tasks.filter(task => task.isDone) :
            tasks;
}

export const usageAddTask = (tasks: TaskType[], title: string): TaskType[] => {
    const newTask: TaskType = {
        id: v1(),
        title: title,
        isDone: false
    };
    return [newTask, ...tasks];
}

export const usageChangeStatusBtn = (tasks: TaskType[], taskId: string) => {
    return tasks.map(t => t.id === taskId ? { ...t, isDone: !t.isDone } : t)
}

