import type { AxiosResponse } from "axios"
import type { Profile } from "../models/profile.model"
import { instance } from "./api"

export const login = (u: string, p: string): Promise<AxiosResponse<Profile>> => {
    return instance.post('/login', {
        token: `${u},${p}`
    })
}

export const twoFactorLogin = (u: string, p: string, code: string): Promise<AxiosResponse<Profile>> => {
    return instance.post('/login/twofactor', {
        token: `${u},${p}`,
        code
    })
}