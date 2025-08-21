export interface ResponseDTO<T> {
    success: boolean,
    message: string,
    data?: T
}

export function success<T>(data: T, message = "Sucesso."): ResponseDTO<T> {
    return { success: true, message: message, data: data };
}

export function error<T>(message: string): ResponseDTO<T> {
    return { success: false, message: message };
}