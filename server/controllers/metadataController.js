import mongoose from 'mongoose';
import Metadata from '../models/metadata.js';


export const postMetadata = async (req, res) => {
    const metadata = req.body;
    console.log(metadata);

    const newMetadata = new Metadata(metadata);

    try {
        await newMetadata.save();
        // newPost is returned as response if the save is successfull
        res.status(201).json(newMetadata);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
};