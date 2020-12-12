<script lang="ts">
	import CanvasTixy from '../components/CanvasTixy.svelte';
	import { tixies } from '../data/tixies';

	let tixyIdx = 0;
	let tixy = tixies[0];

	let nInputVal = tixy.n.toString();
	$: n = Math.min(128, nInputVal ? parseInt(nInputVal) : tixy.n);

	let speedInputVal = tixy.speed.toString();
	$: speed = parseFloat(speedInputVal);

	function nextPreset() {
		tixyIdx = (tixyIdx+1)%tixies.length
		tixy = tixies[tixyIdx];
		nInputVal = tixy.n.toString();
		speedInputVal = tixy.speed.toString();
	}
</script>

<style lang="scss">
	:global(body) {
		font-family: monospace;
		background-color: rgb(44, 44, 44);
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

	.spaninput {
		font-weight: bolder;
	}
</style>

<div class="wrapper">
	<CanvasTixy n={n} functionBody={tixy.code} {speed} on:click={nextPreset}/>

	<div class="input-wrapper">
		<p class="comment">// {tixy.name}</p>
		<p class="comment">// time *
			<span class="spaninput" bind:textContent={speedInputVal} contenteditable=true on:input=></span>, index, column, row,
			<span class="spaninput" bind:textContent={nInputVal} contenteditable=true on:input=>16</span> circles
		</p>
		<p>(t,i,x,y,n) => &#123;</p>
		<div class="input" contenteditable=true bind:textContent={tixy.code}></div>
		<p>&#125;</p>
	</div>
</div>