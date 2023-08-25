import express from 'express';
import { postMetadata, getAllMetadata } from '../controllers/metadataController.js';

const metadataRoutes = express.Router();

metadataRoutes.post('/upload', postMetadata); //tested
metadataRoutes.get('/getAllMetadata', getAllMetadata); //tested

export default metadataRoutes;