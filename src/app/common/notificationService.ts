import { BackendMethod } from "remult";
import { EmailRequest } from "../../server/send-email";

export class NotificationService {

    static sendEmail: (req: EmailRequest) => Promise<boolean>;

    @BackendMethod({ allowed: true })
    static async SendEmail(req: EmailRequest) {
        return await NotificationService.sendEmail(req);
    }

}
