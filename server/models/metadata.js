import mongoose from 'mongoose';

const metadataSchema = mongoose.Schema({
    name: String,
    state: String,
    imageName: String,
    videoName: String,
    audioName: String
});

const Metadata = mongoose.model('Metadata', metadataSchema);

export default Metadata;