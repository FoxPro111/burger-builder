import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-72b6e.firebaseio.com/'
});

export default instance;