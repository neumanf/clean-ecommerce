import {
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';

import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { FindProductBySlugDto } from './dtos/find-product-by-slug.dto';
import { FindAllProductsDto } from './dtos/find-all-products.dto';
import { NotifyUnavailableProductDto } from './dtos/notify-unavailable-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Get()
    async findAll(
        @Query() { page = 1, limit = 30, category }: FindAllProductsDto
    ): Promise<Pagination<Product>> {
        limit = limit > 100 ? 100 : limit;

        return this.productsService.findAll(
            {
                page,
                limit,
                route: '/api/products',
            },
            category
        );
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

    @Post(':slug/unavailable')
    async notifyUnavailable(
        @Param() { slug }: FindProductBySlugDto,
        @Body()
        { userEmail, userAddress, userMessage }: NotifyUnavailableProductDto
    ) {
        await this.productsService.notifyUnavailable(
            userEmail,
            userAddress,
            userMessage,
            slug
        );

        return 'Email sent successfully.';
    }

    @Post()
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productsService.create(createProductDto);
    }
}
