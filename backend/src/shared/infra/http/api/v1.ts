import express from 'express';

import { productsRouter } from '../../../../modules/products/infra/http/routes';

const v1Router = express.Router();

v1Router.use('/products', productsRouter);

export { v1Router };
