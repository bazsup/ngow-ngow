import { buildHeaders, instance } from "./api"

export const sendMessage = (receiverId: number, message: string) => {
    return instance.post('/direct', {
        receiverId: receiverId,
        message: message
    }, {
        headers: buildHeaders()
    })
}

export const sendPhoto = (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            ...buildHeaders()
        }
    }
    return instance.post('/direct/photo', formData, config)
}

export const sendPhoto2 = (receiverId: number, url: string) => {
    const config = {
        headers: buildHeaders()
    }
    return instance.post('/direct/photo2', {
        receiverId,
        url
    }, config)
}
