import { Entity, Fields, IdEntity } from "remult";

@Entity('courses', (options, remult) => {
    options.caption = 'סדנאות'
    options.allowApiCrud = () => remult.authenticated()
})
export class Course extends IdEntity {

    @Fields.string<Course>({ caption: 'שם' })
    name = ''

}
