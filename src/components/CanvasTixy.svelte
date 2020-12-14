<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import webglutils from '../data/webglutils';

	export let time: number;
	export let speed: number;
	$: adjustedTime = time/speed/1000;

	export let code: string;
	export let n: number;
	export let resolution = 800;

	let dispatch = createEventDispatcher();

	let canvas: HTMLCanvasElement;
	let gl: WebGL2RenderingContext;
	let program: WebGLProgram;

	onMount(async () => {
		gl = canvas.getContext("webgl2");
		program = webglutils.createProgram(gl,`
			attribute vec4 a_position;
			void main() {
				gl_Position = a_position;
			}
		`, `
			precision mediump float;

			void main() {
				gl_FragColor = vec4(1, 0, 0.5, 1);
			}
		`);

		let positionLoc = gl.getAttribLocation(program, 'a_position');
		let positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		let positions = [
			0, 0,
			0, 0.5,
			0.7, 0
		]

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
	})
</script>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;
	}
</style>

<canvas
	bind:this={canvas}
	on:click={() => dispatch('click')}
	/>
