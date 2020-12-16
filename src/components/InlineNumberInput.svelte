<script lang="ts">
	import { tick, createEventDispatcher, onMount } from 'svelte';

	export let step = 1;
	export let value = 0;
	export let altStep: number = null;
	export let shiftStep: number = null;
	export let min = 0;
	export let max = "any";

	let defaultVal = value;

	let dispatch = createEventDispatcher();
	let inputElem: HTMLDivElement;

	function handleMousewheel(e: WheelEvent) {
		if(e.cancelable) e.preventDefault();

		// Change step amount depending on which keys are pressed
		let amount = step;
		if(altStep != null && e.altKey) amount = altStep;
		if(shiftStep != null && e.shiftKey) amount = shiftStep;

		value = value + Math.sign(e.deltaY*-1) * amount;
	}

	function handleKeyDown(e: KeyboardEvent) {
		const k = e.key;

		console.log(e);


		if(k == "Backspace" || k == "ArrowLeft" || k == "ArrowRight") return;
		if(e.ctrlKey && (k == 'a' || k == 'c')) return;

		// Cancel event if the value would not be a number anymore
		if(!isNumeric(value + e.key) && e.cancelable) {
			e.preventDefault();
		}
	}

	let prevVal = "0";
	function handleInput(e) {
		if(!isNumeric(inputElem.textContent)) {
			inputElem.textContent = prevVal;
		} else {
			prevVal = inputElem.textContent;
		}
	}

	function isNumeric(number) {
		return !isNaN(number);
	}

	onMount(() => {
		inputElem.addEventListener('wheel', handleMousewheel)
	})
</script>

<style>
	div {
		min-width: 10px;
		min-height: 1em;
		cursor: text;
	}
</style>

<div
	class="input"
	bind:this={inputElem}
	contenteditable=true
	on:input={handleInput}>
	{value}
</div>