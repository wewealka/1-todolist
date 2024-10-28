import { ChangeEvent, KeyboardEvent, useState } from "react";
import { MainButton } from "../mainbtn/MainButton";
import { usageAddNote } from "../../data/DataButton-2-todolist";
import { ConceptWindowsPropsType } from "../../layout/ConceptWindows";

export type InputConWinType = {
    newNote:ConceptWindowsPropsType[]
    setNewNote:React.Dispatch<React.SetStateAction<ConceptWindowsPropsType[]>>
}

export const InputConWin:React.FC<InputConWinType> = ({newNote, setNewNote}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");


    const newTitleChangeHeandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.trim() !== "" && !/ {2}/.test(value)) {

        }
        setNewTaskTitle(value);
        
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNote()
        }
    };
    const addNote = () => {
        if (newTaskTitle.trim() === "" || / {2}/.test(newTaskTitle)) {
            setNewTaskTitle("");
        } else {
            const currentState = usageAddNote(newNote,newTaskTitle)
            setNewNote(currentState)
            setNewTaskTitle("")
        }
    };


    return (
        <div>
            <input
                value={newTaskTitle}
                onChange={newTitleChangeHeandler}
                onKeyDown={onKeyPressHandler}
            />
            <MainButton
                name={"+"}
                callBack={addNote}
            />
        </div>
    );
}
