import * as Routes from '../utils/routes';
import axios, { AxiosRequestConfig } from 'axios';
import { Method } from '../types/global';

export class UnionAPI {
    public API_KEY: string;
    public headers: object;

    public constructor(apiKey: string) {
        this.API_KEY = apiKey;
        this.headers = {
            'x-api-key': apiKey,
        }
    }

    private makeRequest(url: string, method: Method, config: AxiosRequestConfig = {}, data: any = {}) {
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