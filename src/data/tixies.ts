export class Tixy {
	name: string
	code: string
	n: number
	speed: number
	comments: string[]

	constructor(name: string, code: string, n: number = 16, speed: number = 1, comments = null) {
		this.name = name;
		this.code = code;
		this.n = n;
		this.speed = speed;
		this.comments = comments || new Array(name);
	}
}

const tixies = {
	'sin_up': new Tixy('Sinus up', 'return Math.sin(y/8+t);', 16),
	'pulse': new Tixy('Pulse', 'return Math.sin(t);', 16, 0.7),
	'noise': new Tixy('Random noise', 'return Math.random() < 0.1;'),
	'ripple_in': new Tixy('Ripple In', 'return Math.sin(Math.sqrt(Math.pow(n/2-x,2)+Math.pow(n/2-y,2))+t);', 32, 2),
	'ripple_circ': new Tixy('Circular Ripple', 'let radius = n/4;return Math.sin(Math.sqrt(Math.pow(n/2-x+Math.sin(t)*radius,2)+Math.pow(n/2-y+Math.cos(t)*radius,2))+t);', 32, 0.5),
}

export const gallery = [
	'sin_up', 'pulse', 'noise', 'ripple_in', 'ripple_circ'
];

export function getTixy(id: string): Tixy {
	return tixies[id];
}