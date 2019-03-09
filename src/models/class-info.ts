import Task from './task';

export default interface ClassInfo {
    classTitle: string,
    loading: boolean,
    tasks: Array<Task>,
    lastUpdated: Date
}