/**
 * Constrains a number to be within a range
 * @param val the number to constrain
 * @param lower the lower end of the range
 * @param upper the upper end of the range
 */
export function constrain(val: number, lower: number, upper: number) {
	return Math.min(Math.max(val, lower), upper);
}

/**
 * Remaps a number from one range to another.
 * @param x the number to map
 * @param fromLow lower bound of the value’s current range
 * @param fromHigh highler bound of the value’s current range
 * @param toLow lower bound of the value’s target range
 * @param toHigh upper bound of the value’s target range
 */
export function map_to_range(x: number, fromLow: number, fromHigh: number, toLow: number, toHigh: number) {
	return (x - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
}

/**
 * Converts a hexadecimal string to its equivalent decimal value
 * @param x the hexadecimal string
 */
export function hex(x: string) {
	return parseInt(x, 16);
}

/**
 * Converts a octal string to its equivalent decimal value
 * @param x the octal string
 */
export function oct(x: string) {
	return parseInt(x, 8);
}

/**
 * Converts a binary string to its equivalent decimal value
 * @param x the binary string
 */
export function bin(x: string) {
	return parseInt(x, 2);
}