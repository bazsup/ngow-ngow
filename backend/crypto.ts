import crypto from 'crypto'

export function decrypt(cipher: string, key: string = PRIVATE_KEY) {
    const buffer = Buffer.from(cipher, 'base64');
    const decrypted = crypto.privateDecrypt(key, buffer)
    return decrypted.toString('utf-8')
}

const PRIVATE_KEY = process.env.PRIVATE_KEY

export function encrypt(plain: string, key: string = PUBLIC_KEY) {
    const buffer = Buffer.from(plain, 'utf-8');
    const encrypted = crypto.publicEncrypt(key, buffer)
    return encrypted.toString('base64')
}

const PUBLIC_KEY = process.env.PUBLIC_KEY
