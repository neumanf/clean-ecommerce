import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findById(id: number): Promise<Product> {
        return this.productsRepository.findOne(id);
    }

    async create(createProductDto: CreateProductDto) {
        return this.productsRepository.save(createProductDto);
    }
}
