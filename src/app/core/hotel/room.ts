import { Entity, Field, Fields, IdEntity, remult } from "remult";
import { Hotel } from "./hotel";

@Entity<Room>('rooms', {
    caption: 'חדרים',
    allowApiCrud: () => remult.authenticated()
})
export class Room extends IdEntity {

    @Field<Room, Hotel>(() => Hotel, { caption: 'מלון' })
    hotel!: Hotel

    @Fields.string<Room>({ caption: 'תפוסה' })
    capacity = ''

    @Fields.number<Room>({ caption: 'קומה' })
    floor = 0

    @Fields.boolean<Room>({ caption: 'נוף לים' })
    viewSea = false

    @Fields.boolean<Room>({ caption: 'נוף לבריכה' })
    viewPool = false

    @Fields.boolean<Room>({ caption: 'נוף לרחוב' })
    viewStreet = false

    @Fields.boolean<Room>({ caption: 'נוף לטבע' })
    viewNature = false

}
 