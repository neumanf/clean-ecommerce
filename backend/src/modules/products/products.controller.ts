import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { FindProductDto } from './dtos/find-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findOne(@Param() { id }: FindProductDto): Promise<Product> {
        const product = await this.productsService.findOne(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return product;
    }
}
