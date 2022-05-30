import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { ProductsController } from '../../../../src/modules/products/products.controller';
import { ProductsService } from '../../../../src/modules/products/products.service';

describe('ProductsController', () => {
    let sut: ProductsController;
    let productsService: ProductsService;

    const mockProductsService = {
        findAll: () => { },
        findById: () => { },
        create: () => { },
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [{
                provide: ProductsService,
                useValue: mockProductsService
            }]
        }).compile();

        sut = module.get<ProductsController>(ProductsController);
        productsService = module.get<ProductsService>(ProductsService);
    });

    describe("findAll", () => {
        it("should return an array of products", async () => {
            const productsStub = [
                {
                    id: 0,
                    name: "any_name",
                    description: "any_description",
                    category: "any_category",
                    imageUrl: "https://image.png",
                    price: 0.0,
                }
            ]
            jest.spyOn(productsService, 'findAll').mockImplementation(async () => productsStub);

            const result = await sut.findAll();

            expect(result).toBe(productsStub);
        })
    })

    describe("findById", () => {
        it("should return a product if product exists", async () => {
            const productStub =
            {
                id: 0,
                name: "any_name",
                description: "any_description",
                category: "any_category",
                imageUrl: "https://image.png",
                price: 0.0,
            }
            jest.spyOn(productsService, 'findById').mockImplementation(async () => productStub);

            const result = await sut.findById({ id: 0 });

            expect(result).toBe(productStub);
        })

        it("should throw an error if product does not exists", async () => {
            jest.spyOn(productsService, 'findById').mockImplementation(async () => null);

            expect(sut.findById({ id: 0 })).rejects.toEqual(new NotFoundException('Product not found.'));
        })
    })
});
