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
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: `Создание пользователья на ${process.env.CLIENT_HOST}`,
            text: '',
            html: `<div><h1>Пользователь с почтовым адресом ${to} создан на ${process.env.CLIENT_HOST}.</h1></div>`
        })
    }
    async sendUserRecoverPasswordMail(to,randomUuid){
        const link = `${process.env.CLIENT_HOST}/recover-password/${randomUuid}`;
        const html = 
        '<div>For recover password click to link below and input your new password.</div>'+
        '<a href="'+link+'" target="_blank">'+link+'</a>'+
        '';

        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: 'Восстановление пароля на ' + process.env.CLIENT_HOST,
            text: '',
            html: html
            //html: `<div>Для восстановления пароля для Email ${to} пройдите по указанной ссылке <a href="${randomUuid}">${randomUuid}</a></div>`
            
        })
    }
}

module.exports = new MailService();