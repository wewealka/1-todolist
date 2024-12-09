import { TextField } from "@material-ui/core"
import { ChangeEvent, KeyboardEvent, useState } from "react"

export type EditableSpanType = {
    title: string
    onChange: (str: string) => void
}

export function EditableSpan(props: EditableSpanType) {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [newTitle, setNewTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const OnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { 
            setEditMode(false)
        }
    }
    const activateEditMode = () => {
        setEditMode(!editMode)
        props.onChange(newTitle)
    }

    return editMode
        ? <TextField
            onBlur={activateEditMode}
            variant={"filled"}
            value={newTitle}
            autoFocus
            onKeyDown={OnKeyPressHandler}
            onChange={onChangeHandler} />
        : <span onDoubleClick={activateEditMode}>{newTitle}</span>
}





 // <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>