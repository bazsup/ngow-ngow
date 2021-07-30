import { InstagramClient } from '../backend/instagram'
import { BaseException } from '../backend/exception'
import requireAuth from '../backend/requireAuth'

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
    try {
        const client = InstagramClient.getInstance()
        await client.login(req.u, req.p)

        res.status(204).send();
    } catch {
        res.status(401).json({ message: 'Unauthorized' })
    }
}