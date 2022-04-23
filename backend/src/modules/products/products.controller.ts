import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':productId')
    async findOne(@Param('productId') productId: number): Promise<Product> {
        const product = await this.productsService.findOne(productId);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return product;
    }
}
