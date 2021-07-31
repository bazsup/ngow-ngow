import type { Profile } from "./profile.model";

export interface LoginResponse {
    profile: Profile
    accessToken: string
}
