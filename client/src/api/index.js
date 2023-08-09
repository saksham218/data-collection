import axios from 'axios';

const baseURL = 'http://localhost:5000';
const client = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('user_token')
    }
});

export const postMetaData = async (data) => { client.post('/metadata', data) }
export const postVideo = async (data) => { client.post('/video', data) }
export const postAudio = async (data) => { client.post('/audio', data) }
export const postImage = async (data) => { client.post('/image', data) }