import { createTransport } from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'
import { NODEMAILER_FROM, NODEMAILER_PASS, NODEMAILER_SERVICE, NODEMAILER_USER } from '../config/env'

interface SendEmailObject {
    to: Mail.Options['to']
    subject: Mail.Options['subject']
    message: {
        text?: Mail.Options['text']
        html?: Mail.Options['html']
    }
}

export class EmailService {
    private static transporter = createTransport({
        service: NODEMAILER_SERVICE,
        auth: {
            user: NODEMAILER_USER,
            pass: NODEMAILER_PASS
        }
    })


    public static async send(params: SendEmailObject) {
        return this.transporter.sendMail({
            from: NODEMAILER_FROM,
            subject: params.subject,
            to: params.to,
            html: params.message.html,
            text: params.message.text,
        })
    }
}
