import { ChangeEvent, KeyboardEvent } from "react";
import { MainButton } from "../MainButton";

{/* interface */} type MainInputProps = {
    newTaskTitle: string;
    setNewTaskTitle?: (title: string) => void;
    AddTask?: () => void;
}

const defaultAddTitle = () => {};//Fallback 

export const MainInput: React.FC<MainInputProps> = ({newTaskTitle,setNewTaskTitle, AddTask}) => {

    const InputController = !newTaskTitle
    const ULM = `${10-newTaskTitle.length} chars left`
    const ULMcontrollerUI = newTaskTitle.length > 10 
    const ULMcontroller = newTaskTitle.length <= 10 

    
    const NewTitleChangeHeandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle?.(e.target.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            ULMcontroller ? AddTask?.() : alert("Message should be correct");
        }
    }
    return (
        <div>
            <input
            value={newTaskTitle}
            onChange={NewTitleChangeHeandler}
            onKeyDown={onKeyPressHandler}/>
            <MainButton
                disabled = {InputController || ULMcontrollerUI}
                name={"+"}
                callBack={AddTask || defaultAddTitle} />
            {(!InputController && !ULMcontrollerUI) && <div>{ULM}</div>}
            {ULMcontrollerUI && <div style={{color: "red"}}>Too many chars</div>}
        </div>
    );
}; 