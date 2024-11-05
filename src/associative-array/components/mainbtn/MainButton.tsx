type ButtonType = {
    name: string;
    callBack: () => void;
    disabled?: boolean;
    className?: string;
};

export function MainButton({ name, callBack, disabled, className }: ButtonType) {
    return (
        <button className={className} disabled={disabled} onClick={callBack}>
            {name}
        </button>
    );
}

