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


}


export const gallery = [];

export const tutorial = []

function registerGallery(id:string, tixy: Tixy) {
	tixies[id] = tixy;
	gallery.push(id)
}

function registerTutorial(id:string, tixy: Tixy) {
	tixies[id] = tixy;
	tutorial.push(id)
}

export function getTixy(id: string): Tixy {
	return tixies[id];
}

registerGallery('sweep_up', new Tixy('Sweep up', 'return Math.sin(y/8+t);', 16))
registerGallery('pulse', new Tixy('Pulse', 'return Math.sin(t);', 16, 0.7))
registerGallery('ripple_in', new Tixy('Ripple In', 'return Math.sin(Math.sqrt(Math.pow(n/2-x-0.5,2)+Math.pow(n/2-y-0.5,2))+t);', 32, 2))
registerGallery('ripple_circ', new Tixy('Circular Ripple', 'let radius = n/4;return Math.sin(Math.sqrt(Math.pow(n/2-x-0.5+Math.sin(t)*radius,2)+Math.pow(n/2-y-0.5+Math.cos(t)*radius,2))+t);', 32, 0.5))

registerTutorial('tut-start', new Tixy('', 'return Math.sin(y/8+t);', 16, 1, ['Inspired by <a href="https://tixy.land">tixy.land</a>', 'Start the tutorial by clicking the dots']))
registerTutorial('tut-visibility', new Tixy('', 'return i%3 == 0;', 16, 1, ['0/1 = false/true => hide/show dot']))
registerTutorial('tut-scale', new Tixy('', 'return i%3 == 0 ? -0.3 : (i%3 == 1 ? 0.5 : -1);', 16, 1, ['scale dots between -1 and 1', 'negatively scaled dots are red']))
registerTutorial('tut-time', new Tixy('', 'return Math.sin(t);', 16, 1, ['t is the time in seconds']))
registerTutorial('tut-index', new Tixy('', 'return i/256;', 16, 1, ['\'i\' is the index']))