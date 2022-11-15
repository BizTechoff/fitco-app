import { Allow, BackendMethod, Controller, ControllerBase, Fields, remult, UserInfo, Validators } from "remult";
import { getRequest } from "../../server/getRequest";
import { NotificationService } from "../common/notificationService";
import { terms } from "../terms";
import { Roles } from "./roles";
import { User } from "./user";

@Controller('signIn')
export class SignInController extends ControllerBase {

    validVerificationCodeResponseMinutes = 5

    @Fields.string({
        // validate: [Validators.required, Validators.uniqueOnBackend],
        caption: 'ת.ז',
        validate: Validators.required
    })
    idNumber = '';

    @Fields.string({
        caption: terms.username//,
        // validate: Validators.required
    })
    user = '';

    @Fields.string({
        caption: terms.password,
        // validate: Validators.required,
        inputType: 'password'
    })
    password = '';

    @Fields.string({
        caption: 'סלולרי'
    })
    mobile = '';

    @Fields.string({
        caption: 'קוד אימות'//,
        // validate: Validators.required
    })
    validateCode = '';

    @Fields.boolean({
        caption: terms.rememberOnThisDevice,
    })
    rememberOnThisDevice = false;

    // constructor() {
    //     super(remult)
    //     SignInController.signOut()
    // }


    @BackendMethod({ allowed: () => !remult.authenticated })
    async checkUserState() {
        let u = await this.getUser()
        if (u) {
            await this.routeUser()
        }
        else {
            await this.registerUser()
        }
    }

    async getUser() {
        let u!: User
        return u
    }

    async routeUser() { }

    async registerUser() { }

    idValidIdNumber(id = '') {

    }


    @BackendMethod({ allowed: true })
    /**
     * This sign mechanism represents a simplistic sign in management utility with the following behaviors
     * 1. The first user that signs in, is created as a user and is determined as admin.
     * 2. When a user that has no password signs in, that password that they've signed in with is set as the users password
     */
    async signIn() {
        let result: UserInfo | undefined;
        // const userRepo = remult.repo(User);
        // let u = await userRepo.findFirst({ name: this.user });
        // if (!u) {
        //     if (await userRepo.count() === 0) { //first ever user is the admin
        //         u = await userRepo.insert({
        //             name: this.user,
        //             admin: true
        //         })
        //     }
        // }
        // if (u) {
        //     if (!u.password) { // if the user has no password defined, the first password they use is their password
        //         u.hashAndSetPassword(this.password);
        //         await u.save();
        //     }

        //     if (await u.passwordMatches(this.password)) {
        //         result = {
        //             id: u.id,
        //             roles: [],
        //             name: u.name
        //         };
        //         if (u.admin) {
        //             result.roles!.push(Roles.admin);
        //         }
        //     }
        // }

        // if (result) {
        //     const req = getRequest();
        //     req.session!['user'] = result;
        //     if (this.rememberOnThisDevice)
        //         req.sessionOptions.maxAge = 365 * 24 * 60 * 60 * 1000; //remember for a year
        return result;
        // }
        // throw new Error(terms.invalidSignIn);
    }

    @BackendMethod({ allowed: true })
    /**
     * This sign mechanism represents a simplistic sign in management utility with the following behaviors
     * 1. The first user that signs in, is created as a user and is determined as admin.
     * 2. When a user that has no password signs in, that password that they've signed in with is set as the users password
     */
    async validateMobile() {
        console.log(11)
        // let sent = await NotificationService.SendEmail({
        //     subject: 'קוד אימות',
        //     to: 'motidru@gmail.com',
        //     html: 'קוד אימות: [XXXXXX] תקף לחמש דקות'
        // })
        // console.log(22, sent)
    }

    @BackendMethod({ allowed: () => !remult.authenticated() })
    async checkIdNumber() {
        let exists = false
        console.log('this.idNumber', this.idNumber)
        if (this.is_israeli_id_number(this.idNumber)) {
            let u = await remult.repo(User).findFirst(
                { idNumber: this.idNumber },
                {
                    useCache: false,
                    createIfNotFound: true
                })
            exists = !u.isNew()
            console.log(`idNumber ${u.idNumber} ${exists ? '' : 'NOT'} EXISTS`)
        }
        else {
            console.log(`idNumber ${this.idNumber} NOT VALID`)
        }
        return exists
        // u.validateCode = code.toString()
        // u.validateSentTime = new Date()
        // u.validateTime = undefined!
        // u.validateSent = false
        // u.validated = false
        // await u.save()

        // let sent = await NotificationService.SendEmail({
        //     subject: `קוד אימות תקף לחמש דקות`,
        //     to: 'motidru@gmail.com',
        //     html: `<div dir="rtl">${code}<br/><br/>בברכה,<br/>צוות התפעול<div>`
        // })
        // u.validateSent = sent
        // await u.save()
    }

    is_israeli_id_number(idString = '') {
        let id = idString + ''
        console.log('idString', id)
        // let id = String(idNmber).trim();
        if (id.length > 9 || isNaN(parseInt(id))) return false;
        id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
        console.log('Array.from(id, Number)', Array.from(id))
        return Array.from(id, Number).reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;
    }

    @BackendMethod({ allowed: () => !remult.authenticated() })
    async sendValidateCode() {
        let code = this.generateCode()
        let u = await remult.repo(User).findFirst({ mobile: this.mobile }, { useCache: false, createIfNotFound: true })
        u.validateCode = code.toString()
        u.validateSentTime = new Date()
        u.validateTime = undefined!
        u.validateSent = false
        u.validated = false
        await u.save()

        let sent = await NotificationService.SendEmail({
            subject: `קוד אימות תקף לחמש דקות`,
            to: 'motidru@gmail.com',
            html: `<div dir="rtl">${code}<br/><br/>בברכה,<br/>צוות התפעול<div>`
        })
        u.validateSent = sent
        await u.save()
    }

    generateCode() {
        let min = 700000
        let max = 999999
        return Math.floor(Math.random() * (max - min) + min)
    }

    @BackendMethod({ allowed: () => !remult.authenticated() })
    async signInUser() {
        let result: UserInfo | undefined;
        const userRepo = remult.repo(User);
        let u = await userRepo.findFirst({ mobile: this.mobile }, { useCache: false });
        if (u) {
            u.validateTime = new Date()
            await u.save()
            if (+this.validateCode === +u.validateCode) {
                if (this.isValidTime(u.validateSentTime)) {
                    u.validated = true
                    await u.save()
                    console.log(u.validateTime)
                    result = {
                        id: u.id,
                        roles: [],
                        name: u.name,
                        isAdmin: false,
                        isManager: false,
                        isGuide: false,
                        isCustomer: false
                    };
                    if (u.admin) {
                        result.roles!.push(Roles.admin);
                        result.isAdmin = true
                    }
                    else if (u.manager) {
                        result.roles!.push(Roles.manager);
                        result.isManager = true
                    }
                    else if (u.guide) {
                        result.roles!.push(Roles.guide);
                        result.isGuide = true
                    }
                    else if (u.customer) {
                        result.roles!.push(Roles.customer);
                        result.isCustomer = true
                    }

                    const req = getRequest();
                    req.session!['user'] = result;
                    if (this.rememberOnThisDevice)
                        req.sessionOptions.maxAge = 365 * 24 * 60 * 60 * 1000; //remember for a year
                    return result;
                }
            }
        }
        throw new Error(terms.invalidSignIn);
    }

    isValidTime(time: Date) {
        let now = new Date();
        let minValidTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes() - this.validVerificationCodeResponseMinutes);
        return (time >= minValidTime) ?? false
    }

    @BackendMethod({ allowed: Allow.authenticated })
    static signOut() {
        getRequest().session!['user'] = undefined;
    }

    @BackendMethod({ allowed: true })
    static currentUser() {
        return remult.user;
    }

}
