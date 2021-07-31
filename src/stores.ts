import { writable } from "svelte/store";

export const credential = writable<string>(null);
export const profile = writable(null);
// export const client: SocialClient = InstagramClient.getInstance();
