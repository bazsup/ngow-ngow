import { instance } from "./api"
import { credential } from '../stores'
import { get } from "svelte/store"

export const sendPhoto = (file: File) => {
    const {username, password, hasTwoFactor} = get(credential)
    const formData = new FormData()
    formData.append('token', `${username},${password}`)
    formData.append('twoFactor', hasTwoFactor ? '1' : '0')
    formData.append('file', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return instance.post('/direct/photo', formData, config)
}