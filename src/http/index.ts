import axios from 'axios';

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true,
    timeout: 5000,
})

export default instance
