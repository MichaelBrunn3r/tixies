<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let playing;
	let dispatch = createEventDispatcher();

	function toggle() {
		playing = !playing;
		dispatch('toggle', playing);
	}

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

	button {
		background: transparent;
		border: transparent;
		padding: 0;
		margin: 0;
		color: var(--text-color-primary);

		&:active  {
			color: var(--text-color-dark);
		}
	}
</style>

<div>
	<button on:mousedown={() => handleMouseDown('backwards')} on:mouseup={cancelAdvancing} on:mouseleave={cancelAdvancing}>&lt;&lt;</button>
	<button on:click={toggle}>
		{#if playing}
			||
		{:else}
			►
		{/if}
	</button>
	<button on:mousedown={() => handleMouseDown('forwards')} on:mouseup={cancelAdvancing} on:mouseleave={cancelAdvancing} >&gt;&gt;</button>
</div>