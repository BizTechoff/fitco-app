import { Entity, Field, Fields, IdEntity, remult } from "remult";
import { Order } from "./order";

@Entity<Payment>('payments', {
    caption: 'תשלומים',
    allowApiCrud: () => remult.authenticated()
})
export class Payment extends IdEntity {

    @Field<Payment, Order>(() => Order, { caption: 'הזמנה' })
    order!: Order

    @Fields.string<Payment>({ caption: 'קופון' })
    coupon = ''

    @Fields.number<Payment>({ caption: 'סכום' })
    sum = ''

}
