export declare function validToken(maybeToken?: string): Promise<string>;
export declare function validTokenOrErrorMessage(maybeToken?: string): Promise<{
    token: string;
    error?: never;
} | {
    token?: never;
    error: {
        e: Error | unknown;
        message: string;
    };
}>;
