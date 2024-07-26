import express from 'express';
// create some router

// Initialize the router
export const router = express.Router();

import { contentRoutes } from './content.js';
import { productRouter } from './productRouter.js';

// router.use(contentRoutes);
router.use('/api', productRouter);