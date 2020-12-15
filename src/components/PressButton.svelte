<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let isPressed = false;
	export let tickInterval = 10;

	const dispatch = createEventDispatcher();
	let intervalId;
	let tickStart;

	function handleStartPress() {
		isPressed = true;
		dispatch('pressStart');

		tickStart = window.performance.now();
		intervalId = setInterval(() => {
			let elapsed = window.performance.now() - tickStart;
			dispatch('tick', { start: tickStart, elapsed });
		}, tickInterval)
	}

	function handleEndPress() {
		isPressed = false;
		dispatch('pressEnd');

		clearInterval(intervalId);
		intervalId = undefined;
	}

	onMount(() => {
		return () => {
			if(intervalId) clearInterval(intervalId);
		}
	})
</script>

<button on:mousedown={handleStartPress} on:mouseup={handleEndPress} on:mouseleave={handleEndPress} >
	<slot/>
</button>