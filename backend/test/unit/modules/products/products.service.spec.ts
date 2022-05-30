import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsService } from '../../../../src/modules/products/products.service';
import { Product } from '../../../../src/modules/products/entities/product.entity';

describe('ProductsService', () => {
    let sut: ProductsService;
    let productsRepository: Repository<Product>;

    const mockProductsRepository = {
        find: () => { },
        findOne: () => { },
        save: () => { },
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService,
                {
                    provide: getRepositoryToken(Product),
                    useValue: mockProductsRepository
                }],
        }).compile();

        sut = module.get<ProductsService>(ProductsService);
        productsRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });
});
