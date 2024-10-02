
import './App.css';
import { TodoList } from './TodoList';



export type FiltersValuesType = "All" | "Active" | "Completed";



export function App() {
    return (
        <div className="App">
            <TodoList/>
        </div>
    );
}

export default App;

//2-end way to work with useState
    // **************************************************************
    // let arr1 = useState(InitialTasks_1);
    // let Tasks_1 = arr1[0]; // Текущее состояние
    // let setTasks_1 = arr1[1]; // Функция для обновления состояния

    // let arr2 = useState(InitialTasks_2);
    // let Tasks_2 = arr2[0]; // Текущее состояние
    // let setTasks_2 = arr2[1]; // Функция для обновления состояния
    // ***************************************************************

    // const [Tasks_1, setTasks_1] = useState(InitialTasks_1)
    // const [Tasks_2, setTasks_2] = useState(InitialTasks_2)

    // function RemoveTask(id: number) {

    //     let FilterderTasks_1 = Tasks_1.filter(Tasks_1 => Tasks_1.id !== id);
    //     setTasks_1(FilterderTasks_1);

    //     let FilterderTasks_2 = Tasks_2.filter(Tasks_2 => Tasks_2.id !== id);
    //     setTasks_2(FilterderTasks_2);
    
    // }

    

    // const [Filter1, SetFilter1] = useState<FiltersValuesType>("All");
    // const [Filter2, SetFilter2] = useState<FiltersValuesType>("All");

    // function ChangeFilter1(value: FiltersValuesType) {
    //     SetFilter1(value);
    // }
    
    // function ChangeFilter2(value: FiltersValuesType) {
    //     SetFilter2(value);
    // }

    // const filterTasks = (tasks: TaskType[], filter: FiltersValuesType) => {
    //     if (filter === "Completed") {
    //         return tasks.filter(task => task.isDone);
    //     }
    //     if (filter === "Active") {
    //         return tasks.filter(task => !task.isDone);
    //     }
    //     return tasks; // "All"
    // };

    // const Tasks_1FoTodoList = filterTasks(Tasks_1, Filter1);
    // const Tasks_2FoTodoList = filterTasks(Tasks_2, Filter2);
    