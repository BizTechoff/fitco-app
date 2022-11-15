import { Allow, Entity, Fields, IdEntity, isBackend, remult } from "remult";
import { terms } from "../terms";
import { Roles } from './roles';

@Entity<User>("Users", {
    caption: 'משתמש',
    allowApiRead: Allow.authenticated,
    allowApiUpdate: Allow.authenticated,
    allowApiDelete: Roles.admin,
    allowApiInsert: Roles.admin,
    apiPrefilter: () => !remult.isAllowed(Roles.admin) ? { id: [remult.user?.id!] } : ({}),
    saving: async (user) => {
        if (isBackend()) {
            if (user._.isNew()) {
                user.createDate = new Date();
            }
        }
    }
})
export class User extends IdEntity {

    @Fields.string<User>({
        // validate: [Validators.required, Validators.uniqueOnBackend],
        caption: 'ת.ז'
    })
    idNumber = '';

    @Fields.string<User>({
        // validate: [Validators.required, Validators.uniqueOnBackend],
        caption: terms.username
    })
    name = '';

    @Fields.string<User>({
        // validate: [Validators.required, Validators.uniqueOnBackend],
        caption: 'סלולרי'
    })
    mobile = '';

    @Fields.string<User>({
        // validate: [Validators.required, Validators.uniqueOnBackend],
        caption: 'אימייל'
    })
    email = '';

    @Fields.string<User>({
        // validate: [Validators.required, Validators.uniqueOnBackend],
        includeInApi: false,
        caption: 'קוד אימות'
    })
    validateCode = '';

    @Fields.boolean<User>({
        allowApiUpdate: false,
        caption: 'קוד נשלח'
    })
    validateSent = false;

    @Fields.date<User>({
        // validate: [Validators.required, Validators.uniqueOnBackend],
        allowApiUpdate: false,
        caption: 'שעת שליחה'
    })
    validateSentTime!: Date;

    @Fields.boolean<User>({
        allowApiUpdate: false,
        caption: 'אומת'
    })
    validated = false;

    @Fields.date<User>({
        // validate: [Validators.required, Validators.uniqueOnBackend],
        allowApiUpdate: false,
        caption: 'שעת אימות'
    })
    validateTime!: Date;

    @Fields.string<User>({ includeInApi: false })
    password = '';

    @Fields.date<User>({
        allowApiUpdate: false
    })
    createDate = new Date();

    @Fields.boolean<User>({
        allowApiUpdate: Roles.admin,
        caption: terms.admin
    })
    admin = false;

    @Fields.boolean<User>({
        allowApiUpdate: Roles.admin,
        caption: 'מנהל'
    })
    manager = false;

    @Fields.boolean<User>({
        allowApiUpdate: Roles.admin,
        caption: 'מדריך'
    })
    guide = false;

    @Fields.boolean<User>({
        allowApiUpdate: Roles.admin,
        caption: 'לקוח'
    })
    customer = false;

    // async hashAndSetPassword(password: string) {
    //     this.password = (await import('password-hash')).generate(password);
    // }

    // async passwordMatches(password: string) {
    //     return !this.password || (await import('password-hash')).verify(password, this.password);
    // }

    // @BackendMethod({ allowed: Roles.admin })
    // async resetPassword() {
    //     this.password = '';
    //     await this.save();
    // }

}
