export interface ResponseDTO<T> {
    status: number,
    payload: {
        success: boolean,
        message: string,
        json?: T
    }
}

// 2xx – Sucesso
export function ok<T>(data: T, message: string = "Sucesso"): ResponseDTO<T> {
    return { status: 200, payload: { success: true, message, json: data } };
}

export function created<T>(data: T, message: string = "Criado com sucesso"): ResponseDTO<T> {
    return { status: 201, payload: { success: true, message, json: data } };
}

export function accepted<T>(data: T, message: string = "Aceito para processamento"): ResponseDTO<T> {
    return { status: 202, payload: { success: true, message, json: data } };
}

export function noContent(message: string = "Nenhum conteúdo"): ResponseDTO<null> {
    return { status: 204, payload: { success: true, message } };
}

// 4xx – Erro do cliente
export function badRequest(message: string = "Requisição inválida"): ResponseDTO<null> {
    return { status: 400, payload: { success: false, message } };
}

export function unauthorized(message: string = "Não autenticado"): ResponseDTO<null> {
    return { status: 401, payload: { success: false, message } };
}

export function forbidden(message: string = "Proibido"): ResponseDTO<null> {
    return { status: 403, payload: { success: false, message } };
}

export function notFound(message: string = "Não encontrado"): ResponseDTO<null> {
    return { status: 404, payload: { success: false, message } };
}

export function conflict(message: string = "Conflito"): ResponseDTO<null> {
    return { status: 409, payload: { success: false, message } };
}

export function unprocessableEntity(message: string = "Entidade inválida"): ResponseDTO<null> {
    return { status: 422, payload: { success: false, message } };
}

// 5xx – Erro do servidor
export function internalError<T>(data: T, message: string = "Erro interno do servidor"): ResponseDTO<T> {
    return { status: 500, payload: { success: false, message, json: data } };
}

export function notImplemented(message: string = "Não implementado"): ResponseDTO<null> {
    return { status: 501, payload: { success: false, message } };
}

export function badGateway(message: string = "Gateway inválido"): ResponseDTO<null> {
    return { status: 502, payload: { success: false, message } };
}

export function serviceUnavailable(message: string = "Serviço indisponível"): ResponseDTO<null> {
    return { status: 503, payload: { success: false, message } };
}

export function gatewayTimeout(message: string = "Tempo de gateway esgotado"): ResponseDTO<null> {
    return { status: 504, payload: { success: false, message } };
}