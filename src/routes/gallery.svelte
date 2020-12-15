<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';
	import { gallery, getTixy } from '../data/tixies';
	import { onMount } from 'svelte';
	import { animationFrameEveryXms } from '../utils/animation';

	let time=0;

	onMount(() => {
		return animationFrameEveryXms(33*4, (timestamp) => {
			time = timestamp;
		})
	})
</script>

<svelte:head>
	<title>Gallery</title>
</svelte:head>

<style lang="scss">
	.container {
		width: 100%;
		height: 100%;

		display: grid;
		justify-content: center;
		column-gap: 10px;
		grid-template-columns: repeat(5, 1fr);
		grid-auto-flow: rows;
	}

	.tixy {
		display: grid;
		justify-content: center;
	}

	.name-label {
		text-align: center;
		padding: 8px 0;
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

	@media (min-width: 800px) and (max-width: 1000px) {
		.container {
			grid-template-columns: repeat(4, 1fr);
			grid-auto-flow: unset;
		}
	}
</style>

<div class="container">
	{#each gallery as id}
		<div class="tixy">
			<a href="tixy/{id}">
				<CanvasTixy code={getTixy(id).code} n={getTixy(id).n} {time} speed={getTixy(id).speed} resolution={300}/>
			</a>
			<label class="name-label">{@html getTixy(id).name}</label>
		</div>
	{/each}
</div>