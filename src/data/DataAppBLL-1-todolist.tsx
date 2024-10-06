import { v1 } from "uuid";
import { ConceptWindowsPropsType } from "../layout/ConceptWindows";



export const InitialTasks: Array<ConceptWindowsPropsType> = [
    {
        title: "What to learn",
        tasks: [
            { id: v1(), title: "HTML", isDone: true },
            { id: v1(), title: "CSS", isDone: true },
            { id: v1(), title: "JS/TS", isDone: false },
            { id: v1(), title: "Redux", isDone: false },
        ],
    },
    {
        title: "What to buy",
        tasks: [
            { id: v1(), title: "Cola", isDone: false },
            { id: v1(), title: "Whiskey", isDone: false },
            { id: v1(), title: "Ice", isDone: false },
        ],
    },
    {
        title: "What a Goal",
        tasks: [
            { id: v1(), title: "Comp", isDone: false },
            { id: v1(), title: "Mouse", isDone: false },
            { id: v1(), title: "Keyboard", isDone: false },
        ],
    },
    {
        title: "device_by",
        tasks: [
            { id: v1(), title: "Header", isDone: false },
            { id: v1(), title: "Main", isDone: false },
            { id: v1(), title: "Contacts", isDone: false },
            { id: v1(), title: "About us", isDone: false },
            { id: v1(), title: "Store", isDone: false },
        ],
    },
    {
        title: "AI make up",
        tasks: [
            { id: v1(), title: "Global", isDone: false },
            { id: v1(), title: "Documents", isDone: false },
            { id: v1(), title: "Start", isDone: false },
            { id: v1(), title: "Mid game", isDone: false },
            { id: v1(), title: "Late game", isDone: false },
            { id: v1(), title: "WIN", isDone: false },
        ],
    },
    {
        title: "encrypt/decrypt",
        tasks: [
            { id: v1(), title: "encrypt", isDone: true },
            { id: v1(), title: "Documents", isDone: false },
        ],
    },
];
console.log(InitialTasks)

