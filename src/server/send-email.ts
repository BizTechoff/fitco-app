import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { NotificationService } from '../app/common/notificationService';


export interface EmailRequest {
    from?: string,
    to?: string,
    cc?: string,
    subject: string,
    html?: string
}


NotificationService.sendEmail = async (req: EmailRequest) => {
    console.debug('send-email', req);
    var transporter = createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env['ADMIN_GMAIL_MAIL'],
            pass: process.env['ADMIN_GMAIL_PASS']
        }
    });

    var mailOptions: Mail.Options = {
        from: `כנס הפיטנס של ישראל <${process.env['ADMIN_GMAIL_MAIL']}>`,
        // from: `כנס הפיטנס של ישראל`,//'Sender Name <sender@server.com>'
        to: req.to ?? process.env['ADMIN_GMAIL_MAIL'],
        // cc: req.sender,
        subject: req.subject,
        date: new Date(),
        html: req.html//,
        // icalEvent: {
        //     filename: 'invite.ics',
        //     method: 'REQUEST',//PUBLISH
        //     content: content
        // }
    };
    new Promise((res, rej) => {
        transporter.sendMail(mailOptions, function (error: any, info: { response: string; }) {
            if (error) {
                // console.log('mail.error');
                console.debug('Email error', error);
                rej(error);
            } else {
                // console.log('mail.ok');
                res(true);
                console.debug('Email sent', info.response);
            }
        });
    });
    return true;
}