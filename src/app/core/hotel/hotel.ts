import { Entity, Field, Fields, IdEntity, remult } from "remult";
import { User } from "../../users/user";

@Entity<Hotel>('hotels', {
    caption: 'מלונות',
    allowApiCrud: () => remult.authenticated()
})
export class Hotel extends IdEntity {

    @Fields.string<Hotel>({ caption: 'שם' })
    name = ''

    @Fields.string<Hotel>({ caption: 'מיקום' })
    address = ''

    @Fields.string<Hotel>({ caption: 'שעת קבלה', inputType: 'time' })
    fh = ''

    @Fields.string<Hotel>({ caption: 'שעת פינוי', inputType: 'time' })
    th = ''

    @Fields.number<Hotel>({ caption: 'מס.חדרים ליחיד' })
    oneRoomTotal = 0

    @Fields.number<Hotel>({ caption: 'מס.חדרים לזוג' })
    twoRoomTotal = 0

    @Fields.number<Hotel>({ caption: 'מס.חדרים לשלושה' })
    threeRoomTotal = 0

    @Fields.number<Hotel>({ caption: 'מס.חדרים לארבעה' })
    fourRoomTotal = 0

}
