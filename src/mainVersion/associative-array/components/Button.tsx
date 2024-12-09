import { IconButton, Button as MainButton } from "@material-ui/core"
import { ControlPoint, Delete } from "@material-ui/icons";

type ButtonType = {
    name?: string;
    callBack: () => void;
    disabled?: boolean;
    className?: string;
};

export function AddButton(p: ButtonType) {
    return (
        <IconButton onClick={p.callBack} color={"primary"} disabled={p.disabled}>
            <ControlPoint/>
        </IconButton>
    );
}

export function RemoveTaskButton(p: ButtonType) {
    return (
        <MainButton className={p.className} disabled={p.disabled} onClick={p.callBack} variant={"outlined"} color={"primary"}>
            {p.name}
        </MainButton>
    );
}
export function RemoveButton(p: ButtonType) {
    return (
        <IconButton onClick={p.callBack}>
            <Delete />
        </IconButton>
    );
}
