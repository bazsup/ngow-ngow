import { AccountRepositoryLoginResponseLogged_in_user, IgApiClient, IgLoginTwoFactorRequiredError } from 'instagram-private-api'
import * as Bluebird from 'bluebird';
import constants, { HttpStatus, TwoFactorMethod } from './constants';
import { BaseException, LoginTwoFactorRequiredError } from './exception';

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

    async login(username: string, password: string) {
        try {
            await this._login(username, password)
        } catch (err) {
            if (err instanceof IgLoginTwoFactorRequiredError) {
                const { totp_two_factor_on } = err.response.body.two_factor_info
                const message = totp_two_factor_on ? constants.twoFactorTotpMethod : constants.twoFactorSmsMethod
                throw new LoginTwoFactorRequiredError(message, err.response.body)
            }
            throw err
        }
    }

    private async _login(username: string, password: string) {
        const { ig } = this
        ig.state.generateDevice(username)

        await ig.simulate.preLoginFlow()
        this.loggedInUser = await ig.account.login(username, password)
        process.nextTick(async () => await ig.simulate.postLoginFlow())
    }

    async twoFactorLogin(username: string, password: string, code: string) {
        try {
            console.log('call login before 2factor')
            await this._login(username, password)
        } catch (err) {
            console.log('error appear')
            if (!(err instanceof IgLoginTwoFactorRequiredError)) {
                throw err
            }
            const { username, totp_two_factor_on, two_factor_identifier } = err.response.body.two_factor_info
            

            const verificationMethod = totp_two_factor_on ? TwoFactorMethod.THIRD_PARTY : TwoFactorMethod.SMS

            this.loggedInUser = await this.ig.account.twoFactorLogin({
                username,
                verificationCode: code,
                twoFactorIdentifier: two_factor_identifier,
                verificationMethod,
                trustThisDevice: '1',
            });
        }
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
        console.log('followings:', (await this.ig.feed.accountFollowing().items()))
    }

    async sendMessage() {
        // const userId = await this.ig.user.getIdByUsername('')
        const thread = this.ig.entity.directThread([''])
        await thread.broadcastText('Message from API')
    }
}
