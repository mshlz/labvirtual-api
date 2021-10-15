import { HttpError } from "routing-controllers";
import { ApiResponse } from "../../interfaces/ApiResponse";

export class ValidationError extends HttpError {
    private code: number
    private errors: any

    constructor(errors: any, message?: string) {
        super(422, message || 'ValidationError')
        this.name = 'ValidationError'
        this.code = 422
        this.errors = errors
    }
}

export class BadRequestError extends HttpError {
    private code: number

    constructor(message: string, code?: number, name?: string) {
        super(400, message || 'ValidationError')
        this.name = name || 'BadRequest'
        this.code = code || 400
    }
}

export const success = (data: any, message?: string): ApiResponse => {
    return {
        code: 200,
        message,
        data
    }
}