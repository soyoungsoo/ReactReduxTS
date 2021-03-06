import config from "../const/config";
import {AxiosResponse, AxiosError, AxiosRequestConfig} from "axios";
const axios = require('axios');

const instance = axios.create({
    baseURL: config.url,
    timeout: config.timeout,
    headers: {
        'x-token':  sessionStorage.getItem('token'),
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0'
    }
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    return config;
}, (error: AxiosError) => Promise.reject(error));

instance.interceptors.response.use((response: AxiosResponse) => {
    return response;
}, (error: AxiosError) => {
    if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        alert(error.response.data.message);

        let code = error.response.data.status;
        if (code === 401) {
            sessionStorage.removeItem('token');
            window.location.href = '/login';
        }
    } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        return Promise.reject(error.request);
    } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        alert('Error ' + error.message);
        return Promise.reject(error);
    }
    return Promise.reject(error);
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    instance,
    get: (url: string, param?: {}) => instance.get(url, {params: param}).then(responseBody),
    post: (url: string, body?: {}, param?: {}) => instance.post(url, body, {params: param}).then(responseBody),
    patch: (url: string, body?: {}) => instance.patch(url, body).then(responseBody),
    delete: (url: string, body?: {}, param?: {}) => instance.delete(url, { data: body, params: param}).then(responseBody),
};


export default requests;