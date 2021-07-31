import { HttpStatus } from "../../backend/constants"
import { BaseException } from "../../backend/exception"
import { InstagramClient } from "../../backend/instagram"
import requireAuth from "../../backend/requireAuth"

module.exports = async (req, res) => {
    try {
        requireAuth(req)
        if (req.body.code === undefined) {
            throw new BaseException(HttpStatus.BAD_REQUEST, 'Code is required')
        }
    } catch (err) {
        if (err instanceof BaseException) {
            return res.status(err.code).json({ message: err.message })
        }
        console.log(err)
        return res.status(433).json({
            message: 'Unprocessable'
        })
    }
    try {
        const client = InstagramClient.getInstance()
        await client.twoFactorLogin(req.u, req.p, req.body.code)
        console.log('success')
        res.status(200).send(client.getProfile());
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: 'Unauthorized' })
    }
}