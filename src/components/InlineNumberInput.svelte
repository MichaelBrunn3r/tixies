<script lang="ts">
	import { tick, onMount } from 'svelte';
	import { isNumeric } from '../utils/math';
	import { getCaretCharacterOffsetWithin, setCaret } from '../utils/selection';

	export let value = 0;
	export let defaultVal = 0;
	export let min = undefined;
	export let max = undefined;
	export let step = 1;
	export let altStep: number = null;
	export let shiftStep: number = null;
	export let displayFactor = 1;
	export let decimals = 0;

	let inputElem: HTMLDivElement;
	let caretBeforeInput;

	$: if(inputElem) inputElem.textContent = "" + Math.round(value * displayFactor * Math.pow(10, decimals)) / Math.pow(10, decimals);

	function handleMousewheel(e: WheelEvent) {
		if(e.cancelable) e.preventDefault();

		// Change step amount depending on which keys are pressed
		let amount = step;
		if(altStep != null && e.altKey) amount = altStep;
		if(shiftStep != null && e.shiftKey) amount = shiftStep;

		let newVal = value + Math.sign(e.deltaY*-1) * amount / displayFactor;
		if(min) newVal = Math.max(min, newVal);
		if(max) newVal = Math.min(max, newVal);
		value = newVal;
	}

	function handleKeyDown(e: KeyboardEvent) {
		// Don't allow whitespace
		if(e.key.replace(/\s/g,"") == "") {
			e.preventDefault();
			return;
		}

		// Save caret position for resets
		caretBeforeInput = getCaretCharacterOffsetWithin(inputElem);
	}

	async function handleInput(e) {
		let caret = getCaretCharacterOffsetWithin(inputElem);
		let newVal = parseFloat(inputElem.textContent);
		let newTextVal = inputElem.textContent;

		if(!isNumeric(newTextVal)) {
			// Revert if invalid input
			newVal = value;
			caret = caretBeforeInput;
		} else if(newTextVal === "") {
			// Set val to default if string is empty
			newVal = defaultVal;
			caret = 1;
		} else if(newTextVal.startsWith('0')) {
			// Remove leading 0s
			const stripped = newTextVal.replace(/\D|^0+/g, "");
			const diff = newTextVal.length - stripped.length;
			newVal = parseFloat(newTextVal);
			caret -= diff;
		}

		// Update value
		if(min) newVal = Math.max(min, newVal);
		if(max) newVal = Math.min(max, newVal);
		newVal /= displayFactor;
		newVal = Math.round(newVal * Math.pow(10, decimals)) / Math.pow(10, decimals)
		value = newVal;

		// Update display
		inputElem.textContent = "" + value;
		await tick();
		setCaret(inputElem, Math.min(caret , inputElem.textContent.length));
	}

	onMount(() => {
		inputElem.addEventListener('wheel', handleMousewheel);
	})
</script>

<span
	class="input"
	bind:this={inputElem}
	contenteditable=true
	on:input={handleInput}
	on:keydown={handleKeyDown}>
</span>