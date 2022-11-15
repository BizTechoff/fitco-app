import { ValueListFieldType } from "remult";

@ValueListFieldType<ShirtSize>({ caption: 'מידת חולצה' })
export class ShirtSize {
    static S = new ShirtSize()
    static M = new ShirtSize()
    static L = new ShirtSize()
    static XL = new ShirtSize()
    static XXL = new ShirtSize()
    constructor(public caption = '') { }
    id!: string
}
