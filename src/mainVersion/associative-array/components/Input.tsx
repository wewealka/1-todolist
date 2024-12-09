import { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddButton } from "./Button";
import { TextField } from "@material-ui/core";


type CombinedInputProps = {
    newTaskTitle: string;
    setNewTaskTitle: (title: string) => void;
    onSubmit: () => void; 
};

export const CombinedInput: React.FC<CombinedInputProps> = ({
    newTaskTitle,
    setNewTaskTitle,
    onSubmit,
}) => {
    const [inputError, setInputError] = useState<boolean>(false);
    const isInputEmpty = !newTaskTitle.trim();
    const charsLeft = 20 - newTaskTitle.length;
    const isTooManyChars = newTaskTitle.length > 20;

    const newTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputError(false);
        setNewTaskTitle(value);
    };

    const handleSubmit = () => {
        if (isInputEmpty) {
            setInputError(true);
        } else {
            onSubmit();
            setInputError(false);
        }
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !isTooManyChars) {
            handleSubmit();
        }
    };

    return (
        <div>
            <TextField
                value={newTaskTitle}
                variant={"outlined"}
                label={"Add new"}
                onChange={newTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
                error={!!inputError}
            />
            <AddButton
                disabled={isTooManyChars}
                name={"+"}
                callBack={handleSubmit}
            />
            {!isInputEmpty && !isTooManyChars && !inputError && (
                <div>{charsLeft} chars left</div>
            )}
            {isTooManyChars && <div style={{ color: "red" }}>Too many chars</div>}
            {inputError && <div style={{ color: "red" }}>Title is required!</div>}
        </div>
    );
};

// const handleSubmit = () => {
//     if (isInputEmpty || / {2}/.test(newTaskTitle)) {
//         setInputError(true);
//     } else {
//         onSubmit();
//         setInputError(false);
//     }
// };
// custom errorcatcher: check is empty  && check how much spaces were. in our case - (2) - {2}. This handler allows to get diff callbacks && u can reuse this componetn in ur project. 
