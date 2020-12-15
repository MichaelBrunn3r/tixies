<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';
	import InlineInput from 'svelte-inline-input';
	import tixies from '../data/tixies';
	import { onMount, createEventDispatcher } from 'svelte';
	import MediaControls from './MediaControls.svelte';

	export let tixyId: string;
	let dispatch = createEventDispatcher();

	let animationPlaying = true;
	let animStart;
	let time=0;
	let elapsed=0;

	let n;
	let speed;
	let code;
	let comments;
	$: if(tixyId) reset();

	function reset() {
		const tixy = tixies.get(tixyId);
		n = tixy.n;
		speed = tixy.speed;
		code = tixy.code;
		comments = tixy.comments;

		animStart = undefined;
		elapsed=0;
		animationPlaying = true;
	}

	onMount(() => {
		let id;
		function update(timestamp) {
			if(animationPlaying) {
				if(!animStart) animStart = timestamp;
				elapsed = timestamp - animStart;
				time = elapsed;
			}

			id = requestAnimationFrame(update);
		}
		id = requestAnimationFrame(update);

		return () => {
			cancelAnimationFrame(id);
		}
	})

	function toggleAnimation() {
		if(animationPlaying) {
			animStart = window.performance.now() - elapsed;
		}
	}

	function forwards(e) {
		elapsed += e.detail;
		time = elapsed;
	}

	function backwards(e) {
		elapsed -= e.detail;
		time = elapsed;
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
	<CanvasTixy {code} {n} {time} {speed} on:click={() => dispatch('clickTixy')}/>
	<div class="control-wrapper">
		<span>Time: {Math.round(tixies.adjustTime(time,speed))}</span>
		<MediaControls bind:playing={animationPlaying} on:toggle={toggleAnimation} on:forwards={forwards} on:backwards={backwards}/>
		<div class="param-control-wrapper">
			<div>Speed:<InlineInput type="number" bind:value={speed}/>,</div>
			<div>Dots:<InlineInput type="number" bind:value={n}/></div>
		</div>
	</div>

	<div class="input-wrapper">
		{#each comments as comment}
			<p class="comment" >// {@html comment}</p>
		{/each}
		<p class="code">(t,i,x,y,n) => &#123;</p>
		<div class="code-input code" contenteditable=true bind:textContent={code}></div>
		<p class="code">&#125;</p>
	</div>
</div>