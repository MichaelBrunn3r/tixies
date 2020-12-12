<script>
	import TixyEditor from '../components/TixyEditor.svelte';
	import { tixies } from '../data/tixies';

	let tixyId = Math.round(Math.random()*(tixies.length-1));

	function nextTixy() {
		tixyId = (tixyId+1)%tixies.length
		tixy = tixies[tixyId];
		nInputVal = tixy.n.toString();
		speedInputVal = tixy.speed.toString();
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<TixyEditor {tixyId} />
