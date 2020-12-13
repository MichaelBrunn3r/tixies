export function animationFrameEveryXms(ms: number, callback: (timestamp: number) => void) {
	let lastFrame = 0;

	let id: number;

	// Update function
	function update(timestamp) {
		const elapsed = timestamp - lastFrame;

		if(elapsed > ms) {
			lastFrame = timestamp;
			callback(timestamp);
		}
		id = requestAnimationFrame(update);
	}
	id = requestAnimationFrame(update);

	// Return cancel callback
	return () => cancelAnimationFrame(id);
}

export function animationFrameWithElapsed(callback: (timestamp: number, elapsed: number) => void) {
	let lastFrame = 0;

	let id: number;

	// Update function
	function update(timestamp) {
		lastFrame = timestamp;
		callback(timestamp, timestamp - lastFrame);

		id = requestAnimationFrame(update);
	}
	id = requestAnimationFrame(update);

	// Return cancel callback
	return () => cancelAnimationFrame(id);
}