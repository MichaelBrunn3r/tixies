<script lang="ts">
	export let isOn: boolean = false;

	function handleClick() {
		isOn = !isOn;
	}
</script>

<button on:click={handleClick}>
	{#if isOn}
		<slot name="on"/>
	{:else}
		<slot name="off"/>
	{/if}
</button>