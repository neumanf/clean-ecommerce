import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AppConfig from './config/app.config';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [AppConfig],
        }),
        ProductsModule,
        DatabaseModule,
        MailModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
