import mongoose from 'mongoose';
import Metadata from '../models/metadata.js';


export const postMetadata = async (req, res) => {
    const metadata = req.body;
    console.log(metadata);

    const newMetadata = new Metadata(metadata);

    try {
        await newMetadata.save();
        // newPost is returned as response if the save is successfull
        return res.status(201).json(newMetadata);
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
};

export const getAllMetadata = async (req, res) => {
    try {
        const allMetadata = await Metadata.find();
        return res.status(200).json(allMetadata);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}