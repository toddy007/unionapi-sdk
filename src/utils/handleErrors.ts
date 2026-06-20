import { AxiosError } from "axios";
import { UnionAPISdkError } from "./unionAPISdkError.js";

export function handleErrors(error: AxiosError) {
    const errorResponse = error.response;
    const errorData = errorResponse?.data as { error?: string, retryAfter?: number } | undefined;
    const retryAfter = errorData?.retryAfter;

    return new UnionAPISdkError(`${errorResponse?.status ?? '???'}: ${errorData?.error ?? 'Unknown error'} ${retryAfter ? `( retry-after: ${retryAfter} segundos )` : ''}`);
}