import * as Routes from '../utils/routes.js';
import axios from 'axios';

export default class UnionAPI {
    public API_KEY: string;
    public headers: object;

    public constructor(apiKey: string) {
        if (!apiKey)
            throw new Error(
                'You must provide an API key in class initialization',
            );

        this.API_KEY = apiKey;
        this.headers = {
            'x-api-key': apiKey,
        };
    }

    public async getBotData() {
        const response = await axios.get(
            Routes.DATA_URL, 
            { headers: this.headers } 
        );

        return response.data;
    }

    public async checkVote(userId: string, maxTime: number = 30) {
        if ((!userId) || typeof userId !== 'string' || userId.length < 17)
            throw new Error(
                'Invalid userId provided. Must be a string and be at least 17 characters long',
            );

        if (typeof maxTime !== 'number' || maxTime < 1)
            throw new Error(
                'Invalid maxTime provided. Must be a number and be at least 1',
            );

        const response = await axios.get(
            Routes.CHECK_VOTE_URL, 
            {
                headers: this.headers,
                params: {
                    userId,
                    maxTime,
                },
            },
        );

        return response.data;
    }
}
