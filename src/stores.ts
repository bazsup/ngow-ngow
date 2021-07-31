import { writable } from "svelte/store";
import type { SocialCredential } from "./models/credential.model";

export const credential = writable<SocialCredential>(null);
export const profile = writable(null);
// export const client: SocialClient = InstagramClient.getInstance();
