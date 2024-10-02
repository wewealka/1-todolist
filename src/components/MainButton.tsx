type ButtonType = {
    name:string,
    callBack: () => void
}

export function MainButton (props:ButtonType) {
    
    
const OnClickHandler = () => {
    props.callBack()
} 

    return (
        <button onClick={OnClickHandler}>{props.name}</button>
    )
}