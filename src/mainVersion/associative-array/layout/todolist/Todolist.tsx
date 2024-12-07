import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from '../../data/DataApp';
import { Button } from '../../components/Button';
import { EditableSpan } from '../../components/Span';

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    keyListId: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (todolistID: string, taskId: string) => void;
    changeFilter: (todolistID: string, value: FilterValuesType) => void;
    addTask: (todolistID: string, title: string) => void;
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void;
    filter: FilterValuesType;
    removeNote: (keyListId: string) => void;
    spansChanger: (keyListId: string, title: string) => void
    changeTaskTitle: (keyListId: string, taskId: string, newTitle: string) => void
};

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.keyListId, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        if (error) setError(null); 
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    };

    const onSpanChangeHandler = () => {
        props.spansChanger(props.keyListId, title)
    }
    const onSpanTaskChangeHandler = (taskId: string, newTitle: string) => {
        props.changeTaskTitle(props.keyListId, taskId, newTitle);
    };

    return (
        <div >
            <EditableSpan
                title={props.title}
                onChange={onSpanChangeHandler}
            />
            <Button name="X" callBack={() => props.removeNote(props.keyListId)} />
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <Button name="+" callBack={addTask} />
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.keyListId, t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.keyListId, t.id, e.currentTarget.checked);
                    };

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />
                            <EditableSpan title={t.title} onChange={(newTitle) => onSpanTaskChangeHandler(t.id, newTitle)} />
                            <Button name="X" callBack={onClickHandler} />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button name="All" className={props.filter === 'all' ? "active-filter" : ""} callBack={() => props.changeFilter(props.keyListId, "all")} />
                <Button name="Active" className={props.filter === 'active' ? "active-filter" : ""} callBack={() => props.changeFilter(props.keyListId, "active")} />
                <Button name="Completed" className={props.filter === 'completed' ? "active-filter" : ""} callBack={() => props.changeFilter(props.keyListId, "completed")} />
            </div>
        </div>
    );
}