<script lang="ts">
	import { tick, onMount } from 'svelte';
	import { isNumeric, constrain } from '../utils/math';
	import { getCaretCharacterOffsetWithin, setCaret } from '../utils/selection';

	export let value = 0;
	export let defaultVal = 0;
	export let min = 0;
	export let max = "any";
	export let step = 1;
	export let altStep: number = null;
	export let shiftStep: number = null;

	let inputElem: HTMLDivElement;
	let caretBeforeInput;
	let valBeforeInput;

	$: if(inputElem) inputElem.textContent = "" + value
	$: console.log(value);


	function handleMousewheel(e: WheelEvent) {
		if(e.cancelable) e.preventDefault();

		// Change step amount depending on which keys are pressed
		let amount = step;
		if(altStep != null && e.altKey) amount = altStep;
		if(shiftStep != null && e.shiftKey) amount = shiftStep;

		value = value + Math.sign(e.deltaY*-1) * amount;
	}

	function handleKeyDown(e: KeyboardEvent) {
		// Don't allow whitespace
		if(e.key.replace(/\s/g,"") == "") {
			e.preventDefault();
			return;
		}

		// Save information for resets
		caretBeforeInput = getCaretCharacterOffsetWithin(inputElem);
		valBeforeInput = inputElem.textContent;

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
		} else if(parseFloat(newTextVal) && newTextVal.startsWith('0')) {
			// Remove leading 0s
			const stripped = newTextVal.replace(/\D|^0+/g, "");
			const diff = newTextVal.length - stripped.length;
			newVal = parseFloat(newTextVal);
			caret -= diff;
		}

		// Update value
		value = newVal;

		// Update display
		inputElem.textContent = "" + newVal;
		await tick();
		setCaret(inputElem, caret);
	}

	onMount(() => {
		inputElem.addEventListener('wheel', handleMousewheel);
	})
</script>

<div
	class="input"
	bind:this={inputElem}
	contenteditable=true
	on:input={handleInput}
	on:keydown={handleKeyDown}>
</div>