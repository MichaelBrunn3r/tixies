<script context="module">
	export async function preload(page) {
		const { id } = page.params;
		return {
			id: parseInt(id)
		};
	}
</script>

<script>
	import TixyEditor from '../../components/TixyEditor.svelte';

	export let id;
	console.log(id);
</script>

<TixyEditor tixyId={id} />