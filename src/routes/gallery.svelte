<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';
	import { tixies } from '../data/tixies';
	import { onMount } from 'svelte';

	let time=0;
	const slowdown = 150;

	onMount(() => {
		function update() {
			time += slowdown/1000;
		}
		const anim = setInterval(update, slowdown);

		return () => {
			clearInterval(anim);
		}
	})
</script>

<svelte:head>
	<title>Gallery</title>
</svelte:head>

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
		grid-auto-columns: 1fr;
		grid-auto-flow: column;
	}

	.tixy {
		display: grid;
		justify-content: center;
	}

	.name-label {
		color: gray;
		text-align: center;
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
	{#each tixies as tixy, id}
		<div class="tixy">
			<a href="tixy/{id}">
				<CanvasTixy {tixy} {time} resolution={300}/>
			</a>
			<label class="name-label">{tixy.name}</label>
		</div>
	{/each}
</div>