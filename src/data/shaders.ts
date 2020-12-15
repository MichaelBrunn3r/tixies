export const vertexShaderSource = `
	uniform vec2 u_resolution;
	attribute vec2 a_position;
	attribute vec2 a_center;
	attribute float a_radius;
	attribute float a_transform;

	varying vec2 v_resolution;
	varying vec2 v_center;
	varying float v_radius;
	varying float v_transform;

	void main() {
		vec2 pos = (a_position + a_center + vec2(-a_radius, -a_radius)) * vec2(2,-2) + vec2(-1,1);
		gl_Position = vec4(pos,0,1);

		v_resolution = u_resolution;
		v_center = a_center;
		v_radius = a_radius;
		v_transform = a_transform;
	}
`

export const fragmentShaderSource = `
	precision mediump float;

	varying vec2 v_resolution;
	varying vec2 v_center;
	varying float v_radius;
	varying float v_transform;

	void main() {
		vec2 normalizedCoord = gl_FragCoord.xy/v_resolution * vec2(1,-1) + vec2(0,+1);

		float dx = v_center[0] - normalizedCoord.x;
		float dy = v_center[1] - normalizedCoord.y;

		float distance = sqrt(dx*dx + dy*dy);
		float radius = v_radius * abs(v_transform);
		vec4 color = v_transform < .0 ? vec4(1,0,0,1) : vec4(1,1,1,1);

		gl_FragColor += color * smoothstep(radius, radius-0.003, distance);
	}
`;

export default {
	vertexShaderSource,
	fragmentShaderSource
}