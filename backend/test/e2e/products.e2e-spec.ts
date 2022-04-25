import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';

import { AppModule } from '../../src/app.module';
import { DatabaseService } from '../../src/database/database.service';
import { Product } from '../../src/modules/products/entities/product.entity';
import productFake from './fakes/product.fake';
import { TransformInterceptor } from '../../src/interceptors/transform.interceptor';

describe('(e2e) ProductsController', () => {
    let app: INestApplication;
    let dbConnection: Connection;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        dbConnection = moduleFixture
            .get<DatabaseService>(DatabaseService)
            .getConnection();

        app.setGlobalPrefix('api');
        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalInterceptors(new TransformInterceptor());

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    beforeEach(async () => {
        await dbConnection.getRepository(Product).delete({});
    });

    describe('(GET) /api/products', () => {
        it('should return 200 and valid products', async () => {
            const products = [productFake(), productFake()];
            await dbConnection.getRepository(Product).insert(products);
            const response = await request(app.getHttpServer()).get(
                '/api/products'
            );

            expect(response.body.statusCode).toBe(200);
            expect(response.body.data).toEqual([
                expect.objectContaining({
                    name: products[0].name,
                    description: products[0].description,
                    category: products[0].category,
                    imageUrl: products[0].imageUrl,
                    price: products[0].price.toString(),
                }),
                expect.objectContaining({
                    name: products[1].name,
                    description: products[1].description,
                    category: products[1].category,
                    imageUrl: products[1].imageUrl,
                    price: products[1].price.toString(),
                }),
            ]);
        });
    });
});
