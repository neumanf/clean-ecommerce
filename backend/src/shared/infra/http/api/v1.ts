import express from 'express';

const v1Router = express.Router();

v1Router.get('/', (req, res) => res.json({ message: 'Hello, world' }));

export { v1Router };
