<script lang="ts">
	let username: string;
	let password: string;
</script>

<main>
	<h1 class="title">Ngow Ngow 🤪</h1>
	<form action="">
		<input type="text" bind:value={username} placeholder="Enter username">
		<input type="password" bind:value={password} placeholder="Enter password">
	</form>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	.title {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>