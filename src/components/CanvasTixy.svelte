<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import webglutils, { glsl_clipSpaceToColorSpace } from '../data/webglutils';

	export let time: number;
	export let speed: number;
	$: adjustedTime = time/speed/1000;

	export let code: string;
	export let n: number;
	export let resolution = 800;

	$: if(gl && n) {
		populateCenterPositions(gl);
		render();
	}

	let dispatch = createEventDispatcher();

	let canvas: HTMLCanvasElement;
	let gl: WebGL2RenderingContext;
	let program: WebGLProgram;

	let positionLoc;
	let positionBuffer;
	let resolutionLoc;

	let centerLoc;
	let centerBuffer;
	let centerPositions;

	let radiusLoc;

	onMount(async () => {
		gl = canvas.getContext("webgl2");
		program = webglutils.createProgramFromSources(gl,`
			uniform vec2 u_resolution;
			attribute vec2 a_position;
			attribute vec2 a_center;
			attribute float a_radius;
			attribute float a_xoffset;

			varying vec2 v_resolution;
			varying vec2 v_center;
			varying float v_radius;

			void main() {
				vec2 pos = (a_position + a_center + vec2(-a_radius,-a_radius)) * vec2(2,-2) + vec2(-1,1);
				gl_Position = vec4(pos,0,1);

				v_resolution = u_resolution;
				v_center = a_center;
				v_radius = a_radius;
			}
		`, `
			precision mediump float;

			varying vec2 v_resolution;
			varying vec2 v_center;
			varying float v_radius;

			void main() {
				vec2 normalizedCoord = gl_FragCoord.xy/v_resolution * vec2(1,-1) + vec2(0,+1);

				float dx = v_center[0] - normalizedCoord.x;
				float dy = v_center[1] - normalizedCoord.y;

				float distance = sqrt(dx*dx + dy*dy);

				gl_FragColor += vec4(1,0,0,1) * smoothstep(v_radius, v_radius-0.003, distance);
			}
		`);

		resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
		radiusLoc = gl.getAttribLocation(program, 'a_radius');

		centerLoc = gl.getAttribLocation(program, 'a_center');
		centerBuffer = gl.createBuffer();
		populateCenterPositions(gl);

		positionLoc = gl.getAttribLocation(program, 'a_position');
		positionBuffer = gl.createBuffer();

		gl.viewport(0,0,gl.canvas.width,gl.canvas.height);

		render();
	})

	function render() {
		gl.useProgram(program);
		webglutils.clear(gl);

		drawCircles();
	}

	function drawCircles() {
		gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);

		gl.bindBuffer(gl.ARRAY_BUFFER, centerBuffer);
		gl.enableVertexAttribArray(centerLoc);
		gl.vertexAttribPointer(centerLoc, 2, gl.FLOAT, false, 0, 0);
		gl.vertexAttribDivisor(centerLoc, 1);

		let circleGeometry = webglutils.rectangle(0,0,1/n,1/n);
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circleGeometry), gl.STATIC_DRAW);
		webglutils.pointVertexAttrib(gl, positionLoc,  2);

		gl.vertexAttrib1f(radiusLoc, 1/n/2);

		gl.drawArraysInstanced(
			gl.TRIANGLES,
			0,
			6,
			n*n
		);
	}

	function populateCenterPositions(gl: WebGL2RenderingContext) {
		centerPositions = [];
		for(let y=0; y<n; y++) {
			for(let x=0; x<n; x++) {
				centerPositions.push((x+.5)/n, (y+.5)/n);
			}
		}

		console.log(centerPositions);

		gl.bindBuffer(gl.ARRAY_BUFFER, centerBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(centerPositions), gl.STATIC_DRAW);
	}
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