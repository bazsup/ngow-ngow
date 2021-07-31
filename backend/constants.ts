export default {
    requireAuth: 'Unauthorized',
    methodNotAllowed: 'Method Not Allowed',
    twoFactorSmsMethod: 'Enter code received via SMS',
    twoFactorTotpMethod: 'Enter code received via Third-Party App Authentication',
}

export const HttpStatus = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    METHOD_NOT_ALLOWED: 405
}

export const TwoFactorMethod = {
    THIRD_PARTY: '0',
    SMS: '1'
}
