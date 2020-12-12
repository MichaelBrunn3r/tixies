<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';
	import { tixies } from '../data/tixies';
	import { onMount } from 'svelte';

	let time=0;

	onMount(() => {
		function update() {
			requestAnimationFrame(update);
			if((window.performance.now() / 1000) - time > 0.1) {
				time = window.performance.now() / 1000;
			}
		}
		const anim = requestAnimationFrame(update);

		return () => {
			cancelAnimationFrame(anim);
		}
	})
</script>

<style lang="scss">
	:global(body) {
		font-family: monospace;
		background-color: rgb(44, 44, 44);
	}

	.container {
		width: 100%;
		height: 100%;

		display: grid;
		justify-content: center;
		column-gap: 10px;
		row-gap: 10px;
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
	}

	@media (max-width: 550px) {
		.container {
			grid-template-columns: repeat(2, 1fr);
			grid-auto-flow: unset;
		}
	}

	@media (min-width: 550px) and (max-width: 800px) {
		.container {
			grid-template-columns: repeat(3, 1fr);
			grid-auto-flow: unset;
		}
	}
</style>

<div class="container">
	{#each tixies as tixy}
		<CanvasTixy {tixy} {time} resolution={300} />
	{/each}
</div>