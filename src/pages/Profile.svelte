<script lang="ts">
    import { profile } from "../stores";
    import { tw } from "twind";
    import { onMount } from "svelte";
    import { getFollowings } from "../serivces/followings";
    import * as direct from "../serivces/direct";
    import type { Profile } from "../models/profile.model";

    let fetching = false;
    let followings: Profile[];
    let randoming = false;
    let result: Profile = null

    onMount(() => {
        fetching = true;
        getFollowings()
            .then((resp) => {
                followings = resp.data;
            })
            .finally(() => {
                fetching = false;
            });
    });

    function getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    function randomFollowing() {
        const index = getRandomIntInclusive(0, followings.length);
        result = followings[1];
    }

    function handleUserWantToRandom() {
        result = null;
        randoming = true;
        let id = setInterval(() => {
            if (!fetching) {
                randomFollowing();
                randoming = false;
                clearInterval(id);
            }
        }, 500);
    }

    let sending = false

    function sendMessage() {
        sending = true
        direct
            .sendMessage(result.pk, "ทักคัฟ")
            .then(() => {
                alert("Message Sent!");
            })
            .catch(() => {
                alert("Send Message Failed, please try again.");
            })
            .finally(() => {
                sending = false
            })

    }
</script>

<div>
    <header class={tw`shadow-lg block`}>
        <div
            class={tw`container flex items-center justify-between mx-auto bg-white p-3`}
        >
            <div>
                <p class={tw`text-2xl font-extrabold`}>{$profile.full_name}</p>
                <a
                    href={`https://www.instagram.com/${$profile.username}`}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    (@{$profile.username})
                </a>
            </div>
            <div>
                <button class={tw`text-white bg-red-400 px-3 py-2 rounded`}
                    >Logout</button
                >
            </div>
        </div>
    </header>

    <main>
        <div class={tw`container pt-40 text-center mx-auto`}>
            {#if randoming}
                ระบบกำลังทำการสุ่ม...
            {:else}
                <button
                    on:click={handleUserWantToRandom}
                    class={tw`text-4xl block mx-auto font-extrabold text-white bg-green-300 active:bg-green-500 focus:outline-none border-none px-10 py-4 rounded-xl`}
                >
                    สุ่มทัก
                </button>
            {/if}
            {#if result}
                <div class={tw`shadow-xl inline-block mt-4 p-10`}>
                    <h2
                        class={tw`text-2xl p-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-yellow-400 to-pink-400`}
                    >
                        ผลลัพธ์ที่ได้
                    </h2>

                    <p class={tw`text-xl font-extrabold`}>
                        {result.full_name}
                    </p>
                    <a
                        href={`https://www.instagram.com/${result.username}`}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        (@{result.username})
                    </a>
                    <button
                        disabled={sending}
                        class={tw`bg-pink-600 active:bg-pink-400 disabled:text-white hover:bg-pink-400 transition-all duration-300 focus:outline-none block mx-auto mt-4 w-full font-bold text-white py-2 rounded-lg`}
                        on:click={sendMessage}
                    >
                        {sending ? 'Sending..' : 'DM'}
                    </button>
                </div>
            {/if}
        </div>
    </main>
</div>
