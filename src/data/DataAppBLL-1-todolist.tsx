import { ConceptWindowsPropsType } from "../layout/ConceptWindows";



export const InitialTasks: Array<ConceptWindowsPropsType> = [
    {
        title: "What to learn",
        tasks: [
            { id: 1, title: "HTML", isDone: true },
            { id: 2, title: "CSS", isDone: true },
            { id: 3, title: "JS/TS", isDone: false },
            { id: 4, title: "Redux", isDone: false },
        ],
    },
    {
        title: "What to buy",
        tasks: [
            { id: 5, title: "Cola", isDone: true },
            { id: 6, title: "Whiskey", isDone: true },
            { id: 7, title: "Ice", isDone: false },
        ],
    },
    {
        title: "What a Goal",
        tasks: [
            { id: 8, title: "Comp", isDone: false },
            { id: 9, title: "Mouse", isDone: false },
            { id: 10, title: "Keyboard", isDone: false },
        ],
    },
];

