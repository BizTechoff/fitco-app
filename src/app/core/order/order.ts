import { Entity, Field, Fields, IdEntity, remult } from "remult";
import { User } from "../../users/user";
import { Room } from "../hotel/room";

@Entity<Order>('orders', {
    caption: 'הזמנות',
    allowApiCrud: () => remult.authenticated()
})
export class Order extends IdEntity {

    @Field<Order, User>(() => User, { caption: 'לקוח' })
    customer!: User

    @Field<Order, Room>(() => Room, { caption: 'חדר' })
    room!: Room

    @Fields.number<Order>({ caption: 'סכום' })
    sum = 0

}
