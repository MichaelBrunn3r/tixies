<script context="module">
	export async function preload(page) {
		const { tixyId } = page.params;
		return { tixyId };
	}
</script>

<script>
	import TixyEditor from '../../components/TixyEditor.svelte';
	export let tixyId;
</script>

<TixyEditor {tixyId} />