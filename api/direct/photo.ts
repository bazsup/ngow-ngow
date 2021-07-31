import constants, { HttpStatus } from "../../backend/constants"
import { BaseException } from "../../backend/exception"
import { InstagramClient } from "../../backend/instagram"
import requireAuth from "../../backend/requireAuth"
import multiparty from 'multiparty'
import util from 'util'
import fs from 'fs'

module.exports = (req, res) => {
    if (req.method !== 'POST') {
        res.status(HttpStatus.METHOD_NOT_ALLOWED).send({ message: constants.methodNotAllowed })
        return;
    }



    let form = new multiparty.Form();

    form.parse(req, async (err, fields, files) => {
        const hasData = fields.token && fields.twoFactor
        if (!hasData && files?.file?.length === 0) {
            res.status(HttpStatus.BAD_REQUEST).send({ message: 'Required field(s) not found' })
            return
        }

        const [credentail] = fields.token
        req.body = {token: credentail}
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

        const hasTwoFactor = fields.twoFactor[0] === '1'
        const uploadedFile = files.file[0]
        
        await login(hasTwoFactor, req.u, req.p)
        const client = InstagramClient.getInstance()
        const fileBuffer = fs.readFileSync(uploadedFile.path) 
        const receiverId = getReceiverId()
        await client.sendPhoto(receiverId, fileBuffer)

        res.status(204).send()
    });
}

async function login(hasTwoFactor: boolean, u: any, p: any) {
    const client = InstagramClient.getInstance()
    if (hasTwoFactor) {
        await client.twoFactorLogin(u, p, '123456')
    } else {
        await client.login(u, p)
    }
}
function getReceiverId() {
    return 0
}

