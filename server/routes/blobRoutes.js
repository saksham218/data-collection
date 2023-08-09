import express from 'express';
import { upload } from '../middleware/gridfs.js';
import { bucket } from '../models/blob.js';

const blobRouter = express.Router();

blobRouter.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: 'File uploaded successfully' });
});

blobRouter.get('/files', (req, res) => {
    bucket.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            console.log('No files found');
            return res.status(404).json({ message: 'No files found' });
        }
        console.log(files.length + ' files found');
        return res.json(files);
    });

});

export default blobRouter;

