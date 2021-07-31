import { InstagramClient } from '../../backend/instagram'
import { BaseException } from '../../backend/exception'
import requireAuth from '../../backend/requireAuth'
import { HttpStatus } from '../../backend/constants'
import { encrypt } from '../../backend/crypto'

module.exports = async (req, res) => {
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

    const client = InstagramClient.getInstance()
    client.login(req.u, req.p)
        .then(() => {
            res.status(200).send({
                profile: client.getProfile(),
                accessToken: encrypt(JSON.stringify({u: req.u, p: req.p, hasTwoFactor: false}))
            });
        })
        .catch((err) => {
            if (err instanceof BaseException) {
                console.log('base exception')
                return res.status(err.code).send({ message: err.message })
            }

            console.error(err)
            res.status(HttpStatus.BAD_REQUEST).json({ message: 'Unauthorized' })
        })
}