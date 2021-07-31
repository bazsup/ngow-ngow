import axios from "axios";
import { credential } from '../stores';
import { get } from "svelte/store";

export const instance = axios.create({
    baseURL: '/api',
})

export const buildHeaders = () => {
    const {username, password, hasTwoFactor} = get(credential)
    return {
        'Authorization': `${username},${password}`,
        'hasTwoFactor': hasTwoFactor
    }
}