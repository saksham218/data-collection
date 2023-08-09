import express from 'express';
import { postMetadata } from '../controllers/metadataController.js';

const metadataRoutes = express.Router();

metadataRoutes.post('/upload', postMetadata); //tested

export default metadataRoutes;