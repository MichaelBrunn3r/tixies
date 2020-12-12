<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { drawCircle } from '../utils/canvas';
	import { constrain } from '../utils/math';

	export let speed: number;
	export let functionBody: string;
	export let n: number;

	$: radius = canvasSize / n / 2;
	$: diameter = radius*2;

	let dispatch = createEventDispatcher();

	let color1 = '#FF0000';
	let color2 = '#FFFFFF';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let canvasSize = 1800;
	let transform;
	$: {
		try {
			transform = new Function('t', 'i', 'x', 'y', 'n', `
				try {
					{${functionBody}};
				} catch(e) {
					return 0;
				}
			`);
		} catch(e) {
			transform = () => 1;
		}
	}

	// time, index, columnIdx, rowIdx
	// const transi = (t,i,x,y) => Math.sin(t);

	onMount(async () => {
		ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = true;

		let frame;
		function update() {
			const t = window.performance.now() * speed/1000;
			drawShapes(t, (ctx,x,y,s,c) => drawCircle(ctx,radius + x*diameter,radius + y*diameter,radius*s,c));
			frame = requestAnimationFrame(update);
		}

		frame = requestAnimationFrame(update)

		return () => {
			cancelAnimationFrame(frame);
		}
	})

	function clear() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}

	function drawShapes(time: number, drawShape: (ctx: CanvasRenderingContext2D, x:number, y:number, scale:number, color:string) => any) {
		clear();

		for(let y=0; y<n; y++) {
			for(let x=0; x<n; x++) {
				const scale = constrain(transform(time, y*n+x, x, y, n), -1, 1);
				drawShape(ctx, x, y, Math.abs(scale), scale < 0 ? color1 : color2);
			}
		}
	}
</script>

<style lang="scss">
	canvas {
		width: 100%;
		height: 100%;
	}
</style>

<canvas bind:this={canvas} width={canvasSize}, height={canvasSize} on:click={() => dispatch('click')}/>