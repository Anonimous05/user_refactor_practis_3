import axios from 'axios';

const axiosAPI = axios.create({
   baseURL:'https://chat-a8023.firebaseio.com/'
});

export default axiosAPI;