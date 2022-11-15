import { ValueListFieldType } from "remult";

@ValueListFieldType<ScheduleStatus>({ caption: 'סטטוס' })
export class ScheduleStatus {
    static new = new ScheduleStatus()
    static payed = new ScheduleStatus()
    constructor(public caption = '') { }
    id!: string
}
