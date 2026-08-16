export interface Result<T> {
    isSuccess: boolean;
    data?: T;
    error?: Error;
    message?: string;
}

export interface Error { 
    code: string,
    description?: string
}
