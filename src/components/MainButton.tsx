type ButtonType = {
    name:string,
    callBack: () => void
    disabled?: boolean
    className?:string
}

export function MainButton (props:ButtonType) {
    
    
const OnClickHandler = () => {
    props.callBack()
} 

    return (
        <button
        className={props.className}
        disabled ={props.disabled}
        onClick={OnClickHandler}
        >{props.name}</button>
    )
}