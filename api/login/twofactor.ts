import { HttpStatus } from "../../backend/constants"
import { BaseException } from "../../backend/exception"
import { InstagramClient } from "../../backend/instagram"
import requireAuth from "../../backend/requireAuth"
import { encrypt } from '../../backend/crypto'
import { AccountRepositoryLoginResponseLogged_in_user } from "instagram-private-api"

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
        
        res.status(200).send({
            profile: mapProfile(client.getProfile()),
            accessToken: encrypt(JSON.stringify({u: req.u, p: req.p, hasTwoFactor: true}))
        });
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: 'Unauthorized' })
    }
}

interface NestedData {
    logged_in_user: AccountRepositoryLoginResponseLogged_in_user
    status: string
}

function mapProfile(loggedInUser: AccountRepositoryLoginResponseLogged_in_user | NestedData) {
    if (isNestedData(loggedInUser)) {
        console.log('isNested')
        return loggedInUser.logged_in_user
    }
    return loggedInUser
}
function isNestedData(response: AccountRepositoryLoginResponseLogged_in_user | NestedData): response is NestedData {
    return (<NestedData>response).status !== undefined
}
