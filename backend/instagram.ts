import { AccountRepositoryLoginResponseLogged_in_user, IgApiClient } from 'instagram-private-api'


export interface SocialClient {
    login(username: string, password: string): Promise<void>
    getProfile(): void
    getFollowers(): Promise<void>
    getFollowings(): Promise<void>
}

export class InstagramClient implements SocialClient {
    private ig: IgApiClient
    private loggedInUser: AccountRepositoryLoginResponseLogged_in_user
    private constructor() {
        this.ig = new IgApiClient()
    }
    private static instance: InstagramClient

    static getInstance(): InstagramClient {
        if (InstagramClient.instance == null) {
            InstagramClient.instance = new InstagramClient()
        }
        return InstagramClient.instance
    }

    async login(username: string, password: string ) {
        const { ig } = this
        ig.state.generateDevice(username)

        await ig.simulate.preLoginFlow()
        this.loggedInUser = await ig.account.login(username, password)
        process.nextTick(async () => await ig.simulate.postLoginFlow())
    }
    
    getProfile() {
        return this.loggedInUser
        console.log('user:', this.loggedInUser)
        // this.ig.account.twoFactorLogin()
    }

    async getFollowers() {
        console.log('followers:', (await this.ig.feed.accountFollowers().items()).length)
    }

    async getFollowings() {
        console.log('user:', (await this.ig.feed.accountFollowing().items()).length)
    }
}
