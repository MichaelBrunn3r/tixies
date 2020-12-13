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

registerGallery('sweep_up', new Tixy('Sweep up', 'return sin(y/8+t);', 16))
registerGallery('pulse', new Tixy('Pulse', 'return sin(t);', 16, 0.7))
registerGallery('ripple_in', new Tixy('Ripple In', 'return sin(sqrt(pow(n/2-x-0.5,2)+pow(n/2-y-0.5,2))+t);', 32, 2))
registerGallery('ripple_circ', new Tixy('Circular Ripple', 'let radius = n/4;return sin(sqrt(pow(n/2-x-0.5+sin(t)*radius,2)+pow(n/2-y-0.5+cos(t)*radius,2))+t);', 32, 0.5))
registerGallery('triangle', new Tixy('Triangle', 'return y+1>x && n-2-y<x;', 16, 1))
registerGallery('triangle-up', new Tixy('Flying Triangle', 'let h=t%n;return y>x-h && y>n-1-x-h && y<n-h;', 16, 0.5))
registerGallery('grid', new Tixy('Grid', 'return x%4 && y%4', 16, 0.5))
registerGallery('sirpinski', new Tixy('<a href="https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle">Sirpinski </a>', 'return i & x & y & t*2', 16, 1))

registerTutorial('tut-start', new Tixy('', 'return sin(y/8+t);', 16, 1, ['Inspired by <a href="https://tixy.land">tixy.land</a>', 'Start the tutorial by clicking the dots']))
registerTutorial('tut-visibility', new Tixy('', 'return i%3 == 0;', 16, 1, ['0/1 = false/true => hide/show dots']))
registerTutorial('tut-scale', new Tixy('', 'return abs(sin(x/3))', 16, 1, ['use a number from 0 to 1 to define the dot size']))
registerTutorial('tut-time', new Tixy('', 'return sin(t);', 16, 1, ['\'t\' is the time in seconds']))
registerTutorial('tut-index', new Tixy('', 'return i/pow(n,2);', 16, 1, ['\'i\' is the index of the dot, from 0 to n²-1']))
registerTutorial('tut-x', new Tixy('', 'return x/n;', 16, 0, ['\'x\' is the column, 0..n-1']))
registerTutorial('tut-y', new Tixy('', 'return y/n;', 16, 0, ['\'y\' is the row, 0..n-1']))
registerTutorial('tut-color', new Tixy('', 'return y-(n/2-0.5);', 16, 0, ['positive numbers are white', 'negatives are red']))
registerTutorial('tut-animate', new Tixy('', 'return y-t;', 16, 1, ['use \'t\' to animate values']))
registerTutorial('tut-animate-faster', new Tixy('', 'return y-t*2;', 16, 1, ['multiply \'t\' to change the speed']))
registerTutorial('tut-pattern', new Tixy('', 'return [0.25, -0.5, 0.75, -1][i%4]', 16, 1, ['Create patterns using arrays']))
registerTutorial('tut-end', new Tixy('', 'return sin(t)', 16, 1, ['Have fun creating your own :)']))