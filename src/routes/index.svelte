<script>
	import TixyEditor from '../components/TixyEditor.svelte';
	import { tutorial } from '../data/tixies';

	let tutorialStage = 0;
	$: tixyId = tutorial[tutorialStage];

	function advanceTutorial() {
		tutorialStage = (tutorialStage+1)%tutorial.length
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<TixyEditor {tixyId} on:clickTixy={advanceTutorial}/>