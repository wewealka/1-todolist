import { ConceptWindowsPropsType, TaskType } from "../layout/ConceptWindows";
import { v1 } from "uuid";
export const InitialTasks: Array<ConceptWindowsPropsType> = [
    {   
        cwId: v1(),
        title: "What to learn",
        tasks: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS/TS", isDone: false },
            { id: v1(), title: "Redux", isDone: false },
        ],
    }
];
export const usageAddNote = (database:ConceptWindowsPropsType[], newTitle:string) => {
    return [
        ...database,
        {   
            cwId: v1(),
            title: newTitle,
            tasks: []
        }
    ];
}

test("immutability note", ()=> {

    const newBase = usageAddNote(InitialTasks, "trip")
    expect(newBase).not.toBe(InitialTasks)
    expect(newBase[1].title).toBe("trip")
    expect(newBase[1].tasks).toEqual([])
    expect(InitialTasks[0].title).toBe("What to learn")

})

///////////////////////////////////////////////////////////////////////////////////////

export const usageAddTask = (tasks: TaskType[], title: string): TaskType[] => {     
    const newTask: TaskType = {
        id: v1(),
        title: title,
        isDone: false
    };
    return [newTask, ...tasks];
}

const tasksIn = [
    { id: v1(), title: "HTML", isDone: true },
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS/TS", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
]

test("immutability ask array", ()=> {
    const newTasks = usageAddTask(tasksIn, "trip")
    expect(newTasks).not.toBe(tasksIn)
    expect(newTasks[0].title).toBe("trip")
    expect(newTasks[0].isDone).toBe(false)
    expect(tasksIn[0].title).toBe("HTML")
    expect(tasksIn[0].isDone).toBe(true)

})