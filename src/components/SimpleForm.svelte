<script>
	let value = 'world'
	let submit = false
	
	const handleSubmit = () => {
		submit = true
	}
	
	const handleKeyup = () => {
		submit = false
		
		if (event.code == 'Enter') {
			event.preventDefault()
			event.target.value
			value = event.target.value
			return false
		}
	}
</script>

<div>
	<div>
		<div>
			<form on:submit|preventDefault={handleSubmit}>
				<input type="text" on:keyup|preventDefault={handleKeyup}>
				<button type="submit">
					Submit
				</button>
			</form>

		</div>
	</div>
</div>

{submit}
<h1>Hello {value}!</h1>