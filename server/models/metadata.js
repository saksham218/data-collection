import mongoose from 'mongoose';

const metadataSchema = mongoose.Schema({
    name: String,
    state: String,
    imageId: String,
    imageName: String,
    videoId: String,
    videoName: String,
    audioId: String,
    audioName: String
});

const Metadata = mongoose.model('Metadata', metadataSchema);

export default Metadata;