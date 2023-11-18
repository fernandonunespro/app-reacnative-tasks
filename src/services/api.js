import axios from 'axios';

const api = axios.create({
    baseURL: 'http://18.188.214.149:3334',
});

export default api;