/**
 * Create a WebGL shader
 * @param gl The rendering context
 * @param type The type of the shader
 * @param source The source code of the shader
 */
export function createShader(gl: WebGL2RenderingContext, type: number, source: string) {
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

/**
 * Create a WebGL program from the source code of a vertex- and a fragment-shader
 * @param gl The rendering context
 * @param vertexShaderSource The source code of the vertex shader
 * @param fragmentShaderSource The source code of the fragment shader
 */
export function createProgram(gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
	// Create the shaders
	const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
	const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

	// Create program
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	const success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if(!success) {
		const info = gl.getProgramInfoLog(program);
		gl.deleteProgram(program);
		throw new Error(`Error while linking WebGL program: ${info}`);
	}

	return program;
}

/**
 * Create a WebGL program from the text content of a vertex- and a fragment-shader script element
 * @param gl The rendering context
 * @param vertexShaderScriptID The id of the vertex shader script element
 * @param fragmentShaderScriptID The id of the fragment shader script element
 */
export function createProgramFromScripts(gl: WebGL2RenderingContext, vertexShaderScriptID: string, fragmentShaderScriptID: string) {
	const vertexShaderScript = document.getElementById(vertexShaderScriptID);
	if(!vertexShaderScript) throw new Error(`Couldn't find vertex shader script element #${vertexShaderScriptID}`);

	const fragmentShaderScript = document.getElementById(fragmentShaderScriptID);
	if(!fragmentShaderScript) throw new Error(`Couldn't find fragment shader script element #${fragmentShaderScriptID}`);

	return createProgram(gl, vertexShaderScript.textContent, fragmentShaderScript.textContent);
}

export default {
	createProgram,
	createProgramFromScripts
}