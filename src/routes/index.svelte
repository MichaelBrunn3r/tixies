<script>
	import TixyEditor from '../components/TixyEditor.svelte';
	import { tixies } from '../data/tixies';

	let tixyId = 0;
	$: tixy = Object.assign({},tixies[tixyId]);

	function nextTixy() {
		tixyId = (tixies+1)%tixies.length
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<TixyEditor {tixy} />