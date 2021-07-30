import constants, { HttpStatus } from './constants'
import { BaseException } from './exception'

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

export default requireAuth
