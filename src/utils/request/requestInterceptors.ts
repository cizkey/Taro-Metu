import { axios, AxiosRequestConfig } from 'taro-axios';
import handleError from './handleError';

const handleRequestHeader = (config: AxiosRequestConfig) => {
    return config;
};

const handleAuth = (config: AxiosRequestConfig) => {
    if (!config) {
        config = {};
    }
    if (!config.headers) {
        config.headers = {};
    }
    const token = '123';
    config.headers['Authorization'] = `Bearer ${
        localStorage.getItem('token') || token || ''
    }`;
    return config;
};

axios.interceptors.request.use(
    (config) => {
        config = handleRequestHeader(config);
        config = handleAuth(config);
        return config;
    },
    (err) => {
        handleError.handleGeneralError('-1', err);
        Promise.reject(err);
    },
);
