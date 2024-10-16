import { v1 } from "uuid";
import { FiltersValuesType, TaskType } from "../layout/ConceptWindows"


export const UsageRemoveBtn = (tasks: TaskType[], id: string): TaskType[] => {
    return tasks.filter(task => task.id !== id);
};

export const UsageFilterBtn = (tasks: TaskType[], filter: FiltersValuesType) => {
    if (filter === "Active") {
        return tasks.filter(task => !task.isDone);
    } else if (filter === "Completed") {
        return tasks.filter(task => task.isDone);
    } else {
        return tasks;
    }
}

    export const UsageAddTask = (tasks:TaskType[], title:string):TaskType[] => {
        const NewTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        return  [...tasks, NewTask];
    }

    export const UsageChangeStatusBtn = (tasks: TaskType[], id: string, status:boolean):TaskType[] =>{
        let stateForStatus = tasks.find(eachT=> eachT.id === id)
        stateForStatus ? stateForStatus.isDone = status : console.log("bad news")
        return [...tasks]
    }



// *****************************************************************************************************************************
// export const UsageFilterBtn = (tasks: TaskType[], filter: FiltersValuesType) => {
//     const filterConditions: { [key in FiltersValuesType]: (task: TaskType) => boolean } = {
//         Active: task => !task.isDone,
//         Completed: task => task.isDone,
//         All: () => true,  // Возвращает все задачи
//     };

//     return tasks.filter(filterConditions[filter]);
// };