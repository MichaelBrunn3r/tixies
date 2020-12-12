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
	import { tixies } from '../../data/tixies';

	export let id;
	$: tixy = Object.assign({}, tixies[id]);
</script>

<TixyEditor {tixy} />