<script lang="ts">
	import ToggleButton from './ToggleButton.svelte'
	import { createEventDispatcher } from 'svelte';

	export let playing;
	$: dispatch('toggle', playing)

	let dispatch = createEventDispatcher();

	let pressedBtn;
	let tickId;
	let tickStart;
	function handleMouseDown(btn: string) {
		if(tickId) clearInterval(tickId)

		playing = false;
		pressedBtn = btn;
		tickStart = window.performance.now();

		tickId = setInterval(() => {
			let elapsed = window.performance.now() - tickStart;
			let intensity = 1;
			if(elapsed > 10) {
				intensity = Math.min(100,Math.pow(2, elapsed/200));
			}
			dispatch(pressedBtn, intensity);
		}, 10)
	}

	function cancelAdvancing() {
		clearInterval(tickId)
		tickId = undefined;
		pressedBtn = undefined;
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
	<button on:mousedown={() => handleMouseDown('backwards')} on:mouseup={cancelAdvancing} on:mouseleave={cancelAdvancing}>&lt;&lt;</button>
	<ToggleButton bind:isOn={playing}>
		<span slot="on">||</span>
		<span slot="off">►</span>
	</ToggleButton>
	<button on:mousedown={() => handleMouseDown('forwards')} on:mouseup={cancelAdvancing} on:mouseleave={cancelAdvancing} >&gt;&gt;</button>
</div>