import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    IPaginationOptions,
    paginate,
    Pagination,
} from 'nestjs-typeorm-paginate';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { slugify } from '../../utils/slugify';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) {}

    async findAll(options: IPaginationOptions): Promise<Pagination<Product>> {
        return paginate<Product>(this.productsRepository, options);
    }

    async findBySlug(slug: string): Promise<Product> {
        return this.productsRepository.findOne({ slug });
    }

    async create(createProductDto: CreateProductDto) {
        const slug = slugify(createProductDto.name);
        const product = { ...createProductDto, slug };

        return this.productsRepository.save(product);
    }
}
