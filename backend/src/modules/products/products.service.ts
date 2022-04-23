import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productsRepository: Repository<Product>
    ) {}

    async findAll(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    async findOne(id: number): Promise<Product> {
        return this.productsRepository.findOne(id);
    }
}
