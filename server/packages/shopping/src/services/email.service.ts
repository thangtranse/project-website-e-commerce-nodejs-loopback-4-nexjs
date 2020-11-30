import * as nodemailer from 'nodemailer';
import { IEmail } from '../type-schema';

export interface EmailManager<T = Object> {
  sendMail(mailObj: IEmail): Promise<T>;
}

export class EmailService {
  constructor() { }

  async sendMail(mailObj: IEmail): Promise<object> {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      tls: {
        "rejectUnauthorized": false
      },
      auth: {
        user: "thangtran.services@gmail.com", // generated ethereal user
        pass: "KimNgan1109@321", // generated ethereal password
      },
    });
    return await transporter.sendMail(mailObj);
  }
}