import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import AppConfig from './config/app.config';
import { ProductsModule } from './modules/products/products.module';
import { Product } from './modules/products/entities/product.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [AppConfig],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: configService.get('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.name'),
                entities: [Product],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        ProductsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
