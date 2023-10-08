import axios from 'axios';

// const baseURL = 'http://localhost:5000';
const baseURL = 'https://data-collection-backend.onrender.com';
const client = axios.create({
    baseURL: baseURL

});

export const postMetaData = async (data) => {
    return client.post('/metadata/upload', data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'mode': "no-cors"
            }
        })
}

export const postBlob = async (data) => {
    return client.post('/blob/upload', data,
        {
            headers: {
                'Content-Type': `multipart/form-data`,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'mode': "no-cors"
            }
        })
}

