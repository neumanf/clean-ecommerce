import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;

    constructor(private readonly configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: this.configService.get('mail.user'),
                clientId: this.configService.get('oauth.clientId'),
                clientSecret: this.configService.get('oauth.clientSecret'),
                accessToken: this.configService.get('oauth.accessToken'),
                refreshToken: this.configService.get('oauth.refreshToken'),
            },
        });
    }

    async sendMail(from: string, to: string, subject: string, text: string) {
        return this.transporter.sendMail({
            from,
            to,
            subject,
            text,
        });
    }
}
