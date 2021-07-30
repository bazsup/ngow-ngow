<script lang="ts">
    import { tw, apply } from "twind/css";
    import { credential, profile } from "../stores";
    import { useNavigate, Link } from "svelte-navigator";
    import { login } from "../serivces/login";

    const styles = {
        input: apply`block w-full mb-2 py-1 px-2 rounded`,
        instagram: apply`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-600 to-purple-800`,
        button: apply`bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition duration-300 text-white py-1 sm:w-1/3 w-full rounded block mx-auto`,
    };

    const navigate = useNavigate();

    let username: string;
    let password: string;
    let loading = false;
    let hasError = false;

    function clearForm() {
        username = ''
        password = ''
    }

    async function handleSubmit() {
        hasError = false;
        loading = true;
        login(username, password)
            .then(resp => {
                credential.set({username, password});
                profile.set(resp.data)
                navigate('/profile', { replace: true });
            })
            .catch((err) => {
                console.error(err)
                hasError = true
            })
            .finally(() => {
                loading = false
                clearForm()
            })
    }
</script>

<main>
    <div class={tw`container p-2 mx-auto flex h-screen flex-col`}>
        <h1 class="title">Ngow Ngow 🤪</h1>
        <div class={tw`mt-20`}>
            <div class={tw`sm:w-96 w-full mx-auto shadow-xl px-3 py-5 rounded`}>
                <p class={tw(styles.instagram, "mb-4 p-2")}>Login Instagram</p>
                {#if loading}
                    <div class={tw`text-xl flex h-28 justify-center items-center`}>Loading ...</div>
                {:else}
                    
                    <form on:submit|preventDefault={handleSubmit}>
                        <input
                            class={tw(styles.input)}
                            type="text"
                            bind:value={username}
                            placeholder="Enter username"
                            required
                        />
                        <input
                            class={tw(styles.input)}
                            type="password"
                            bind:value={password}
                            placeholder="Enter password"
                            required
                        />
                        <button type="submit" class={tw(styles.button)}
                            >Login</button
                        >
                    </form>
                    {#if hasError}
                        <div class={tw`flex mt-2 items-center text-red-400`}>
                            Invalid username or passwrod.
                        </div>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</main>

<style>
    .title {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 3em;
        font-weight: 100;
        text-align: center;
        user-select: none;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
