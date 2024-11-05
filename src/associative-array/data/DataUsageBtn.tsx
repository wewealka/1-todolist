import { v1 } from "uuid";
import { EXternalDataType, FiltersValuesType, INternalDataList, INternalDataType } from "../layout/ConceptWindows-part2";


export const addTask = (tasks: INternalDataList, newTitle: string, keyListId: string) => {
    const newTask: INternalDataType = {
        id: v1(),
        title: newTitle,
        isDone: false
    }
    return { ...tasks, [keyListId]: [newTask, ...tasks[keyListId]] }
}

export const removeTask = (tasks: INternalDataList, idForDel: string, keyListId: string) => {
    return { ...tasks, [keyListId]: tasks[keyListId].filter(t => t.id !== idForDel) }

}
export const usageChangeStatusBtn = (tasks: INternalDataList, taskId: string, keyListId: string, newStatus: boolean) => {
    return { ...tasks, [keyListId]: tasks[keyListId].map(t => t.id === taskId ? { ...t, isDone: newStatus } : t) }
}

export const usageFilterBtn = (tasks: INternalDataList, filter: FiltersValuesType, keyListId: string) => {
    return filter === "Active" ? tasks[keyListId].filter(task => !task.isDone) :
        filter === "Completed" ? tasks[keyListId].filter(task => task.isDone) :
            tasks[keyListId];
};

export const usageAddNote = (database: EXternalDataType[], newTitle: string, keyListId: string): EXternalDataType[] => {
    const newNote: EXternalDataType = {
        cwId: keyListId, 
        title: newTitle,
    };
    return [newNote, ...database];
};


export const usageRemoveWinBtn = (windows: EXternalDataType[], cwIdDel: string): EXternalDataType[] => {
    return windows.filter((c) => c.cwId !== cwIdDel); 
};
