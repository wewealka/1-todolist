import { ChangeEvent, useState } from 'react';
import { FilterValuesType } from '../../data/DataApp';
import { RemoveButton} from '../../components/Button';
import { EditableSpan } from '../../components/Span';
import { Button, Checkbox } from '@material-ui/core';
import { CombinedInput } from '../../components/Input';
import { useAutoAnimate } from '@formkit/auto-animate/react';


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
    const [title, setTitle] = useState<string>("");
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    const onSpanChangeHandler = () => {
        props.spansChanger(props.keyListId, title)
    }
    const onSpanTaskChangeHandler = (taskId: string, newTitle: string) => {
        props.changeTaskTitle(props.keyListId, taskId, newTitle);
    };
    const addTaskHandler = () => {
        props.addTask(props.keyListId, title)
        setTitle("")
    }
    const removeNoteHandler = () => {
        props.removeNote(props.keyListId)
    }

    return (
        <div >
            <EditableSpan
                title={props.title}
                onChange={onSpanChangeHandler}
            />
            <RemoveButton callBack={removeNoteHandler} />
            <div>
                <CombinedInput newTaskTitle={title} setNewTaskTitle={setTitle} onSubmit={addTaskHandler}/>
            </div>
            <ul ref={listRef} style={{listStyleType:"none"}}>
                {props.tasks.map(t => {
                    const onClickRemoveHandler = () => props.removeTask(props.keyListId, t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.keyListId, t.id, e.currentTarget.checked);
                    };
                    return (
                        <li key={t.id} className={t.isDone ? "task-done" : ""}>
                            <Checkbox onChange={onChangeHandler}checked={t.isDone} color={"error"} />
                            <EditableSpan title={t.title} onChange={(newTitle) => onSpanTaskChangeHandler(t.id, newTitle)} />
                            <RemoveButton callBack={onClickRemoveHandler} />
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button variant={props.filter === 'all' ? "contained" : "text"} onClick={() => props.changeFilter(props.keyListId, "all")} color={"error"} >All</Button>
                <Button variant={props.filter === 'active' ? "contained" : "text"} onClick={() => props.changeFilter(props.keyListId, "active")} color={"primary"}>Active</Button>
                <Button variant={props.filter === 'completed' ? "contained" : "text"} onClick={() => props.changeFilter(props.keyListId, "completed")} color={"secondary"}>Completed</Button>
            </div>
        </div>
    );
}