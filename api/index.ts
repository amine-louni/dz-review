import Axios from 'axios';
import { API_URL } from '../constants';


export const auth = Axios.create({
    baseURL: `${API_URL}/users/auth/`,
    headers: { "Content-type": "application/json" },

})