import axios from 'axios';
import { CONFIG } from '@/config/config';
import { parseError } from './errors';
import { CustomResponse } from '@/types';
import { getAuthToken } from '@/utils/cookies';
import eventEmitter from './event';

class CustomError extends Error {
    code: any;
    keys: any;
    error: any;
    constructor({ code, error, keys }: any) {
        super(error);
        this.name = this.constructor.name;
        this.code = code;
        this.error = error;
        Error.captureStackTrace(this, this.constructor);
    }
}

// Create axios client, pre-configured with baseURL
let APIKit: any = axios.create({
    baseURL: CONFIG.BASE_URL,
    timeout: 60000,
    transformResponse: (res) => {
        let response;
        try {
            response = JSON.parse(res);
        } catch (error) {
            throw new CustomError({ code: 'FAILED', error: res });
        }

        if (response.code && !['SUCCESS', 'RESET_PASSWORD'].includes(response.code)) {
            throw new CustomError({ code: response.code, error: response.message || response.error || response.code });
        } else if (response.error) {
            if (!response.error.includes('Error: timeout')) {
                let { code, msg }: any = parseError(response);
                throw new CustomError({ code: code, error: msg });
            } else {
                throw new CustomError({ code: 405, error: 'App is not responding right now, Please try again', data: response });
            }
        } else if (response) {
            if (response.code === 'AUTH_FAILED') {
                let { code, msg }: any = parseError(response);
                throw new CustomError({ code: code, error: msg });
            }
            return response;
        } else {
            return { code: 'FAILED', error: 'App is not responding right now, Please try again', data: response };
        }
    }
});

// Cache expiration time in milliseconds (e.g., 2 minutes)
const CACHE_EXPIRATION_TIME = 2 * 60 * 1000;

const cache = new Map();
const activeRequests = new Map();

const fetchData = async (method: string, url: string, payload = {}, headers: any = {}, isCache: boolean = false) => {
    const urlWithoutQuery = url.split('?')[0];
    const cacheKey = `${method}-${urlWithoutQuery}-${JSON.stringify(payload)}`;

    // Abort previous request if it exists
    // if (activeRequests.has(cacheKey)) {
    //     activeRequests.get(cacheKey).cancel('Operation canceled due to new request.');
    // }

    // const cancelTokenSource = axios.CancelToken.source();
    // activeRequests.set(cacheKey, cancelTokenSource);

    try {
        // Check cache first and verify expiration
        const cachedEntry = cache.get(cacheKey);
        if (isCache && cachedEntry && (Date.now() - cachedEntry.timestamp < CACHE_EXPIRATION_TIME)) {
            return cachedEntry.data;
        }

        const token = await getAuthToken();
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`
        };

        const response = await APIKit({
            method,
            url,
            data: method !== 'get' ? payload : undefined,
            headers,
            // cancelToken: cancelTokenSource.token
        });

        const customResponse = response.data;

        // Cache the response with the current timestamp
        cache.set(cacheKey, {
            data: customResponse,
            timestamp: Date.now()
        });

        return customResponse;
    } catch (err: any) {
        if (axios.isCancel(err)) {
            console.log('Request canceled:', err.message);
        } else {
            console.error('Error fetching data:', err);
        }

        if (err.code == 'AUTH_FAILED') {
            eventEmitter.emit('signOut', {});
        }

        return { code: err.code, message: err.message, data: null };
    } finally {
        activeRequests.delete(cacheKey);
    }
};

// API methods
const PostCall = (url: string, payload = {}, headers = {}) => fetchData('post', url, payload, headers);
const GetCall = (url: string, headers = {}) => fetchData('get', url, {}, headers);
const PutCall = (url: string, payload = {}, headers = {}) => fetchData('put', url, payload, headers);
const DeleteCall = (url: string, headers = {}) => fetchData('delete', url, {}, headers);

const PostPdfCall = async (url: string, payload = {}, headers = {}) => {
    const token = await getAuthToken();
    headers = {
        ...headers,
        Authorization: `Bearer ${token}`
    };

    try {
        const response = await axios.post(`${CONFIG.BASE_URL}${url}`, payload, {
            responseType: 'blob',
            ...headers
        });

        // Check if the response.data is a Blob
        if (response.data instanceof Blob) {
            console.log('Received Blob response.');
            const url = window.URL.createObjectURL(response.data);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'downloaded.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Clean up
        } else {
            return response.data
        }
    } catch (error: any) {
        return { code: 'FAILED', message: error.message, data: null };
    }
}

export {
    PostCall,
    GetCall,
    PutCall,
    DeleteCall,
    PostPdfCall
};
