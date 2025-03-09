const nodemailer = require('nodemailer');

class MailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "smtp.yandex.com",
            //port: 465,
            secure: true,
            //Parol nyjno sozdat noviy (bydet sgenerirovan avtomaticheski) dla vhoda v ety pochty iz drygogo prilojeniya po protokoly SMTP.
            //Pochta -> Vse nastroiki -> bezopasnost -> paroli prilojeniy
            auth:{
                user: "testforwebdev@yandex.ru",
                pass: "jbozbvasbwltjdov", 
            }
        })
    }
    async sendUserCreateMail(to){
        //console.log("=="+process.env.SMTP_HOST+"=="+process.env.SMTP_USER+"=="+process.env.SMTP_USER_PASSWORD+"=="+process.env.API_URL);
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: `FFFFСоздание пользователья на ${process.env.API_URL}`,
            text: '',
            html: `<div><h1>Пользователь с почтовым адресом ${to} создан на resyrse ${process.env.API_URL}.</h1></div>`
        })
    }
    async sendUserRecoverPasswordMail(to,randomUuid){
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Восстановление пароля на ' + process.env.API_URL,
            text: '',
            html: `<div>Для восстановления пароля для Email ${to} пройдите по указанной ссылке <a href="${randomUuid}">${randomUuid}</a></div>`
            //html: `<div>Для восстановления пароля для Email ${to} пройдите по указанной ссылке <a href="localhost:3000/recover-password/d1f3f5dc-b7df-40ce-b26d-d550c4e84c9f">${randomUuid}</a></div>`
            
        })
    }
}

module.exports = new MailService();