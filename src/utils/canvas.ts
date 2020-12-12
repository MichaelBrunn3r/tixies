export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string) {
	ctx.fillStyle = color;
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fill();
}

export function drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, fromCenter = true) {
	ctx.fillStyle = color;
	const offset = fromCenter ? -size/2 : 0 ;
	ctx.fillRect(x+offset, y+offset, size, size);
}