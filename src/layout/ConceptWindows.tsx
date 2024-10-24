import { ChangeEvent, useState } from "react";
import { usageChangeStatusBtn, usageFilterBtn, usageRemoveBtn } from "../data/DataButton-2-todolist";
import { MainButton } from "../components/mainbtn/MainButton";
import { MainInput } from "../components/input/MainInput";

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

export const ConceptWindows = (props: ConceptWindowsPropsType) => {
    const [tasks, setTasks] = useState<TaskType[]>(props.tasks);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [activeFilter, setActiveFilter] = useState<FiltersValuesType>("All");

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
        const changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => changeStatus (task.id, e.currentTarget.checked)
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
            <h3>{props.title}</h3>
            <div>
                <MainInput
                    newTaskTitle={newTaskTitle}
                    setNewTaskTitle={setNewTaskTitle}
                    tasksFilter={tasks}
                    setTasksFilter={setTasks}
                />
            </div>
            <ul>{taskList}</ul>
            <div>
                {buttonList}
            </div>
        </div>
    );
};
