<script>
	import Navbar from '../components/Navbar.svelte';
</script>

<style lang="scss">
	:global(body) {
		--text-color-primary: gray;
		--text-color-light: white;
		--text-color-dark: rgb(75, 75, 75);
		--bg-color-primary: rgb(31, 30, 30);

		font-family: monospace;
		background-color: var(--bg-color-primary);
		color: var(--text-color-primary);
	}

	:global(a) {
		color: var(--text-color-primary);
	}

	:global(button) {
		background: transparent;
		border: transparent;
		padding: 0;
		margin: 0;
		color: var(--text-color-primary);

		&:active  {
			color: var(--text-color-dark);
		}
	}
</style>

<main>
	<Navbar />
	<slot></slot>
</main>