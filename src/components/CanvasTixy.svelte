<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

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
	let vertices: Float32Array;

	let transform;
	$: {
		try {
			transform = new Function('t', 'i', 'x', 'y', 'n', `
				try {
					with(Math) {
						${code}
					};
				} catch(e) {
					return 0;
				}
			`);
		} catch(e) {
			transform = () => 1;
		}
	}

	// Redraw if n or code changed
	$: if(program && n) updateParams();

	// Redraw if adjustedTime changes
	$: if(program && speed != 0 && adjustedTime) {
		draw();
	}

	function createProgram() {
		gl = canvas.getContext("webgl2");

		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Create vertex shader
		let vertexShader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vertexShader, document.getElementById('vertex-shader').textContent);
		gl.compileShader(vertexShader);

		// Create Fragment shader
		let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fragmentShader, document.getElementById('fragment-shader').textContent);
		gl.compileShader(fragmentShader);

		// Create program
		program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);

		// Create vertex buffer
		vertices = new Float32Array([
			-1.0, -1.0,
			1.0, -1.0,
			-1.0,  1.0,
			-1.0,  1.0,
			1.0, -1.0,
			1.0,  1.0
		])

		let buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		gl.useProgram(program);

		// Create vertex shader parameters
		program.position = gl.getUniformLocation(program, 'position');
		gl.enableVertexAttribArray(program.position);
		gl.vertexAttribPointer(program.position, 2, gl.FLOAT, false, 0, 0);

		// Create fragment shader parameters
		program.color = gl.getUniformLocation(program, 'color');
		program.resolution = gl.getUniformLocation(program, 'resolution');
		gl.uniform3fv(program.resolution, [resolution, resolution, 0]);
		program.n = gl.getUniformLocation(program, 'n');
	}

	function updateParams() {
		gl.uniform4fv(program.color, [0,1,0,1]);
		gl.uniform1i(program.n, n);
	}

	function draw() {
		gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);
	}

	onMount(async () => {
		createProgram();
		updateParams();
		draw();
	})
</script>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;
	}
</style>

<canvas bind:this={canvas} width={resolution}, height={resolution} on:click={() => dispatch('click')}/>