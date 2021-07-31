import constants, { HttpStatus } from "../../backend/constants"
import { BaseException } from "../../backend/exception"
import { InstagramClient } from "../../backend/instagram"
import requireAuth from "../../backend/requireAuth"

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(HttpStatus.METHOD_NOT_ALLOWED).send({ message: constants.methodNotAllowed })
        return;
    }

    req.body.token = req.headers.authorization
    try {
        requireAuth(req)
    } catch (err) {
        if (err instanceof BaseException) {
            return res.status(err.code).json({ message: err.message })
        }
        console.log(err)
        return res.status(433).json({
            message: 'Unprocessable'
        })
    }

    const hasTwoFactor = req.headers.hastwofactor === 'true'

    try {
        await login(hasTwoFactor, req.u, req.p)
        const client = InstagramClient.getInstance()
        await client.sendMessage(req.body.receiverId, req.body.message)

        res.status(204).send();
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: 'Unauthorized' })
    }
}

async function login(hasTwoFactor: boolean, u: any, p: any) {
    const client = InstagramClient.getInstance()
    if (hasTwoFactor) {
        await client.twoFactorLogin(u, p, '123456')
    } else {
        await client.login(u, p)
    }
}
