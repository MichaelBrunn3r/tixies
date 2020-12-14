/**
 * Create a WebGL shader from some source code
 * @param gl The rendering context
 * @param type The type of the shader
 * @param source The source code of the shader
 */
export function createShaderFromSource(gl: WebGL2RenderingContext, type: number, source: string) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if(!success) {
		const info = gl.getShaderInfoLog(shader);
		gl.deleteShader(shader);
		throw new Error(`Shader compilation error: ${info}`);
	}

	return shader;
}

export function createShaderFromScript(gl: WebGL2RenderingContext, scriptId: string, type: number = null) {
	const script = document.getElementById(scriptId) as HTMLScriptElement;
	if(!script) throw new Error(`Couldn't find shader script element wit id #${scriptId}`);

	// Try to get type from script tag
	if(type == null) {
		if (script.type === 'x-shader/x-vertex') {
			type = gl.VERTEX_SHADER;
		  } else if (script.type === 'x-shader/x-fragment') {
			type = gl.FRAGMENT_SHADER;
		  } else if (type !== gl.VERTEX_SHADER && type !== gl.FRAGMENT_SHADER) {
			throw new Error(`Unknown shader type: ${type}`);
		  }
	}

	return createShaderFromSource(gl, gl.VERTEX_SHADER, script.textContent);
}

/**
 * Create a WebGL program from a vertex and a fragment shader
 * @param gl The rendering context
 * @param vertexShader The vertex shader
 * @param fragmentShader The fragment shader
 */
export function createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
	// Create program
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	// Check linking
	const success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if(!success) {
		const info = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw new Error(`Error while linking WebGL program: ${info}`);
	}

	return program;
}

/**
 * Create a WebGL program from the source code of a vertex- and a fragment-shader
 * @param gl The rendering context
 * @param vertexShaderSource The source code of the vertex shader
 * @param fragmentShaderSource The source code of the fragment shader
 */
export function createProgramFromSources(gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
	return createProgram(
		gl,
		createShaderFromSource(gl, gl.VERTEX_SHADER, vertexShaderSource),
		createShaderFromSource(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
}

/**
 * Create a WebGL program from the text content of a vertex- and a fragment-shader script element
 * @param gl The rendering context
 * @param vertexShaderScriptID The id of the vertex shader script element
 * @param fragmentShaderScriptID The id of the fragment shader script element
 */
export function createProgramFromScripts(gl: WebGL2RenderingContext, vertexShaderScriptID: string, fragmentShaderScriptID: string) {
	return createProgram(gl, createShaderFromScript(gl, vertexShaderScriptID), createShaderFromScript(gl, fragmentShaderScriptID));
}

export function clear(gl: WebGL2RenderingContext, r=0, g=0, b=0, a=0) {
	gl.clearColor(r,g,b,a);
	gl.clear(gl.COLOR_BUFFER_BIT);
}

export function rectangle(x1: number, y1: number, x2: number, y2: number) {
	return [
		x1, y1,
		x2, y1,
		x1, y2,

		x1, y2,
		x2, y1,
		x2, y2
	]
}

export default {
	createShaderFromSource,
	createShaderFromScript,

	createProgram,
	createProgramFromSources,
	createProgramFromScripts,

	clear,
	rectangle
}