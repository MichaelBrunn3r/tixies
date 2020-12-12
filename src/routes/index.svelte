<script lang="ts">
import { missing_component } from 'svelte/internal';

	import CanvasTixy from '../components/CanvasTixy.svelte';

	let functionBodyInputVal = "return Math.sin(y/8+t);";
	let nInputVal = "32";
	$: n = Math.min(128,parseInt(nInputVal));
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
	<CanvasTixy n={n} functionBody={functionBodyInputVal}/>

	<div class="input-wrapper">
		<p class="comment">// time, index, column, row, <span id="ninput" bind:textContent={nInputVal} contenteditable=true on:input=>16</span></p>
		<p>(t,i,x,y,n) => &#123;</p>
		<div class="input" contenteditable=true bind:textContent={functionBodyInputVal}></div>
		<p>&#125;</p>
	</div>
</div>