import type { AxiosResponse } from "axios"
import type { Profile } from "../models/profile.model"
import { buildHeaders, instance } from "./api"

export const getFollowings = (): Promise<AxiosResponse<Profile[]>> => {
    return instance.get('/followings', {
        headers: buildHeaders()
    })
}