import { Entity, Field, Fields, IdEntity, remult } from "remult";
import { User } from "../../users/user";

@Entity<Course>('courses', {
    caption: 'סדנאות',
    allowApiCrud: () => remult.authenticated()
})
export class Course extends IdEntity {

    @Field<Course, User>(() => User, { caption: 'מדריך' })
    guide!: User

    @Fields.string<Course>({ caption: 'שם' })
    name = ''

    @Fields.string<Course>({ caption: 'מיקום' })
    address = ''

    @Fields.string<Course>({ caption: 'משעה', inputType: 'time' })
    fh = ''

    @Fields.string<Course>({ caption: 'עד שעה', inputType: 'time' })
    th = ''

    @Fields.string<Course>({ caption: 'ציוד נלווה' })
    equipment = ''

}
