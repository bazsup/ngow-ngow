import constants, { HttpStatus } from './constants'
import { BaseException } from './exception'
import {decrypt} from "./crypto"
import type { Token } from './token.model'

export const requireAuth = (req) => {
    if (req.method !== 'POST') {
        throw new BaseException(HttpStatus.METHOD_NOT_ALLOWED, constants.methodNotAllowed)
    }
    const { token } = req.body
    if (token === undefined) {
        throw new BaseException(HttpStatus.BAD_REQUEST, constants.requireAuth)
    }

    const something = token.split(',')
    if (something.length !== 2) {
        throw new BaseException(HttpStatus.BAD_REQUEST, constants.requireAuth)
    }
    req.u = something[0]
    req.p = something[1]
}



export const requireAuthHeaders = (req) => {
    let token: Token
    try {
        token = JSON.parse(decrypt(req.headers.authorization))
    } catch (error) {
        throw new BaseException(HttpStatus.BAD_REQUEST, constants.requireAuth)
    }
    if (token === undefined) {
        throw new BaseException(HttpStatus.BAD_REQUEST, constants.requireAuth)
    }
    
    req.token = token
}

export default requireAuth
