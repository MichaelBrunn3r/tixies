<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import webglutils, { glsl_clipSpaceToColorSpace } from '../data/webglutils';

	export let time: number;
	export let speed: number;
	$: adjustedTime = time/speed/1000;

	export let code: string;
	export let n: number;
	export let resolution = 800;

	$: if(gl && n) render();

	let dispatch = createEventDispatcher();

	let canvas: HTMLCanvasElement;
	let gl: WebGL2RenderingContext;
	let program: WebGLProgram;

	let positionLoc;
	let positionBuffer;
	let resolutionLoc;
	let centerLoc;
	let radiusLoc;

	onMount(async () => {
		gl = canvas.getContext("webgl2");
		program = webglutils.createProgramFromSources(gl,`
			uniform vec2 u_resolution;
			attribute vec2 a_position;
			attribute vec2 a_center;
			attribute float a_radius;

			varying vec2 v_resolution;
			varying vec2 v_center;
			varying float v_radius;

			void main() {
				vec2 pos = a_position * vec2(2,-2) + vec2(-1,1);
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
		positionLoc = gl.getAttribLocation(program, 'a_position');
		centerLoc = gl.getAttribLocation(program, 'a_center');
		radiusLoc = gl.getAttribLocation(program, 'a_radius');


		positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		gl.viewport(0,0,gl.canvas.width,gl.canvas.height);

		render();
	})

	function render() {
		gl.useProgram(program);
		webglutils.clear(gl);

		for(let y=0; y<n; y++) {
			for(let x=0; x<n; x++) {
				drawCircle((.5+x)/n,(.5+y)/n,1/n/2);
			}
		}
	}

	function drawCircle(cx: number, cy: number, radius: number) {
		gl.uniform2f(resolutionLoc, gl.canvas.width, gl.canvas.height);

		gl.vertexAttrib2f(centerLoc, cx, cy);
		gl.vertexAttrib1f(radiusLoc, radius);

		let vertices = webglutils.rectangle(cx-radius,cy-radius,cx+radius,cy+radius);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		webglutils.pointVertexAttrib(gl, positionLoc,  2);

		gl.drawArrays(gl.TRIANGLES, 0, 6);
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