<script lang="ts">
	import ToggleButton from './ToggleButton.svelte'
	import PressButton from './PressButton.svelte'
	import { createEventDispatcher } from 'svelte';

	export let playing;
	$: dispatch('toggle', playing)

	let dispatch = createEventDispatcher();

	let direction;

	function startWinding(dir: string) {
		playing = false;
		direction = dir;
	}

	function handleTick(e) {
		const elapsed = e.detail.elapsed;

		let intensity = 1;
		if(elapsed > 10) {
			intensity = Math.min(100,Math.pow(2, elapsed/200));
		}

		dispatch(direction, intensity);
	}
</script>

<style lang="scss">
	div {
		display: grid;
		justify-content: center;
		grid-auto-flow: column;
		column-gap: 8px;
	}
</style>

<div>
	<PressButton on:pressStart={() => startWinding('backwards')} on:tick={handleTick}>
		&lt;&lt;
	</PressButton>
	<ToggleButton bind:isOn={playing}>
		<span slot="on">||</span>
		<span slot="off">►</span>
	</ToggleButton>
	<PressButton  on:pressStart={() => startWinding('forwards')} on:tick={handleTick}>
		&gt;&gt;
	</PressButton>
</div>