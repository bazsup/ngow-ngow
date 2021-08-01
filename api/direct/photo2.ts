import constants, { HttpStatus } from "../../backend/constants"
import { BaseException } from "../../backend/exception"
import { InstagramClient } from "../../backend/instagram"
import { requireAuthHeaders } from "../../backend/requireAuth"
import axios from "axios"

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        res.status(HttpStatus.METHOD_NOT_ALLOWED).send({ message: constants.methodNotAllowed })
        return;
    }

    try {
        requireAuthHeaders(req)
    } catch (err) {
        if (err instanceof BaseException) {
            return res.status(err.code).json({ message: err.message })
        }
        console.log(err)
        return res.status(433).json({
            message: 'Unprocessable'
        })
    }

    await login(req.token.hasTwoFactor, req.token.u, req.token.p)
    const client = InstagramClient.getInstance()
    const resp = await axios.get(req.body.url, {
        responseType: 'arraybuffer',
    })
    const receiverId = req.body.receiverId
    await client.sendPhoto(receiverId, resp.data)
    await client.logout()
    res.status(204).send()
}

async function login(hasTwoFactor: boolean, u: any, p: any) {
    const client = InstagramClient.getInstance()
    if (hasTwoFactor) {
        await client.twoFactorLogin(u, p, '123456')
    } else {
        await client.login(u, p)
    }
}
