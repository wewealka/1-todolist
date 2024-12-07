
type ButtonType = {
    name: string;
    callBack: () => void;
    disabled?: boolean;
    className?: string;
};

export function Button(p:ButtonType) {
    return (
        <button className={p.className} disabled={p.disabled} onClick={p.callBack}>
            {p.name}
        </button>
    );
}

