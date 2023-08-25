import axios from 'axios';

const baseURL = 'http://localhost:5000';
const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': `multipart/form-data`,
    }
});

export const postMetaData = async (data) => { return client.post('/metadata/upload', data) }
export const postBlob = async (data) => { return client.post('/blob/upload', data) }
