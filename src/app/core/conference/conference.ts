import { Entity, Field, Fields, IdEntity, remult } from "remult";
import { User } from "../../users/user";

@Entity<Conference>('conferences', {
    caption: 'כנסים',
    allowApiCrud: () => remult.authenticated()
})
export class Conference extends IdEntity {

    @Fields.string<Conference>({ caption: 'שם' })
    name = ''

    @Fields.string<Conference>({ caption: 'מיקום' })
    address = ''

    @Fields.dateOnly<Conference>({ caption: 'מתאריך' })
    fd!:Date

    @Fields.dateOnly<Conference>({ caption: 'עד תאריך' })
    td!:Date

}
