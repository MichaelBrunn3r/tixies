<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';
	import tixies from '../data/tixies';
	import { onMount, createEventDispatcher } from 'svelte';
	import MediaControls from './MediaControls.svelte';
	import InlineNumberInput from './InlineNumberInput.svelte';

	export let tixyId: string;
	let dispatch = createEventDispatcher();

	// Tixy parameters
	let frame=0;
	let n;
	let speed;
	let code;
	let comments;

	let animationPlaying = true;
	let hasErrorInCode;

	$: if(tixyId) reset();
	$: animationPlaying = !hasErrorInCode;

	function reset() {
		const tixy = tixies.get(tixyId);
		n = tixy.n;
		speed = tixy.speed;
		code = tixy.code;
		comments = tixy.comments;
		animationPlaying = true;
	}

	onMount(() => {
		let id;
		function update(timestamp) {
			if(animationPlaying) {
				frame++;
			}
			id = requestAnimationFrame(update);
		}
		id = requestAnimationFrame(update);

		return () => {
			cancelAnimationFrame(id);
		}
	})

	function forwards(e) {
		frame += e.detail;
	}

	function backwards(e) {
		frame -= e.detail;
	}
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
		margin-left: 2em;
		margin-right: 2em;
		overflow-wrap: normal;
	}

	div.error {
		border: 1px solid red;
	}

	.code {
		color: var(--text-color-light);
	}

	p {
		padding: 0;
		margin: 0;
	}

	.control-wrapper {
		width: 100%;
		display: grid;
		justify-content: space-evenly;
		align-items: flex-end;
		grid-auto-flow: column;
		column-gap: 8px;
		padding-top: 8px;

		.param-control-wrapper {
			display: grid;
			justify-content: center;
			align-items: flex-end;
			grid-auto-flow: column;
			column-gap: 0.5em;
		}
	}
</style>

<div class="wrapper">
	<CanvasTixy {code} {n} {frame} {speed} bind:hasErrorInCode on:click={() => dispatch('clickTixy')}/>
	<div class="control-wrapper">
		<div class="param-control-wrapper">
			Frame:<InlineNumberInput bind:value={frame} step={10} shiftStep={100} altStep={1}></InlineNumberInput>
		</div>
		<MediaControls bind:playing={animationPlaying} on:forwards={forwards} on:backwards={backwards}/>
		<div class="param-control-wrapper">
			Speed:<InlineNumberInput bind:value={speed} shiftStep={10}></InlineNumberInput>
			, Dots:<InlineNumberInput bind:value={n} shiftStep={10}></InlineNumberInput>
		</div>
	</div>

	<div class="input-wrapper">
		{#each comments as comment}
			<p class="comment" >// {@html comment}</p>
		{/each}
		<div class:error={hasErrorInCode}>
			<p class="code">(t,i,x,y,n) => &#123;</p>
			<div class="code-input code" contenteditable=true bind:textContent={code}></div>
			<p class="code">&#125;</p>
		</div>
	</div>
</div>