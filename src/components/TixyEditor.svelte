<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';
	import InlineInput from 'svelte-inline-input';
	import { getTixy } from '../data/tixies';
	import { onMount, createEventDispatcher } from 'svelte';

	export let tixyId: string;
	let dispatch = createEventDispatcher();

	let animStart;
	let time=0;

	let n;
	let speed;
	let code;
	let comments;
	$: if(tixyId) reset();

	function reset() {
		const tixy = getTixy(tixyId);
		n = tixy.n;
		speed = tixy.speed;
		code = tixy.code;
		comments = tixy.comments;

		animStart = undefined;
	}

	onMount(() => {
		let id;
		function update(timestamp) {
			if(!animStart) animStart = timestamp;

			const elapsed = timestamp - animStart;
			time = elapsed / speed / 1000;

			id = requestAnimationFrame(update);
		}
		id = requestAnimationFrame(update);

		return () => {
			cancelAnimationFrame(id);
		}
	})
</script>

<style lang="scss">
	.wrapper {
		display: grid;
		justify-items: center;
		justify-content: center;
		grid-auto-flow: row;
		grid-template-columns: #{'min(70vh, 90vw)'};
	}

	.input-wrapper {
		width: 100%;
		display: block;
		margin-top: 5vh;
	}

	.code-input {
		width: 100%;
		margin-left: 2em;
	}

	.code {
		color: var(--text-color-light);
	}

	p {
		padding: 0;
		margin: 0;
	}
</style>

<div class="wrapper">
	<CanvasTixy {code} {n} {time} on:click={() => dispatch('clickTixy')}/>

	<div class="input-wrapper">
		{#each comments as comment}
			<p class="comment" >// {@html comment}</p>
		{/each}
		<p class="comment">/* time * <InlineInput type="number" bind:value={speed}/>, index, column, row, <InlineInput type="number" bind:value={n}/>² dots */
		</p>
		<p class="code">(t,i,x,y,n) => &#123;</p>
		<div class="code-input code" contenteditable=true bind:textContent={code}></div>
		<p class="code">&#125;</p>
	</div>
</div>