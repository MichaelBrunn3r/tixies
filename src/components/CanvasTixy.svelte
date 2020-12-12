<script lang="ts">
	import { onMount } from 'svelte';
	import { drawCircle } from '../utils/canvas';
	import { constrain } from '../utils/math';

	export let functionBody: string;

	export let size;
	$: radius = canvasSize / size / 2;
	$: diameter = radius*2;

	let color1 = '#FF0000';
	let color2 = '#FFFFFF';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let canvasSize = 1800;

	let speed = 1

	let transform;
	$: {
		try {
			transform = new Function('t', 'i', 'x', 'y', `
				try {
					return ${functionBody};
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

		for(let y=0; y<size; y++) {
			for(let x=0; x<size; x++) {
				const scale = constrain(transform(time, y*size+x, x, y), -1, 1);
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

<canvas bind:this={canvas} width={canvasSize}, height={canvasSize}/>