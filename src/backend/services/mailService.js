const  nodemailer = require('nodemailer')

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            tls: {
                rejectUnauthorized: false 
            }
        })
    }

    async sendActivationMail(to, link){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Активація аккаунту на NotatkaHub!',
            text: '',
            html:
            `
            <div>
                <h1>для активації перейдіть по поссиланю:</h1>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }
}

module.exports = new MailService()