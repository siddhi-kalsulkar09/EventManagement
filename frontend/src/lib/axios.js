import axios from "axios";


const api = axios.create({
 // baseURL: 'http://localhost:3000',
 baseURL: 'https://eventmanagement-re4g.onrender.com',
});


export default api;
