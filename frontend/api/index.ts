import Axios from 'axios';
import { API_URL } from '../constants';


export const auth = Axios.create({
    baseURL: `${API_URL}/users/auth/`,
    headers: { "Content-type": "application/json" },
    withCredentials: true
})

export const domain = Axios.create({
    baseURL: `${API_URL}/domains/`,
    headers: { "Content-type": "application/json" },
    withCredentials: true
})


export const businessHTTP = Axios.create({
    baseURL: `${API_URL}/business/`,
    headers: { "Content-type": "application/json" },
    withCredentials: true
})

export const mediaHTTP = Axios.create({
    baseURL: `${API_URL}/media/`,
    headers: { "Content-type": "application/json" },
    withCredentials: true
})


export const setAuthToken = (token: string) => {
    if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        domain.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        businessHTTP.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } else {
        delete Axios.defaults.headers.common['Authorization'];
    }
};
