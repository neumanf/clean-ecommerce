import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from './modules/products/products.module';
import { Product } from './modules/products/entities/product.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Product],
            synchronize: true,
        }),
        ProductsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
