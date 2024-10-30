import { ChangeEvent, KeyboardEvent, useState } from "react";
import { MainButton } from "../mainbtn/MainButton";
import { TaskType } from "../../layout/ConceptWindows";

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
        if (isInputEmpty || / {2}/.test(newTaskTitle)) {
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
            <input
                value={newTaskTitle}
                onChange={newTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
                className={inputError ? "error" : undefined}
            />
            <MainButton
                disabled={isInputEmpty || isTooManyChars}
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