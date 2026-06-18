import * as Routes from '../utils/routes';
import axios, { AxiosRequestConfig } from 'axios';
import { Method } from '../types/global';

export class UnionAPI {
    public API_KEY: string;
    public headers: object;

    public constructor(apiKey: string) {
        if (!apiKey)
            throw new Error('You must provide an API key in class initialization');
        
        this.API_KEY = apiKey;
        this.headers = {
            'x-api-key': apiKey,
        }
    }

    private makeRequest(url: string, method: Method, config: AxiosRequestConfig = {}, data: any = {}) {
        if (!url || typeof url !== 'string')
            throw new Error('Invalid URL provided. Must be a string');

        if ((!method) || typeof method !== 'string' || !Object.values(Method).includes(method))
            throw new Error('Invalid method provided. Must be a string and a valid HTTP method');

        const isNonDataMethod = [Method.Get, Method.Delete].includes(method);
        
        return axios[method](
            url, 
            isNonDataMethod ? config : data,
            isNonDataMethod ? undefined : config,
        );
    }

    public getBotData() {
        return this.makeRequest(
            Routes.DATA_URL, 
            Method.Get, 
            {
                headers: this.headers
            }
        );
    }

    public checkVote(userId: string, maxTime: number = 30) {
        if (!userId || typeof userId !== 'string' || userId.length < 17)
            throw new Error('Invalid userId provided. Must be a string and be at least 17 characters long');

        if (typeof maxTime !== 'number' || maxTime < 1)
            throw new Error('Invalid maxTime provided. Must be a number and be at least 1');

        return this.makeRequest(
            Routes.CHECK_VOTE_URL,
            Method.Get,
            {
                headers: this.headers,
                params: {
                    userId,
                    maxTime,
                },
            },
        );
    }
}