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

		if(!isNumeric(inputElem.textContent)) {
			// Revert if invalid input
			value = value;
			inputElem.textContent = valBeforeInput;
			caret = caretBeforeInput;
		} else if(inputElem.textContent === "") {
			// Set val to default if string is empty
			value = defaultVal;
			inputElem.textContent = "" + defaultVal;
			caret = 1;
		} else if(parseFloat(inputElem.textContent) && inputElem.textContent.startsWith('0')) {
			// Remove leading 0s
			const stripped = inputElem.textContent.replace(/\D|^0+/g, "");
			const diff = inputElem.textContent.length - stripped.length;
			value = parseFloat(inputElem.textContent);
			caret -= diff;
		} else {
			value = parseFloat(inputElem.textContent);
		}

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