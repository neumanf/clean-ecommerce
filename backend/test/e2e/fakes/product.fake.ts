import faker from '@faker-js/faker';

import { Product } from '../../../src/modules/products/entities/product.entity';

const productFake = (): Partial<Product> => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    imageUrl: faker.image.imageUrl(),
    price: Number(faker.commerce.price()),
});

export default productFake;
