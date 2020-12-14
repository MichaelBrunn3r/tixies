<script>
	import Navbar from '../components/Navbar.svelte';
</script>

<style>
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
</style>

<main>
	<Navbar />
	<slot></slot>
</main>