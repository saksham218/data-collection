import express from 'express';
import { upload } from '../middleware/gridfs.js';
import { getAllFiles, getFile, uploadSingleFile } from '../controllers/blobController.js';


const blobRouter = express.Router();

blobRouter.post('/upload', upload.single('file'), uploadSingleFile); //tested

blobRouter.get('/allFiles', getAllFiles);

blobRouter.get('/file/:filename', getFile);

export default blobRouter;

