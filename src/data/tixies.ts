const sin_up = 'return Math.sin(y/8+t);'
const ripple_in = 'return Math.sin(Math.sqrt(Math.pow(n/2-x,2)+Math.pow(n/2-y,2))+t);'
const circling_ripple_in = `
let radius = 8;
return Math.sin(Math.sqrt(Math.pow(n/2-x+Math.sin(t)*radius,2)+Math.pow(n/2-y+Math.cos(t)*radius,2))+t);
`

export const presets = [sin_up, ripple_in, circling_ripple_in];