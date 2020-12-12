<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { drawCircle } from '../utils/canvas';
	import { constrain } from '../utils/math';
	import { Tixy } from '../data/tixies';

	export let tixy: Tixy;
	export let time: number;
	export let resolution = 1800;

	$: radius = resolution / tixy.n / 2;
	$: diameter = radius*2;

	let dispatch = createEventDispatcher();

	let color1 = '#FF0000';
	let color2 = '#FFFFFF';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let transform;
	$: {
		try {
			transform = new Function('t', 'i', 'x', 'y', 'n', `
				try {
					{${tixy.code}};
				} catch(e) {
					return 0;
				}
			`);
		} catch(e) {
			transform = () => 1;
		}
	}

	$: {
		if(ctx) {
			drawShapes(time, (ctx,x,y,s,c) => drawCircle(ctx,radius + x*diameter,radius + y*diameter,radius*s,c));
		}
	}

	// time, index, columnIdx, rowIdx
	// const transi = (t,i,x,y) => Math.sin(t);

	onMount(async () => {
		ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = true;
	})

	function clear() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
	}

	function drawShapes(time: number, drawShape: (ctx: CanvasRenderingContext2D, x:number, y:number, scale:number, color:string) => any) {
		clear();

		for(let y=0; y<tixy.n; y++) {
			for(let x=0; x<tixy.n; x++) {
				const scale = constrain(transform(time, y*tixy.n+x, x, y, tixy.n), -1, 1);
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

<canvas bind:this={canvas} width={resolution}, height={resolution} on:click={() => dispatch('click')}/>