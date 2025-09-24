import axios from "axios";

import useAuthStore from "../Store/authStore";

const API_URL = 'http://localhost:3000/api'
// const API_URL = 'https://task-manager-api-8byk.onrender.com/api'

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default api;