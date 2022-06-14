import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    NotFoundException,
    Param,
    ParseIntPipe,
    Post,
    Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { FindProductBySlugDto } from './dtos/find-product-by-slug.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
        @Query('limit', new DefaultValuePipe(30), ParseIntPipe)
        limit = 30
    ): Promise<Pagination<Product>> {
        limit = limit > 100 ? 100 : limit;

        return this.productsService.findAll({
            page,
            limit,
            route: '/api/products',
        });
    }

    @Get(':slug')
    async findBySlug(
        @Param() { slug }: FindProductBySlugDto
    ): Promise<Product> {
        const product = await this.productsService.findBySlug(slug);

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
