type ButtonType = {
    name:string,
    callBack: () => void
    disabled?: boolean
}

export function MainButton (props:ButtonType) {
    
    
const OnClickHandler = () => {
    props.callBack()
} 

    return (
        <button
        disabled ={props.disabled}
        onClick={OnClickHandler}
        >{props.name}</button>
    )
}