export class BaseException extends Error {
    code: number;

    constructor(code, message) {
        super(message)
        this.code = code
    }
}