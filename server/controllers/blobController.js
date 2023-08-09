import { bucket } from '../models/blob.js';

export const uploadSingleFile = async (req, res) => {
    console.log({ file: req.file });
    res.status(200).json({ message: 'File uploaded successfully' });
}

export const getAllFiles = async (req, res) => {
    console.log('getAllFiles');
    console.log("bucket: ", bucket);
    bucket.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            console.log('No files found');
            return res.status(404).json({ message: 'No files found' });
        }
        console.log(files.length + ' files found');
        return res.json(files);
    });

}

export const getFile = async (req, res) => {
    console.log('getFile');
    bucket.find({ filename: req.params.filename }).toArray((err, files) => {
        if (!files || files.length === 0) {
            console.log('No files found');
            return res.status(404).json({ message: 'No files found' });
        }
        console.log(files.length + ' files found');
        return res.json(files[0]);
    });

}