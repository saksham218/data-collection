import axios from 'axios';

// const baseURL = 'http://localhost:5000';
const baseURL = process.env.REACT_APP_BASEURL;
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

export const postBlobAzure = async (blob, name) => {

    const storageAccountName = process.env.REACT_APP_STORAGE_ACCOUNT_NAME
    const containerName = process.env.REACT_APP_CONTAINER_NAME;
    const sasToken = process.env.REACT_APP_SAS_TOKEN;

    const url = `https://${storageAccountName}.blob.core.windows.net/${containerName}/${name}${sasToken}`;

    return axios.put(url, blob, {
        headers: {
            'x-ms-blob-type': 'BlockBlob',
            'Content-Type': blob.type
        }
    })
}


