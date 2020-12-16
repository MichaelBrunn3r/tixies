<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import webglutils from '../utils/webgl';
	import tixies from '../data/tixies';
	import shaders from '../data/shaders';
	import { constrain } from '../utils/math';

	export let frame: number;
	export let speed: number;
	$: adjustedFrame = tixies.adjustFrame(frame, speed);

	// Redraw if adjustedTime changes
	$: {
		if(gl && speed != 0 && adjustedFrame) {
			render();
		}
	}

	export let code: string;
	export let n: number;
	export let resolution = 800;

	$: if(gl && n) {
		updateStaticInstanceData(gl, n);
		render();
	}

	let dispatch = createEventDispatcher();

	let canvas: HTMLCanvasElement;
	let gl: WebGL2RenderingContext;
	let program: WebGLProgram;

	let transform;
	$: if(code) {
		transform = tixies.createTransformFunction(code);
	}
	$: if(gl && transform) {
		render();
	}


	// Shader attributes
	let positionLoc;
	let resolutionLoc;
	let centerLoc;
	let radiusLoc;
	let transformLoc;

	let positionBuffer;
	let centerBuffer;
	let transformBuffer;

	let centerPositions;
	let commonGeometry: Array<number>;

	function initShaders() {
		gl = canvas.getContext("webgl2");
		program = webglutils.createProgramFromSources(gl, shaders.vertexShaderSource, shaders.fragmentShaderSource);

		resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
		radiusLoc = gl.getAttribLocation(program, 'a_radius');

		centerLoc = gl.getAttribLocation(program, 'a_center');
		centerBuffer = gl.createBuffer();

		positionLoc = gl.getAttribLocation(program, 'a_position');
		positionBuffer = gl.createBuffer();

		transformLoc = gl.getAttribLocation(program, 'a_transform');
		transformBuffer = gl.createBuffer();

		gl.viewport(0,0,gl.canvas.width,gl.canvas.height);
	}

	function updateStaticInstanceData(gl: WebGL2RenderingContext, numInstances: number) {
		// Update geometry based on the number of instances
		commonGeometry = webglutils.rectangle(0,0,1/numInstances,1/numInstances);
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(commonGeometry), gl.STATIC_DRAW);

		// Update resolution
		gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);

		// Update radius based on the number of instances
		gl.vertexAttrib1f(radiusLoc, 1/numInstances/2);

		// Update circle center positions based on the number of instances
		centerPositions = [];
		for(let y=0; y<numInstances; y++) {
			for(let x=0; x<numInstances; x++) {
				centerPositions.push((x+.5)/numInstances, (y+.5)/numInstances);
			}
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, centerBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(centerPositions), gl.STATIC_DRAW);
	}

	function updateTransforms() {
		let transforms = [];
		for(let y=0; y<n; y++) {
			for(let x=0; x<n; x++) {
				transforms.push(constrain(transform(adjustedFrame, x+y*n, x, y, n), -1, 1));
			}
		}
		gl.bindBuffer(gl.ARRAY_BUFFER, transformBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(transforms), gl.STATIC_DRAW);
	}

	function render() {
		gl.useProgram(program);
		webglutils.clear(gl);

		updateTransforms();

		gl.bindBuffer(gl.ARRAY_BUFFER, transformBuffer);
		webglutils.pointVertexAttrib(gl, transformLoc, 1);
		gl.vertexAttribDivisor(transformLoc, 1);

		gl.drawArraysInstanced(
			gl.TRIANGLES,
			0,
			commonGeometry.length/2,
			n*n
		);
	}

	onMount(async () => {
		initShaders();
		updateStaticInstanceData(gl, n);

		gl.bindBuffer(gl.ARRAY_BUFFER, centerBuffer);
		webglutils.pointVertexAttrib(gl, centerLoc, 2);
		gl.vertexAttribDivisor(centerLoc, 1);

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		webglutils.pointVertexAttrib(gl, positionLoc,  2);

		render();
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
	width={resolution}
	height={resolution}
	/>