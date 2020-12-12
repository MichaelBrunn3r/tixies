<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';
	import { presets } from '../data/tixies';

	let presetIdx = 0;
	$: functionBodyInputVal = presets[presetIdx];

	let nInputVal = "32";
	$: n = Math.min(128,parseInt(nInputVal));

	function nextPreset() {
		presetIdx = (presetIdx+1)%presets.length
	}
</script>

<style lang="scss">
	:global(body) {
		font-family: monospace;
		background-color: black;
	}

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
		color: white;
		margin-top: 5vh;
	}

	.input {
		width: 100%;
		margin-left: 2em;
	}

	p {
		padding: 0;
		margin: 0;
	}

	.comment {
		color: gray;
	}

	#ninput {
		font-weight: bolder;
	}
</style>

<div class="wrapper">
	<CanvasTixy n={n} functionBody={functionBodyInputVal} on:click={nextPreset}/>

	<div class="input-wrapper">
		<p class="comment">// time, index, column, row, <span id="ninput" bind:textContent={nInputVal} contenteditable=true on:input=>16</span></p>
		<p>(t,i,x,y,n) => &#123;</p>
		<div class="input" contenteditable=true bind:textContent={functionBodyInputVal}></div>
		<p>&#125;</p>
	</div>
</div>