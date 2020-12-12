<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';

	let functionBodyInputVal = "Math.sin(y/8+t)";
	let size = 32;
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
</style>

<div class="wrapper">
	<CanvasTixy size={size} functionBody={functionBodyInputVal}/>

	<div class="input-wrapper">
		<p class="comment">// time (seconds), index, column, row</p>
		<p>(t,i,x,y) => &#123;</p>
		<div class="input" contenteditable=true bind:textContent={functionBodyInputVal}></div>
		<p>&#125;</p>
	</div>
</div>