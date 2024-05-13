import type { Task } from "./Task";

export interface List {
    name: string;
    tasks: Task[];
    filteringOptions: {};
}
