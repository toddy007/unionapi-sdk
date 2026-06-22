import * as Routes from '../utils/routes.js';
import axios from 'axios';
import { handleErrors } from '../utils/handleErrors.js';
import { UnionAPISdkError } from '../utils/unionAPISdkError.js';

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
        try {
            const response = await axios.get(
                Routes.DATA_URL, 
                { headers: this.headers } 
            );

            return response.data;
        } catch(error) {
            if (axios.isAxiosError(error))
                throw handleErrors(error);

            throw error;
        }
    }

    public async checkVote(userId: string) {
        if ((!userId) || typeof userId !== 'string' || userId.length < 17)
            throw new UnionAPISdkError(
                'Invalid userId provided. Must be a string and be at least 17 characters long',
            );

        try {
            const response = await axios.get(
                Routes.CHECK_VOTE_URL, 
                {
                    headers: this.headers,
                    params: {
                        userId,
                    },
                },
            );

            return response.data;
        } catch(error) {
            if (axios.isAxiosError(error))
                throw handleErrors(error);

            throw error;
        }
    }
}
