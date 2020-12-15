<script>
	import TixyEditor from '../components/TixyEditor.svelte';
	import tixies from '../data/tixies';

	let tutorialStage = 0;
	$: tixyId = tixies.tutorial[tutorialStage];

	function advanceTutorial() {
		if(tutorialStage < tixies.tutorial.length) tutorialStage++;
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<TixyEditor {tixyId} on:clickTixy={advanceTutorial}/>