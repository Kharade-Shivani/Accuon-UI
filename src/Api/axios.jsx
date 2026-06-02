import axios from 'axios';

export const baseURL= 'https://accuon-backend.onrender.com';

// export const baseURL= 'http://localhost:1717';



export const httpClient = axios.create({
    baseURL,
});

export default httpClient;

