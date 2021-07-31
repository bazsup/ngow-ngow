<script lang="ts">
    import { profile } from "../stores";
    import {tw} from 'twind'
</script>

<div>
    <header class={tw`shadow-lg block`}>
        <div class={tw`container flex items-center justify-between mx-auto bg-white p-3`}>
            <div>
                <p class={tw`text-2xl font-extrabold`}>{$profile.full_name}</p>
                <a href={`https://www.instagram.com/${$profile.username}`} target="_blank" rel="noreferrer noopener">
                    (@{$profile.username})
                </a>
            </div>
            <div>
                <button class={tw`text-white bg-red-400 px-3 py-2 rounded`}>Logout</button>
            </div>
        </div>
    </header>

    <main>
        <div class={tw`container pt-40 text-center mx-auto`}>
            <button class={tw`text-4xl font-extrabold text-white bg-green-400 active:bg-green-600 focus:outline-none border-none px-10 py-4 rounded-xl`}>
                สุ่มทัก
            </button>
        </div>
    </main>
</div>