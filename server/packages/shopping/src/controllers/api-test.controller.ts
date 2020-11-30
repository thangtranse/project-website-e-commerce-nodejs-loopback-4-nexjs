import { inject } from '@loopback/context';
import {


  repository
} from '@loopback/repository';
import {
  get, HttpErrors
} from '@loopback/rest';
import { EmailManagerBindings } from '../keys';
import { AppSettingRepository } from '../repositories';
import { EmailManager } from '../services/email.service';

export class ApiTestController {
  constructor(
    @repository(AppSettingRepository)
    public appSettingRepository: AppSettingRepository,

    @inject(EmailManagerBindings.SEND_MAIL)
    public emailManager: EmailManager,

  ) { }

  @get('/test/email/sending', {
    responses: {
      '200': {
        description: 'Test Send Email'
      },
    },
  })
  async count(): Promise<{}> {
    const mailOptions = {
      to: "thangtran.se@gmail.com",
      subject: "Email thông báo!",
      html: "<h1>Email Thông báo Gửi từ Vuonhoahong.vn</h1>"
    };
    return await this.emailManager.sendMail(mailOptions).then(function (res: any) {
      return { message: `Successfully sent reset mail to ${mailOptions.to}` };
    }).catch(function (err: any) {
      console.log(err)
      throw new HttpErrors.UnprocessableEntity(`Error in sending E-mail to ${mailOptions.to}`);
    });
  }
}
