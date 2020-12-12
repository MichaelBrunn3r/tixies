<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from "three";

	export let functionBody: string;
	export let size;

	let canvas;
	let canvasSize = 1800;

	let scene;
	let camera;
	let renderer;

	let radius = canvasSize/size/2;
	let geometryResolution = Math.ceil(100/Math.log(size));
	let circleGeometry = new THREE.CircleBufferGeometry(radius, geometryResolution);
	let materialWhite = new THREE.MeshBasicMaterial( { color: 0xffffff } );
	let materialRed = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

	let circles: Array<THREE.Mesh<any, THREE.MeshBasicMaterial>> = [];

	onMount(async () => {
		setup();

		animate();
	})

	function setup() {
		scene = new THREE.Scene();

		camera = new THREE.OrthographicCamera(-canvasSize/2, canvasSize/2, canvasSize/2, -canvasSize/2, .1, 4)
		scene.add(camera);

		renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		});


		const offsetX = -canvasSize/2+radius;
		const offsetY = canvasSize/2-radius;

		for(let y=0; y<size; y++) {
			for(let x=0; x<size; x++) {
				let circle = new THREE.Mesh( circleGeometry, materialWhite );
				circle.position.set(offsetX+canvasSize/size*x,offsetY-canvasSize/size*y,1);
				circles.push(circle);
				scene.add(circle);
			}
		}
		camera.position.z = 5;
	}

	function animate() {
		// requestAnimationFrame( animate );
		renderer.render( scene, camera );
	}
</script>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;
	}
</style>

<canvas bind:this={canvas} width={canvasSize} height={canvasSize}/>