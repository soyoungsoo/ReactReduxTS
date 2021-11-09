import config from "../const/config";
import {AxiosResponse, AxiosError, AxiosRequestConfig} from "axios";
const axios = require('axios');

const instance = axios.create({
    baseURL: (`https://findw.co.kr/api`) || window.location.host,
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

const responseBody = (response: AxiosResponse) => response;
const responseError = (err: AxiosError) => err.response?.data;

const requests = {
    get: (url: string, param?: {}) => instance.get(url, {params: param}).then(responseBody).catch(responseError),
    post: (url: string, body: {}) => instance.post(url, body).then(responseBody).catch(responseError),
    patch: (url: string, body: {}) => instance.patch(url, body).then(responseBody).catch(responseError),
    delete: (url: string) => instance.delete(url).then(responseBody).catch(responseError),
};


export default requests;