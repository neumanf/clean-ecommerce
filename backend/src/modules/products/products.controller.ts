import { Controller, Get } from '@nestjs/common';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }
}
