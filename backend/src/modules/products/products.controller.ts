import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { FindProductByIdDto } from './dtos/find-product-by-id.dto';
import { CreateProductDto } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async findAll(): Promise<Product[]> {
        return this.productsService.findAll();
    }

    @Get(':id')
    async findById(@Param() { id }: FindProductByIdDto): Promise<Product> {
        const product = await this.productsService.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return product;
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }
}
