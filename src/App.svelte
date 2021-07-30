<script lang="ts">
	import { tw, apply } from "twind/css";

	const styles = {
		input: apply`block w-full mb-2 py-1 px-2 rounded`,
		instagram: apply`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-600 to-purple-800`,
		button: apply`bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 transition duration-300 text-white py-1 sm:w-1/3 w-full rounded block mx-auto`,
	};

	let username: string;
	let password: string;

	async function handleSubmit() {

	}
</script>

<main>
	<div class={tw``}>
		<div class={tw`container p-2 mx-auto flex h-screen flex-col`}>
			<h1 class="title">Ngow Ngow 🤪</h1>
			<div class={tw`mt-20`}>
				<div
					class={tw`sm:w-96 w-full mx-auto shadow-xl px-3 py-5 rounded`}
				>
					<p class={tw(styles.instagram, "mb-4 p-2")}>
						Login Instagram
					</p>
					<form on:submit={handleSubmit}>
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
						<button class={tw(styles.button)}>Login</button>
					</form>
				</div>
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
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
