import { Entity, Field, Fields, IdEntity, remult } from "remult";
import { User } from "../../users/user";
import { Course } from "./course";
import { ScheduleStatus } from "./scheduleStatus";

@Entity<Schedule>('schedules', {
    caption: 'מערכת שעות',
    allowApiCrud: () => remult.authenticated()
})
export class Schedule extends IdEntity {

    @Field<Schedule, User>(() => User, { caption: 'לקוח' })
    customer!: User

    @Field<Schedule, Course>(() => Course, { caption: 'סדנא' })
    course!: Course

    @Field<Schedule, ScheduleStatus>(() => ScheduleStatus, { caption: 'סטטוס' })
    status!: ScheduleStatus

    @Fields.string<Schedule>({ caption: 'שעת רישום', inputType: 'time' })
    timeRegistered = ''

}
