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
		grid-auto-flow: row;
	}

	.tixy-wrapper {
		width: 60vw;
		height: 60vw;
	}

	.input-wrapper {
		display: block;
		width: 60vw;
		color: white;
		margin-top: 10vh;
	}

	textarea {
		width: 100%;

		background: transparent;
		color: white;
		border: transparent;
		resize: vertical;
		padding: 0;
		padding-left: 2em;
		margin: 0;
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
	<div class="tixy-wrapper">
		<CanvasTixy size={size} functionBody={functionBodyInputVal}/>
	</div>

	<div class="input-wrapper">
		<p class="comment">// time (seconds), index, column, row</p>
		<p>(t,i,x,y) => &#123;</p>
		<textarea type="text" bind:value={functionBodyInputVal}/>
		<p>&#125;</p>
	</div>
</div>