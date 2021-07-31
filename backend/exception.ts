import type { AccountRepositoryLoginErrorResponse } from "instagram-private-api";
import { HttpStatus } from "./constants";

export class BaseException extends Error {
    code: number;

    constructor(code: number, message: string) {
        super(message)
        this.code = code
    }
}

export class LoginTwoFactorRequiredError extends BaseException {
    static code = HttpStatus.FORBIDDEN
    constructor(messsage: string) {
        super(LoginTwoFactorRequiredError.code, messsage)
    }
}