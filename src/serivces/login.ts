import type { AxiosResponse } from "axios"
import { instance } from "./api"

interface Profile {
    username: string;
    full_name: string;
    profile_pic_url: string;
}

export const login = (u: string, p: string): Promise<AxiosResponse<Profile>> => {
    return instance.post('/login', {
        token: `${u},${p}`
    })
}