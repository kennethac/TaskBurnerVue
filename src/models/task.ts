import moment from 'moment'

export default class Task {
    name: string;
    scheduledDate: Date;
    dueDate: Date;
    complete: boolean;

    constructor(name: string, dueDate: Date, scheduledDate: Date, complete: boolean) {
        this.name = name;
        this.dueDate = dueDate;
        this.scheduledDate = scheduledDate;
        this.complete = complete;
    }

    static from(obj: any) {
        let newTask = new Task(obj.name, obj.dueDate, obj.scheduledDate, obj.complete);
        newTask.confirmDates();
        return newTask;
    }

    confirmDates() {
        if (!(this.dueDate instanceof Date)) {
            this.dueDate = new Date(this.dueDate);
        }

        if (!(this.scheduledDate instanceof Date)) {
            this.scheduledDate = new Date(this.scheduledDate);
        }
    }

    get shortDueDate() {
        return moment(this.dueDate).format("MM/DD/YYYY");
    }

    get shortScheduledDate() {
        return moment(this.scheduledDate).format("MM/DD/YYYY");
    }
}